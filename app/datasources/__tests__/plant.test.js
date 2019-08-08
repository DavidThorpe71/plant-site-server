import PlantAPI from '../plant';

const mockStore = {
  Plant: {
    find: jest.fn(),
    findOne: jest.fn()
  }
};

export default mockStore;

const ds = new PlantAPI({ models: mockStore });
ds.getPlant();
ds.getPlants();

describe('[PlantAPI.getPlant]', () => {
  it('returns null for invalid plant name', async () => {
    const res = await ds.getPlant({ permalink: 'boo!' });
    expect(res).toEqual(null);
  });
});

describe('[PlantAPI.getPlants]', () => {
  it('returns null for invalid plant name', async () => {
    const res = await ds.getPlants({ filter: null });
    expect(res).toEqual(null);
  });
});
