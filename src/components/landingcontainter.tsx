'use client';

import React from 'react';
import { Card, Divider, Grid } from '@mui/material';
import '../style/landingcontainer.css';
import Image from 'next/image';

export default function LandingContainter(props: any) {
  return (
    <Card className="cont-card">
      <Grid container className="cont">
        <Grid item xs>
          {props.left
            ? <Image className="cont-img" src={props.path} alt="happy pets" width={300} height={250} priority />
            : (
              <>
                <h2 className="cont-subt">{props.subt}</h2>
                <p className="const-parag">{props.parag}</p>
              </>
            )}
        </Grid>
        <Divider className="divider" orientation="vertical" flexItem />
        <Grid item xs>
          {props.left
            ? (
              <>
                <h2 className="cont-subt">{props.subt}</h2>
                <p className="const-parag">{props.parag}</p>
              </>
            )
            : <Image className="cont-img" src={props.path} alt="happy pets" width={300} height={250} priority />}
        </Grid>
      </Grid>
    </Card>
  );
}
