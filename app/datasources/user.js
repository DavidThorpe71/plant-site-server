import { DataSource } from 'apollo-datasource';
import isEmail from 'isemail';
import bcrypt from 'bcryptjs';

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async addUser({ email, password } = {}) {
    if (!email || !isEmail.validate(email)) return null;
    const userFromDb = await this.store.User.findOne({
      where: { email }
    });

    if (userFromDb) {
      return userFromDb;
    }
    const saltRounds = 10;

    const passHash = await bcrypt.hashSync(password, saltRounds);
    const user = await this.store.User.create({ email, password: passHash });
    console.log(user.dataValues);
    return user && user.dataValues ? user.dataValues : null;
  }

  async findUser({ email: emailArg, password: passwordArg } = {}) {
    const email = this.context && this.context.user ? this.context.user.email : emailArg;
    const password = this.context && this.context.user
      ? this.context.user.password
      : passwordArg;
    if (!email || !isEmail.validate(email)) return null;
    const saltRounds = 10;
    const myPlaintextPassword = password;
    const userDb = bcrypt.hash(
      myPlaintextPassword,
      saltRounds,
      async (err, hash) => {
        const users = await this.store.User.findOrCreate({
          where: { email, password: hash }
        });
        return users && users[0] ? users[0] : null;
      }
    );
    return userDb;
  }

  async getUsers() {
    return this.store.User.findAll().then(users => users.map(user => user.dataValues));
  }
}

export default UserAPI;
