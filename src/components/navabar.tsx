'use client';

import '../style/navbar.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, styled } from '@mui/material';
import { logout } from '~/supabase/helpers';
import BurgerButton from './burgerbutton';

const LogButton = styled(Button)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function NavBar() {
  const [clicked, setClicked] = useState(false);
  const [islogged, setlogged] = useState(false); // Cambiar esto
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLog = () => {
    setlogged(!islogged);
    logout();
  };

  useEffect(() => {
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
        <Link onClick={handleClick} href="/ong/auth/home">
          ONG Home
        </Link>
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
