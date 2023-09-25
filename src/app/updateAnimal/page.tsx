'use client'
import { useEffect, useState } from 'react';
import { getAnimals } from '~/supabase/helpers';
import { supabase } from '../../../supabase/supabaseClient'
import { Animal } from '~/supabase/types/supabase.tables';

export default function updateAnimal() {
    const [animals, setAnimals] = useState<Animal>();
    const [name, setName] = useState(null);
    const [breed, setBreed] = useState(null);
    const [height, setHeight] = useState(null);
    const [back_length, setBacklength] = useState(null);
    const [weight, setWeight] = useState(null);
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)


    const call = async () => {
        let { data, error } = await supabase
        .from('animals')
        .select('name, breed, height,back_length,weight,age')
        .eq('name', 'Señor Gato')

        if (error) {
            console.warn(error)
        } else if (data) {
            setName(data[0].name)
            setBreed(data[0].breed)
            setHeight(data[0].height)
            setBacklength(data[0].back_length)
            setWeight(data[0].weight)
            setAge(data[0].age)
        }
        // console.log(data[0])
        
    }
    useEffect(() =>  {
        setLoading(true)
        call()
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            })
    
            supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            })
        console.log("session: ")
        console.log(session)
        setLoading(false)
        },[])

    async function updateAnimals(event) {
        event.preventDefault()
        console.log(event)
        const updates = {
        name ,
        breed,
        height ,
        back_length ,
        weight,
        age,
        updated_at: new Date(),
        }

        let { error } = await supabase.from('animals').upsert(updates)

        if (error) {
        alert(error.message)
        }
    }

    // setName(animaluno.name);
    return (
        <form onSubmit={updateAnimals} className="form-widget">
        <div>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" value={name || ' '} disabled /> 


        </div>
        <div>
            <label htmlFor="breed">Raza</label>
            <input
            id="breed"
            type="text"
            required
            value={breed || ' '}
            onChange={(e) => setBreed(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="height">Altura</label>
            <input
            id="height"
            type="integer"
            required
            value={height || ' '}
            onChange={(e) => setHeight(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="back_lenght">Longitud de Espalda</label>
            <input
            id="back_length"
            type="integer"
            required
            value={back_length || ' '}
            onChange={(e) => setBacklength(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="weight">Weight</label>
            <input
            id="weight"
            type="integer"
            value={weight || ' '}
            onChange={(e) => setWeight(e.target.value)}
            />
        </div>

        <div>
            <button className="button block primary" type="submit" disabled={loading}>
            {loading ? 'Cargando ...' : 'Actualizar Datos'}
            </button>
        </div>
{/* 
        <div>
            <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
            Cerrar Sesion
            </button> 
        </div> */}
        </form>
    )
}
