import { expect, jest, test } from '@jest/globals';
import helpers from '~/supabase/helpers';

describe('getAnimals', () => {
  test('should return an array of Animals', async () => {
    const res = await helpers.getAnimals();
    expect(res.length).toBeGreaterThan(0)
    // console.log(res)
  });
});
