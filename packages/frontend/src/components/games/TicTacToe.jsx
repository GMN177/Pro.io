import React, {useEffect, useMemo, useState} from 'react'
import {getSocketInstance} from "@/api/socket";
import { Badge, Button, Grid,GridItem, Heading, Stack } from '@chakra-ui/react';
import {isUndefined} from "lodash";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";

const getScreenValue = (value) => {
    if(value === null) {
        return <></>
    }
    if(value === 0) {
        return 'O'
    }
    return 'X'
}

export const TicTacToe = (props) => {

    const [context, setContext] = useState([null,null,null,null,null,null,null,null,null,])
    // todo set as false when we know who is the first
    const [isMyTurn, setIsMyTurn] = useState(props.isFirstPlayer)
    const socket = useMemo(() => getSocketInstance(), [])
    const userId = useSelector(loginSelectors.getUserId)
    const [gameFinished, setGameFinished] = useState(false)
    useEffect(() => {

        if(socket && userId) {
            socket.off('newState').on('newState', (message) => {
                console.log('message', message)
                if((message.stateValue === 'playing' || message.stateValue === 'win') && message.stateContext.cells) {
                    setContext(message.stateContext.cells)
                    if(message.stateValue === 'win' && !gameFinished) {
                        setGameFinished(true)
                        if(message.stateContext.players[message.stateContext.winner] === userId) {
                            alert('You win!')
                        } else {
                            alert('You lose!')
                        }
                    }
                }
                if(!isUndefined(message.stateContext.currentPlayer) && message.stateContext.players) {
                    if(message.stateContext.players[message.stateContext.currentPlayer] === userId) {
                        setIsMyTurn(true)
                    } else {
                        setIsMyTurn(false)
                    }
                }
            })

        }
    }, [])

    const makeMove = (index) => {
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
                onClick={() => {if(isMyTurn) makeMove(i)}}
                height="5em"
                fontSize="3xl"
                boxShadow= "0px 0px 10px rgba(0, 0, 0, 0.2)"
                borderRadius="5px"
                cursor={isMyTurn ? "pointer" : undefined}
                _hover={isMyTurn ? {
                    background: "gray.100", // Adjust the hover color as needed
                }: {}}
                >
                <Heading>
                    {getScreenValue(value)}
                </Heading>
            </GridItem>)

    })}
    </Grid>
    <Stack spacing={3} mt={5}>
        <Button colorScheme="blue" variant="solid" disabled={!isMyTurn}>Surrender</Button>

    </Stack>
    </>

    )
}
