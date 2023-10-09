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
import { Animal } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
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

function AnimalForm(props: { animal?: Animal; submitBtnText?: string }) {
  const [orgId, setOrgId] = useState<string>();
  const [formData, setFormData] = useState(props.animal || ({} as Animal));

  useEffect(() => {
    (async () => {
      const id = await supabase.getCurrentUserId();
      setOrgId(id);
    })();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      formData.org_id = orgId as string;
      supabase.upsertAnimal(formData as Animal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Card className="contact-card">
    <Card>
      {orgId != null && (
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
              inputProps={{ maxLength: 20 }}
              required
            />
          </div>
          <div className="input">
            {/* Probablemente convenga que sea un dropdown menu también y que 
                la opción default sea 'Desconocido' o algo así */}
            <Tf
              // className="contact-input"
              label="Raza"
              type="text"
              id="breed"
              name="breed"
              variant="standard"
              value={formData.breed || ''}
              onChange={handleChange}
              inputProps={{ maxLength: 20 }}
              required
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
              inputProps={{ min: 0, max: 200 }}
              required
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
              inputProps={{ min: 0, max: 300 }}
              required
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
              inputProps={{ min: 0, max: 50 }}
              required
            />
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Edad (En años)" // Quizá habría que permitir meter la edad en días, meses y años o algo así
              type="number"
              id="age"
              name="age"
              variant="standard"
              value={formData.age || ''}
              inputProps={{ min: 0 }}
              onChange={handleChange}
              required
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
              defaultValue
              aria-required
            >
              <FormControlLabel
                value={true}
                control={<Radio required />}
                label="Masculino"
              />
              <FormControlLabel
                value={false}
                control={<Radio required />}
                label="Femenino"
              />
            </RadioGroup>
          </div>
          <div className="input">
            <Tf
              // className="contact-input"
              label="Salud (Se ve más chiquito por el límite de 0 a 10, vean cómo arreglar eso)"
              type="number"
              id="health_rating"
              name="health_rating"
              variant="standard"
              value={formData.health_rating || ''}
              onChange={handleChange}
              inputProps={{ min: 0, max: 10 }}
              required
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
              required
              inputProps={{ min: 0 }}
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
              defaultValue
              aria-required
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
            {props.submitBtnText || 'Submit'}
          </Sbtn>
        </form>
      )}
    </Card>
  );
}

export default AnimalForm;
