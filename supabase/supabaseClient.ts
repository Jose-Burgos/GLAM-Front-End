import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';
import React, { useEffect } from 'react';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
