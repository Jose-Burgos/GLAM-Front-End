import React from 'react';
import './ong.css';
import Grid from '@/components/grid';

export default function OngView() {
  return (
    <div className="ong-container">
      <div className="ong-text">
        <h1 className="title">Organizaciones Adheridas</h1>
      </div>
      <div>
        <Grid />
      </div>
    </div>
  );
}
