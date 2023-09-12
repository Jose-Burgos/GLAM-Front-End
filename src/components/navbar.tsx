import { Link } from 'react-router-dom';
import './navbar.css'
import BurgerButton from './burgerbutton';
import { useState, useEffect } from 'react'
import { Button, styled } from '@mui/material';

const LogButton = styled(Button)({
    fontFamily: 'Shantell Sans',
    fontSize: '2rem',
    color: 'blue',
})

export default function NavBar() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }

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
            <h1 className='tittle-nav' ><Link to="/">GLAM</Link></h1>
            <div className={`links ${clicked ? 'active' : ''}`}>
                <Link onClick={handleClick} to="/">Inicio</Link>
                <Link onClick={handleClick} to="/adopcion">Adopcion</Link>
                <Link onClick={handleClick} to="/test">Denuncias</Link>
                <Link onClick={handleClick} to="/ong">Organizaciones</Link>
                <Link onClick={handleClick} to="/test">Donar</Link>
                <Link onClick={handleClick} to="/rescue">Reportar</Link>
            </div>
            <div className='r-cont'>
                <Link to="/test"><LogButton className='logbtn'>Ingresa</LogButton></Link>
                <div className='burger'>
                    <BurgerButton clicked={clicked} handleClick={handleClick} />
                </div>
            </div>

            <div className={`initial ${clicked ? 'active' : ''}`} />
        </nav>
    );
} 