'use client';

import ContactForm from '@/components/contactform';
import GoogleMapsView from '@/components/googlemaps';
import { Box, CardMedia, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAnimals } from '~/supabase/helpers';
import { Animal } from '~/supabase/types/supabase.tables';
import './carousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Ubicacion" />
          <Tab label="Contactanos" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GoogleMapsView />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ContactForm />
      </CustomTabPanel>
    </Box>
  );
}

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({
      delay: 4000,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
      stopOnLastSnap: true,
    }),
  ]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <CardMedia
            sx={{
              aspectRatio: 2 / 1,
            }}
            image="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
          />
        </div>
        <div className="embla__slide">
          <CardMedia
            sx={{
              aspectRatio: 2 / 1,
            }}
            image="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
          />
        </div>
        <div className="embla__slide">
          <CardMedia
            sx={{
              aspectRatio: 2 / 1,
            }}
            image="https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456908_1706x960.jpg"
          />
        </div>
      </div>
    </div>
  );
}

interface props {
  params: { id: string };
}

export default function animalDescription(pparam: props) {
  const [data, setData] = useState<Animal>();
  useEffect(() => {
    (async () => {
      const aux = await getAnimals();
      setData(aux?.find((animal) => animal.id === pparam.params.id));
    })();
  }, [pparam.params.id]);

  return (
    <div>
      <Carousel />
      <h1>{data?.name}</h1>
      <h1>{data?.age}</h1>
      <h1>{data?.breed}</h1>
      <BasicTabs />
    </div>
  );
}
