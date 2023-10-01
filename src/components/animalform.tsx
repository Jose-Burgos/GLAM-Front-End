'use client';

import React, { useState , useEffect } from 'react';
import { Button, Card, TextField, styled , RadioGroup,Radio, FormControlLabel} from '@mui/material';
import '../style/contactform.css';
import { supabase } from '@/../supabase/supabaseClient';

const Tf = styled(TextField)({
fontFamily: 'Shantell Sans',
fontSize: '2rem',
color: 'blue',
marginLeft: '3rem'
});

const Sbtn = styled(Button)({
fontFamily: 'Helvetica Neue',
fontSize: '.5 rem',
color: 'blue',
});

function AnimalForm() {
    const [user, setUser] = useState<string>()
    const [formData, setFormData] = useState({
        org_id : '',
        name: '',
        breed: '',
        height: 0,
        species_id : 1,
        back_length : 0,
        weight : 0,
        age : 0,
        sex : false,
        health_rating : 0,
        vaccinated : false
    });

    useEffect (() =>{
        (async () =>{
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user?.id)
        })()
    })

    const AgregaAnimal = async ()=>{
        formData.org_id = user as string;
        const { data, error } = await supabase
        .from('animals')
        .insert({   
            org_id: formData.org_id, 
            name: formData.name,
            breed: formData.breed,
            height: formData.height,
            species_id: formData.species_id,
            back_length: formData.back_length, 
            weight: formData.weight, 
            age: formData.age,
            sex: formData.sex,
            health_rating: formData.health_rating,
            vaccinated: formData.vaccinated,
        })
        .select()
    }
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            AgregaAnimal()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        // <Card className="contact-card">
        <Card>
            {user != null  && 
        <form onSubmit={handleSubmit}>
            
            <div>
            <Tf
                // className="contact-input"
                label="Nombre"
                type="text"
                id="name"
                variant="standard"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Raza"
                type="text"
                id="breed"
                name="breed"
                variant="standard"
                value={formData.breed}
                onChange={handleChange}
            />
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Altura"
                type="number"
                id="height"
                name="height"
                variant="standard"
                value={formData.height}
                onChange={handleChange}
            />
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Longitud de espalda"
                type="number"
                id="back_length"
                name="back_length"
                variant="standard"
                value={formData.back_length}
                onChange={handleChange}
            />
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Peso"
                type="number"
                id="weight"
                name="weight"
                variant="standard"
                value={formData.weight}
                onChange={handleChange}
            />
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Edad"
                type="number"
                id="age"
                name="age"
                variant="standard"
                value={formData.age}
                onChange={handleChange}
            />
            </div>
            <div>
            <RadioGroup
                id='sex'
                aria-label="Sexo"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                >
                <FormControlLabel value={true} control={<Radio />} label="Masculino" />
                <FormControlLabel value={false} control={<Radio />} label="Femenino" />
            </RadioGroup>
            </div>
            <div>
            <Tf
                // className="contact-input"
                label="Salud"
                type="number"
                id="health_rating"
                name="health_rating"
                variant="standard"
                value={formData.health_rating}
                onChange={handleChange}
            />
            </div>
            <div>
            <RadioGroup
                id='vaccinated'
                aria-label="Vacunado"
                name="vaccinated"
                value={formData.vaccinated}
                onChange={handleChange}
                >
                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </div>
            <Sbtn className="submit-btn" type="submit">
            Agregar Animal
            </Sbtn>
        </form>
        }
        </Card>
    )}

    export default AnimalForm
