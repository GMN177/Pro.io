import React, {useEffect, useState} from 'react'
import axios from "axios";
import {baseURL} from "@/api/axiosConfig";
import {usersEndpoints} from "@/api/users.service";
import {StarIcon} from "@chakra-ui/icons";
import {Box, VStack, Flex, Heading, List, ListIcon, ListItem, HStack, Text, Grid} from "@chakra-ui/react";

export const Leaderboard = () => {
    const [topTenUsers, setTopTenUsers] = useState([])
    useEffect(() => {
        const getLeaderboard = async () => {
            const leaderboard = (await (axios.get(baseURL + usersEndpoints.leaderboard))).data.data
            setTopTenUsers(leaderboard)
            console.log(leaderboard.users)
        }
        getLeaderboard()
    }, [])

    const calcualteBg = (index) => {
        switch(index){
            case 0:
                return 'linear(to-l, blue.theme, blue.200)'
            case 1: 
                return 'linear(to-l, pink.200, pink.400)'   
            case 2: 
                return 'linear(to-l, yellow.200, yellow.400)'     
            default:
                return 'linear(to-l, gray.200, green.400)'  
        }
       
            
    }

    return (
        <>
        <VStack >
            <Heading as={'h1'} mt={5}>Leaderboard</Heading>
            <Heading as='h3' mb={4} size='md'>Here Are listed the top 10 players</Heading>
            <Grid  templateColumns="repeat(2, 1fr)" templateRows="auto" gap={2}>
            <Flex justifyContent="space-between" width='100%' gridColumn="span 2" px="3">
                <Text fontWeight='bold' as='samp'>Username</Text>
                <Text fontWeight='bold' as='samp'>Win Ratio</Text>
            </Flex>
                <List spacing={5} gridColumn="span 2">
                    {topTenUsers?.users?.map((u, key) => (
                        <ListItem key={key}>
                            <Flex  bgGradient={calcualteBg(key)} width="15em" p={1} borderRadius={10} flexDir="row-inverse" alignItems="center">

                                {key === 0 && <ListIcon as={StarIcon} color='blue.theme' bg="white" borderRadius={10} focusable="false" p={1}/>}
                                <Flex justifyContent="space-between" width='100%'>
                                    <Text > {u.username}</Text>
                                    <Text pr={1}> {u.winsRatio}</Text>
                                </Flex>   
                            </Flex>
                        </ListItem>

                    ))}
                </List>
            </Grid>  
        </VStack>
        </>
    )
}
