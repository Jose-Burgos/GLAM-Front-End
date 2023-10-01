'use client';

import '../style/navbar.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, styled } from '@mui/material';
import { logout } from '~/supabase/helpers';
<<<<<<< HEAD
import BurgerButton from './burgerbutton';
=======
import { supabase } from '../../supabase/supabaseClient'
>>>>>>> 61a26cdc0e0001c6f5fe769fa5b65a21b8d49cba

const LogButton = styled(Button)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function NavBar() {
  const [clicked, setClicked] = useState(false);
<<<<<<< HEAD
  const [islogged, setlogged] = useState(false); // Cambiar esto
=======
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

>>>>>>> 61a26cdc0e0001c6f5fe769fa5b65a21b8d49cba
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLog = () => {
    setlogged(!islogged);
    logout();
  };

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })
  
        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    console.log("session: ")
    console.log(session)
    setLoading(false)

    function handleResize() {
      if (window.innerWidth >= 768) {
        setClicked(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, []);


  return (
    <nav>
      <h1 className="tittle-nav">
        <Link href="/">GLAM</Link>
      </h1>
      <div className={`links ${clicked ? 'active' : ''}`}>
        <Link onClick={handleClick} href="/">
          Inicio
        </Link>
        <Link onClick={handleClick} href="/adoption">
          Adopcion
        </Link>
        <Link onClick={handleClick} href="/reports/lost">
          Denuncias
        </Link>
        <Link onClick={handleClick} href="/ong">
          Organizaciones
        </Link>
        <Link onClick={handleClick} href="/">
          Donar
        </Link>
<<<<<<< HEAD
=======
        <Link onClick={handleClick} href="/create-account">
          Crear Cuenta
        </Link>
        <Link onClick={handleClick} href="/login">
          <LogButton className="logbtn-burger">Ingresa</LogButton>
        </Link>
        { session ? 
          <Link onClick={handleLogOut} href="/">
          Logout
          </Link>
          : 
          <>
          </>
        }
>>>>>>> 61a26cdc0e0001c6f5fe769fa5b65a21b8d49cba
      </div>
      <div className="r-cont">
        {islogged ? (
          <Link onClick={handleLog} href="/">
            <LogButton className="logbtn">Cerrar sesion</LogButton>
          </Link>
        ) : (
          <Link onClick={handleLog} href="/login">
            <LogButton className="logbtn">Ingresa</LogButton>
          </Link>
        )}
        <div className="burger">
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>
      </div>

      <div className={`initial ${clicked ? 'active' : ''}`} />
    </nav>
  );
}
