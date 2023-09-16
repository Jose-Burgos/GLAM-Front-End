'use client';

import React from 'react';
import { Card, Grid } from '@mui/material';
import '../style/landingcontainer.css';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingContainter(props: any) {
  return (
    <Card className="cont-card">
      <Grid container className="cont">
        <Grid item xs={12} sm>
          {props.left ? (
            <div className="img-container">
              <Link rel="preload" href={props.path} as="img" />
              <Image
                className="img-next right"
                src={props.path}
                alt="happy pets"
                quality={100}
                fill
                sizes="@media(max-width: 768px) 100vw"
                priority
              />
            </div>
          ) : (
            <div className="p-container">
              <h2 className="cont-subt">{props.subt}</h2>
              <p className="const-parag">{props.parag}</p>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm>
          {props.left ? (
            <>
              <h2 className="cont-subt">{props.subt}</h2>
              <p className="const-parag">{props.parag}</p>
            </>
          ) : (
            <div className="img-container">
              <Link rel="preload" href={props.path} as="img" />
              <Image
                className="img-next left"
                src={props.path}
                alt="happy pets"
                quality={100}
                fill
                sizes="@media(max-width: 768px) 100vw"
                priority
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
