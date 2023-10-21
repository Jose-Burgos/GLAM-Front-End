'use client';

import React from 'react';
import { Stack, Box, Text, Center, VStack } from '@chakra-ui/react';
import Image from 'next/image';

interface DataFormat {
  left?: boolean;
  path: string;
  subt: string;
  parag: string;
}

function DesktopContainer(props: DataFormat) {
  return (
    <Stack
      direction={['column', 'column', 'row', 'row']}
      display={{ base: 'none', md: 'inline-flex' }}
      spacing={4}
      paddingBottom={4}
      paddingTop={4}
    >
      <Center>
        {props.left ? (
          <Image
            src={props.path}
            alt="pets img"
            height={500}
            width={1000}
            priority
          />
        ) : (
          <Box>
            <Text color="black" align="center">
              {props.subt}
            </Text>
            <Text color="black">{props.parag}</Text>
          </Box>
        )}
      </Center>

      <Center>
        {props.left ? (
          <Box>
            <Text color="black" align="center">
              {props.subt}
            </Text>
            <Text color="black" align="center">
              {props.parag}
            </Text>
          </Box>
        ) : (
          <Image
            src={props.path}
            alt="pets img"
            height={500}
            width={1000}
            priority
          />
        )}
      </Center>
    </Stack>
  );
}

function MobileContainer(props: DataFormat) {
  return (
    <VStack
      direction={['row', 'row']}
      display={{ base: 'inline-flex', md: 'none' }}
      spacing={4}
      paddingBottom={4}
      paddingTop={4}
    >
      <Center width="80%">
        <Box>
          <Center>
            <Image
              src={props.path}
              alt="pets img"
              height={500}
              width={500}
              priority
            />
          </Center>
          <Box>
            <Text color="black" align="center">
              {props.subt}
            </Text>
            <Text color="black">{props.parag}</Text>
          </Box>
        </Box>
      </Center>
    </VStack>
  );
}

export default function LandingContainter(props: DataFormat) {
  return (
    <Center>
      <DesktopContainer
        left={props.left}
        path={props.path}
        subt={props.subt}
        parag={props.parag}
      />
      <MobileContainer
        path={props.path}
        subt={props.subt}
        parag={props.parag}
      />
    </Center>
  );
}
