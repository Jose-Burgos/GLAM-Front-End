'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Animal } from '~/supabase/types/supabase.tables';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface props {
  pet: Animal;
}

export default function RecipeReviewCard(prop: props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {prop.pet.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={prop.pet.name}
        subheader={prop.pet.rescue_date}
      />
      <CardMedia
        component="img"
        height="194"
        src="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
        alt={prop.pet.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Años de edad:{prop.pet.age}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Información del animal:</Typography>
          <Typography paragraph>
            Rescatado el día:{prop.pet.rescue_date}
          </Typography>
          <Typography paragraph>Especie:{prop.pet.species.name}</Typography>
          <Typography paragraph>Sexo:{prop.pet.sex}</Typography>
          <Typography paragraph>Altura:{prop.pet.height}</Typography>
          <Typography paragraph>Peso:{prop.pet.weight}</Typography>
          <Typography paragraph>Vacunado:{prop.pet.vaccinated}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
