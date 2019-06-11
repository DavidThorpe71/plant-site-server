import PlantAPI from '../plant';

export const mockStore = {
  models: {
    Plant: {
      find: jest.fn(),
      findOne: jest.fn()
    }
  }
};

const ds = new PlantAPI({ models: mockStore });
ds.getPlant();
ds.getPlants();

describe('[PlantAPI.getPlant]', () => {
  it('returns null for invalid emails', async () => {
    const res = await ds.getPlant({ permalink: 'boo!' });
    expect(res).toEqual(null);
  });
});
describe('[PlantAPI.getPlants]', () => {
  it('returns null for invalid emails', async () => {
    const res = await ds.getPlants({ filter: null });
    expect(res).toEqual(null);
  });
});
