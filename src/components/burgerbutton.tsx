'use client';

import React from 'react';
import '../style/burgerbutton.css';

export default function BurgerButton(props: any) {
  return (
    <div>
      <div onClick={props.handleClick} className={`icon nav-icon-1 ${props.clicked ? 'open' : ''}`}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
