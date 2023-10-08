import React, {useEffect, useMemo, useState} from 'react'
import {getSocketInstance} from "@/api/socket";
import { Badge, Grid,GridItem, Heading } from '@chakra-ui/react';

const socket = getSocketInstance()
let test = 0

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

    const [context, setContext] = useState([0,0,0,0,0,0,0,0,0])
    const socket = useMemo(() => getSocketInstance(), [])
    useEffect(() => {
        if(socket) {
            socket.on('newState', (message) => {
                // todo change state
                console.log('message', message)
                if(message.stateValue === 'playing' && message.stateContext.cells) {
                    setContext(message.stateContext.cells)
                }
            })
        }
        () => {
            console.log("unmount")
        }
    }, [])

    const makeMove = (index) => {
        console.log('socket', socket)
        if(socket) {
            socket.emit('PLAY', {i: index})
        }
    }

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
                onClick={() => makeMove(i)}
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
