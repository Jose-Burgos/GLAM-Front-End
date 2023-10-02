'use client';

import RecipeReviewCard from '@/components/petcard';
import React, { useState, useEffect } from 'react';
import { getCurrentUser, getAnimals } from '~/supabase/helpers';
import {
  RegularUserPublic,
  OrganizationPublic,
  Animal,
} from '~/supabase/types/supabase.tables';

export default function UserHome() {
  const [userName, setUserName] = useState('');
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const { profile, type } = await getCurrentUser();

        if (type === 'RegularUser') {
          const regularUserProfile = profile as RegularUserPublic;
          setUserName(regularUserProfile.first_name);
        } else if (type === 'Organization') {
          const organizationProfile = profile as OrganizationPublic;
          setUserName(organizationProfile.name);
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
    <div>
      <h1>Bienvenido {userName}!</h1>
      <div>
        <div className="pet-card">
          <h2>Animales Disponibles</h2>
          {animals.map((animal) => (
            <RecipeReviewCard {...animal}></RecipeReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
}
