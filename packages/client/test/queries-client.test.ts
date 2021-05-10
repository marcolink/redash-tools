import { queriesClient } from '../src';

describe('A queries client', () => {
  it('can be created with parameters', () => {
    queriesClient({host: 'hostParameter'})
  });
});
