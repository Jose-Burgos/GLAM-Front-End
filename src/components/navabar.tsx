'use client';

import '../style/navbar.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, styled } from '@mui/material';
import BurgerButton from './burgerbutton';
import { logout } from '~/supabase/helpers';

const LogButton = styled(Button)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function NavBar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogOut = () => {
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
        <Link onClick={handleClick} href="/patitas">
          Adopcion
        </Link>
        <Link onClick={handleClick} href="/">
          Denuncias
        </Link>
        <Link onClick={handleClick} href="/ong">
          Organizaciones
        </Link>
        <Link onClick={handleClick} href="/">
          Donar
        </Link>
        <Link onClick={handleClick} href="/create-account">
          Crear Cuenta
        </Link>
        <Link onClick={handleClick} href="/login">
          <LogButton className="logbtn-burger">Ingresa</LogButton>
        </Link>
        <Link onClick={handleLogOut} href="/">
          Logout
        </Link>
      </div>
      <div className="r-cont">
        <Link onClick={handleClick} href="/login">
          <LogButton className="logbtn">Ingresa</LogButton>
        </Link>
        <div className="burger">
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>
      </div>

      <div className={`initial ${clicked ? 'active' : ''}`} />
    </nav>
  );
}
