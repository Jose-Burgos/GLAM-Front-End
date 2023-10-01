import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';
import React, { useEffect } from "react";
import { useEffect } from 'react';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
export default function AddAnimal() {
    useEffect(() => {

        const { error } = await supabase
            .from('animals')
            .delete()
            .eq('some_column', 'someValue')


    }, [])


    return (
        <>
            <h1>Eliminar Animal</h1>

        </>
    )
}
