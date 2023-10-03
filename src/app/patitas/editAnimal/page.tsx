'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/../supabase/supabaseClient';
import { Animal } from '~/supabase/types/supabase.tables'
import { getAnimals , getCurrentUser } from '~/supabase/helpers'
import {} from '@/components/animalform'
import AnimalForm from '@/components/animalform'

export default function EditAnimal() {
    const [animals, setAnimals] = useState<Animal[]>([])
    const [userID, setUserID] = useState<string>()
    const [isOrg, setIsOrg] = useState(false)
    const [selected, setSelected] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState<Animal>()

    useEffect (() =>{
        (async () =>{
            //Get user info
            const { type } = await getCurrentUser()
            let { data: { user } } = await supabase.auth.getUser()
            setUserID(user?.id)
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

    const handleClick = (id : Animal) => { 
        setSelectedAnimal(id)
        setSelected(true)
    }
    

    return (
        <div>
            <h1>Editar Animal</h1>
            {
                selected ?
                <AnimalForm animal={selectedAnimal}/>
                :
                <div>
                    <p>Selecciona el animal a editar</p>
                    {animals?.map((animal : Animal) => (
                    animal.org_id === userID &&
                    <div key={animal.id}>
                        <button onClick={() => handleClick(animal)}>{animal.name}</button>
                        <br/>
                    </div>   
                    ))}
                </div>  

            }
        </div>
    )
}