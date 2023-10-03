'use client';

import RecipeReviewCard from '@/components/petcard';
import React, { useState, useEffect } from 'react';
import { getCurrentUser, getAnimals } from '~/supabase/helpers';
import * as Sb  from '~/supabase/types/supabase.tables';
import './user-home.css';

export default function UserHome() {
  const [userName, setUserName] = useState('');
  const [animals, setAnimals] = useState<Sb.Animal[]>([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const { profile, type } = await getCurrentUser();

        if (type === 'RegularUser') {
          const regularUserProfile = profile as Sb.Profile<Sb.UserType>;
          setUserName(regularUserProfile.private.first_name);
        } else if (type === 'Organization') {
          const organizationProfile = profile as Sb.Profile<Sb.OrgType>;
          setUserName(organizationProfile.public.name);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    async function fetchAnimals() {
      try {
        const animalsArray = await getAnimals();
        setAnimals(animalsArray);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    }
    fetchUser();
    fetchAnimals();
  }, []);

  return (
    <div className="globalDiv">
      <h1 className="welcomeMessage">Bienvenido {userName}!</h1>
      <h2 className="subMessage">Animales Disponibles</h2>
      <div className="allCards">
        <div className="pet-card">
          {animals.map((animal) => (
            <h1>Hola</h1>
            // <RecipeReviewCard {...animal} />
          ))}
        </div>
      </div>
    </div>
  );
}
