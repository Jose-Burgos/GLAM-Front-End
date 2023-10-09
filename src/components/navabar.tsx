'use client';

import '../style/navbar.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, styled } from '@mui/material';
import HelperFunctions from '~/supabase/helpers';
import BurgerButton from './burgerbutton';

const LogButton = styled(Button)({
  fontFamily: 'Shantell Sans',
  fontSize: '2rem',
  color: 'blue',
});

export default function NavBar() {
  const authService = HelperFunctions;
  const [clicked, setClicked] = useState<Boolean>(false);
  const [logged, setLogged] = useState<Boolean>(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    (async () => {
      const user = authService.getSession();
      if (user !== null) {
        setClicked(true);
      }
      setClicked(false);
    })();
  }, [logged, authService]);

  const handleLog = () => {
    authService.logout();
    setLogged(false);
  };

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
        <Link onClick={handleClick} href="/patitas">
          ONG Home
        </Link>
      </div>
      <div className="r-cont">
        <Link onClick={handleLog} href={logged ? '/' : '/login'}>
          <LogButton className="logbtn">
            {logged ? 'Cerrar sesion' : 'Ingresa'}
          </LogButton>
        </Link>
        <div className="burger">
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>
      </div>

      <div className={`initial ${clicked ? 'active' : ''}`} />
    </nav>
  );
}
