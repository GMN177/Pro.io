import React, {useEffect, useState} from 'react'
import {getSocketInstance} from "@/api/socket";
import { Badge, Grid,GridItem, Heading } from '@chakra-ui/react';

const socket = getSocketInstance()

const getScreenValue = (value) => {
    if(value === null) {
        return <></>
    }
    if(value === 0) {
        return 'O'
    }
    return 'X'
}
export const TicTacToe = () => {

    const [context, setContext] = useState([null,null,null,null,null,null,null,null,null])
    useEffect(() => {
        if(socket) {
            socket.on('newState', (state) => {
                // todo change state
            })
        }
        () => {
            console.log("unmount")
        }
    }, [])

    return (
        <>
        <Badge colorScheme="purple" width="100%" p="1em" display="flex" justifyContent="space-between">
            <p>TicTacToe</p>
            <p>Is your Turn!</p>
            <p>Score 0 - 0</p>
            </Badge>
        <Grid
            marginTop="2em"
            templateColumns="repeat(3, 0.1fr)"
            gap={4}
            justifyItems="center" // Center content horizontally
            alignItems="center"  // Center content vertically
            borderRadius="10px"
            p={4}
            bg="white"
            justifyContent="center"
    >
        {context.map((value, i) => {
            return (
            <GridItem
                display="flex"
                justifyContent="center"
                alignItems="center"
                key={i}
                width="5em"
                height="5em"
                fontSize="3xl"
                boxShadow= "0px 0px 10px rgba(0, 0, 0, 0.2)"
                borderRadius="5px"
                cursor="pointer"
                _hover={{
                    background: "gray.100", // Adjust the hover color as needed
                }}
                >
                <Heading>
                    {getScreenValue(value)}
                </Heading>
            </GridItem>)
      
    })}
    </Grid>
    </>
        
    )
}
