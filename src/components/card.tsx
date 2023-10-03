'use Client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function MediaCard(props: any) {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 400 }} image={props.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/adoption/${props.id}`}>
          <Button size="medium">Detalles</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
