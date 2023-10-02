'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/../supabase/supabaseClient';
import { Animal } from '~/supabase/types/supabase.tables'
import { getAnimals , getCurrentUser } from '~/supabase/helpers'
import { UUID } from 'crypto';


export default function DeleteAnimal() {
    const [animals, setAnimals] = useState<Animal[]>([])
    const [userID, setUserID] = useState<string>()
    const [isOrg, setIsOrg] = useState(false)


    useEffect (() =>{
        (async () =>{
            //Get user info
            const { profile, type } = await getCurrentUser()
            setUserID(profile.id)
            if(type === 'Organization'){
                setIsOrg(true);
            }
            fetchAnimals();
        })()
        },[userID])

    async function fetchAnimals() {
        try {
            const animalsArray = await getAnimals()
            setAnimals(animalsArray)
        } catch (error) {
            console.error('Error fetching animals:', error)
        }
    }
    
    async function DeleteAnimal(animalID: UUID) {
        const { error } = await supabase
        .from('animals')
        .delete()
        .eq('id', animalID)
        if(error){
            console.error('Error deleting animal:', error)
        }
    }

    const handleClick = (nombre : String) => { 
        DeleteAnimal(nombre as UUID)
    }


    return (
        <div>
            <h1>Eliminar Animal</h1>
            <p>Selecciona el animal a eliminar</p>
            {animals?.map((animal : Animal) => (
                animal.org_id === userID &&
                <div key={animal.id}>
                    <button onClick={() => handleClick(animal.id)}>{animal.name}</button>
                    <br/>
                </div>   
                ))}
        </div>
    )
}