'use client';
import React, { useEffect , useState } from 'react';
import { getAnimals , getCurrentUser } from '~/supabase/helpers';
import { supabase } from '../../../supabase/supabaseClient';
import { Animal , RegularUser, Organization} from '~/supabase/types/supabase.tables';
import AnimalForm from '@/components/animalform'
import RecipeReviewCard from '@/components/petcard';

export default function PatitasGlew() {

  const [userID, setUserID] = useState<string>()
  const [isOrg, setIsOrg] = useState(false)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [userName, setUserName] = useState()
  
  useEffect (() =>{
    (async () =>{
      //Get user info
      let { data: { user } } = await supabase.auth.getUser()
      setUserID(user?.id)
      setUserName(user?.user_metadata.name)
      const { profile, type } = await getCurrentUser();
      if(type === 'Organization'){
        setIsOrg(true);
      }
      setAnimals(animals)
    })()
  },[userID])

  async function fetchAnimals() {
    try {
      const animalsArray = await getAnimals();
      setAnimals(animalsArray);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  }
  fetchAnimals();
    
    return (
      <div>
      <h1>Hola {userName} !</h1>
      <ul>
        {
          isOrg?
          // animals?.map((animal) => (
          //   animal.org_id === userID && 
          //   
          //   ))
          <div className="pet-card">
            <h2>Animales Disponibles</h2>
            {animals?.map((animal) => (
              animal.org_id === userID &&
              <li key={animal.id}>{animal.name}</li>
              ))}
        </div>
        :
          <h1>La organizacion no tiene animales agregados</h1>
        }
      </ul>

      <a href="/patitas/addAnimal">
        <span style={{ color: 'black' }}>Agregar Animal</span>
      </a>
      <a href="/patitas/deleteAnimal">
        <span style={{ color: 'black' }}>Eliminar Animal</span>
      </a>
      <a href="/patitas/editAnimal">
        <span style={{ color: 'black' }}>Editar Animal</span>
      </a>
    </div>
  )
}
