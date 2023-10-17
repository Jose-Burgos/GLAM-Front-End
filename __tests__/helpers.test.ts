import supabase from '~/supabase/helpers';
import next from 'next';
next({ dev: true });

describe('getAnimals', () => {
  it('should return an array of Animals', async () => {
    console.log(supabase);
    const res = await supabase.getAnimals();
    console.log(res);
  });
});
