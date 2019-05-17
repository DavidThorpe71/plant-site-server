import connection from '../../db/config';

type Targs = {
  name: string;
  latinName: string;
  picture: string;
};

const mutations = {
  Mutation: {
    addPlant: (parent: any, args: Targs, ctx: any) => {
      const { name, latinName, picture } = args;
      const sql = `INSERT INTO plants(name,latinName,picture)
      VALUES(${name}, ${latinName}, ${picture})`;
      connection.query(sql);
      return 'success!';
    }
  }
};

export default mutations;
