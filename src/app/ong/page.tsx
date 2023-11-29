import React/* , { useState, useEffect } */ from 'react';
import OngCard from '@/components/ongcard';
import { CircularProgress, Flex, Grid, GridItem } from '@chakra-ui/react';
import HelperFunctions from '~/supabase/helpers';

const ongData: any = [];

export default function OngView() {
  // const [ongData, setOngData] = useState<[]>();
  // const [success, setSuccess] = useState(true);
  //
  // useEffect(() => {
  //  (async () => {
  //    const data = await HelperFunctions.getOng();
  //    setOngData(data);
  //    setSuccess(true);
  //  })();
  // }, []);

  return (
    <Flex position="relative" mb="10%">
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        mt={{ sm: '5%', md: '15%', lg: '10%', xl: '5%' }}
        w="100wh"
        maxW="1044px"
        mx="auto"
        pt={{ sm: '100px', md: '0px' }}
      >
        <Flex justifyContent="start" style={{ userSelect: 'none' }}>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            background="transparent"
          >
            <Grid
              gap={8}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
            >
              {/* {success ? ( */}
              {/*   ongData?.map((card, idx) => ( */}
              {/*     <GridItem key={idx}> */}
              {/*       <OngCard id={card.id} img={card.url} name={card.name} /> */}
              {/*     </GridItem> */}
              {/*   )) */}
              {/* ) : ( */}
              {/*   <CircularProgress isIndeterminate color="teal.300" /> */}
              {/* )} */}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
