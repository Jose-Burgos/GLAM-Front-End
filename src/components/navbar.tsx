import { Link } from 'react-router-dom';
import './navbar.css'
import BurgerButton from './burgerbutton';
import { useState, useEffect } from 'react'
import { Button, styled } from '@mui/material';

const LogButton = styled(Button)({
    fontFamily: 'Shadows Into Light',
    fontSize: '2rem',
    color: 'red',
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
            <h1 className='tittle-nav' >GLAM</h1>
            <div className={`links ${clicked ? 'active' : ''}`}>
                <Link onClick={handleClick} to="/">Inicio</Link>
                <Link onClick={handleClick} to="/test">Test 1</Link>
                <Link onClick={handleClick} to="/test">Test 2</Link>
                <Link onClick={handleClick} to="/test">Test 3</Link>
            </div>

            <div className='r-cont'>
                <LogButton className='logbtn'>Ingresa</LogButton>
                <div className='burger'>
                    <BurgerButton clicked={clicked} handleClick={handleClick} />
                </div>
            </div>

            <div className={`initial ${clicked ? 'active' : ''}`} />
        </nav>
    );
} 