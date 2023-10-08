'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  TextField,
  styled,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import '../style/contactform.css';
import { supabase } from '@/../supabase/supabaseClient';
import { Animal } from '~/supabase/types/supabase.tables';
import { upsertAnimal } from '~/supabase/helpers';
import '../style/animalform.css';

const Tf = styled(TextField)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
  marginLeft: '4rem',
});

const Sbtn = styled(Button)({
  fontFamily: 'Helvetica Neue',
  fontSize: '.5 rem',
  color: 'blue',
  textAlign: 'center',
  alignItems: 'center',
});

function AnimalForm(props: any) {
  const [user, setUser] = useState<string>();
  const [formData, setFormData] = useState({
    id: props.animal?.id,
    org_id: props.animal?.org_id,
    // updated_at: new Date(),
    name: props.animal?.name,
    breed: props.animal?.breed,
    height: props.animal?.height,
    species_id: props.animal?.species_id,
    back_length: props.animal?.back_length,
    weight: props.animal?.weight,
    age: props.animal?.age,
    sex: props.animal?.sex,
    health_rating: props.animal?.health_rating,
    vaccinated: props.animal?.vaccinated,
  });

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.id);
    })();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      formData.org_id = user as string;
      upsertAnimal(formData as Animal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Card className="contact-card">
    <Card>
      {user != null && (
        <form onSubmit={handleSubmit}>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Nombre"
              type="text"
              id="name"
              variant="standard"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Raza"
              type="text"
              id="breed"
              name="breed"
              variant="standard"
              value={formData.breed || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Altura (cm)"
              type="number"
              id="height"
              name="height"
              variant="standard"
              value={formData.height || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Longitud (cm)"
              type="number"
              id="back_length"
              name="back_length"
              variant="standard"
              value={formData.back_length || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Peso (kg)"
              type="number"
              id="weight"
              name="weight"
              variant="standard"
              value={formData.weight || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Edad"
              type="number"
              id="age"
              name="age"
              variant="standard"
              value={formData.age || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <RadioGroup
              id="sex"
              aria-label="Sexo"
              name="sex"
              value={formData.sex || ''}
              onChange={handleChange}
              className="roundInput "
            >
              <FormControlLabel value control={<Radio />} label="Masculino" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Femenino"
              />
            </RadioGroup>
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Salud"
              type="number"
              id="health_rating"
              name="health_rating"
              variant="standard"
              value={formData.health_rating || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Tipo de Animal"
              type="number"
              id="species_id"
              name="species_id"
              variant="standard"
              value={formData.species_id || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <RadioGroup
              id="vaccinated"
              aria-label="Vacunado"
              name="vaccinated"
              value={formData.vaccinated || ''}
              onChange={handleChange}
              className="roundInput"
            >
              <FormControlLabel value control={<Radio />} label="Vacunado" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No Vacunado"
              />
            </RadioGroup>
          </div>
          <Sbtn className="submit-btn" type="submit">
            Editar Animal
          </Sbtn>
        </form>
      )}
    </Card>
  );
}

export default AnimalForm;
