import { expect, jest, test } from '@jest/globals';
import helpers from '~/supabase/helpers';
import * as Sb from '~/supabase/types/supabase.tables';
import next from 'next';
import { PostgrestError } from '@supabase/supabase-js';
import { animalData } from './testData';
next({ dev: true });

type SbRet<T> = {
  data: T | null;
  error: PostgrestError | null;
};

let error: PostgrestError | null = null;
const mockSelect = <T>(data: T) => ({
  select: async (query: string): Promise<SbRet<T>> => {
    return {
      data,
      error,
    };
  },
});

let mockCreateClient: any;
jest.mock('@supabase/supabase-js', () => {
  const from = jest.fn((table: Sb.TableName) => {
    // console.log('In from')
    switch (table) {
      case 'animals':
        return mockSelect(animalData);

      default:
        return mockSelect(null);
    }
  });

  mockCreateClient = {
    // createClient: jest.fn<typeof createClient2<Database>>().mockReturnValue(mockSupabase),
    // createClient: (supabaseUrl: string, supabaseAnonKey: string) => (mockSupabase)
    createClient: jest.fn((supabaseUrl: string, supabaseAnonKey: string) => ({
      from,
    })),
  };
  return mockCreateClient;
});

describe('getAnimals', () => {
  test('should return an array of Animals', async () => {
    const res = await helpers.getAnimals();
    expect(res).toBe(animalData);
  });

  test('should throw an error', async () => {
    error = {
      message: 'Test error',
      details: 'Very important detail',
      hint: 'Set triggerError to false',
      code: 'A-123',
    };
    expect(() => helpers.getAnimals()).rejects.toThrow('Test error');
    error = null;
  });

  test("it should've been called twice", () => {
    // console.log('createClient: ', mockCreateClient.createClient);
    // console.log('mock: ', mockCreateClient.createClient.mock);
    // console.log('from: ', mockCreateClient.createClient().from.mock);
    expect(mockCreateClient.createClient().from).toHaveBeenCalledTimes(2);
  });
});

// const mockSupabase: SupabaseClient<Database, 'public', GenericSchema> = {
// from: (table: Sb.TableName) => table + '-asdf',
// from: jest.fn<typeof supabase.from('animals').select('*')>(),
// supabaseUrl: 'asdf',
// supabaseKey: 'qwer',
// auth: {} as SupabaseAuthClient,
// realtime: {} as RealtimeClient,
// realtimeUrl: 'asdf',
// authUrl: 'asdf',
// storageUrl: 'asdf',
// functionsUrl: 'asdf',
// rest: {} as any,
// storageKey: 'asdf',
// storage: {} as any,
// headers: {},
// functions: {} as any,
// schema: {} as any,
// rpc: {} as any,
// channel: {} as any,
// getChannels: {} as any,
// removeChannel: {} as any,
// removeAllChannels: {} as any,
// _getAccessToken: 'asdf',
// _initSupabaseAuthClient: 'asdf',
// _initRealtimeClient: 'asdf',
// _listenForAuthEvents: 'asdf',
// _handleTokenChanged: 'asdf',
// };
// console.log('Mock supabase: ', mockSupabase);

// test("successful sign up", async () => {
//   jest.spyOn(supabase.auth, "signUp").mockResolvedValueOnce({ data: { user: null, session: null }, error: null });
// });
