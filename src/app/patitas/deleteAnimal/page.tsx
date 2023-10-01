import AnimalForm from '@/components/animalform'
import React, { useEffect } from 'react'
import { supabase } from '@/../supabase/supabaseClient';

export default function AddAnimal() {
    
    const EliminaAnimal = async ()=>{
        const { error } = await supabase
        .from('animals')
        .delete()
        .eq('name', 'someValue')
    }

    useEffect(() => {    
        
    },[])


    return (
        <>
            <h1>Eliminar Animal</h1>
            
        </>
    )
}