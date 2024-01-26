'use client';

import React, { useEffect, useState } from 'react';
import { Animal, ProfileType } from '~/supabase/types/supabase.tables';
import supabase from '~/supabase/helpers';
import { Box, Button, CSSReset, Center, ChakraProvider, Flex, FormControl, FormErrorMessage, FormLabel, Grid, HStack, Heading, Input, Radio, RadioGroup, Stack, VStack, useColorMode, useToast } from '@chakra-ui/react';
import OrgDashboardSidebar from '@/components/OrgDashboardSidebar';
import { OngInfo } from '~/supabase/types/supabase.tables';
import OngInformation from '@/components/onginfo';

export default function Settings() {
    const [ong, setOng] = useState<OngInfo|null >(null);
    useEffect(() => {
        (async () => {
            const user = await supabase.getOrganization()
            setOng(user[0])
            // console.log(user)
        })();
    }, []);

    return (
        <Flex p={8} flexDirection="column" justifyContent="center">
            <HStack>
                <OrgDashboardSidebar />
                {ong &&
                    <OngInformation ong = {ong}/>
                }
            </HStack>
        </Flex>
    );
}
