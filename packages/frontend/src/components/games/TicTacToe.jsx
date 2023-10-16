import React, {useEffect, useMemo, useState} from 'react'
import {getSocketInstance} from "@/api/socket";
import { Badge, Button, Grid,GridItem, Heading, Stack, VStack, AbsoluteCenter, Box, Text  } from '@chakra-ui/react';
import {isUndefined} from "lodash";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";
import {useNavigate} from "react-router-dom";

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
    const [showWinAlert, setShowWinAlert] = useState(false)
    const [showLoseAlert, setShowLoseAlert] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        if(socket && userId) {
            socket.off('newState').on('newState', (message) => {
                console.log('message', message)
                if((message.stateValue === 'playing' || message.stateValue === 'win') && message.stateContext.cells) {
                    setContext(message.stateContext.cells)
                    if(message.stateValue === 'win' && !gameFinished) {
                        setGameFinished(true)
                        if(message.stateContext.players[message.stateContext.winner] === userId) {
                            setShowWinAlert(true)
                        } else {
                            setShowLoseAlert(true)
                        }
                        setTimeout(() => {
                            navigate('/games')
                        }, 2000)
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
        <Badge bg="blue.theme" color='white' width="100%" p="1em" display="flex" justifyContent="space-between">
            <Text>TicTacToe</Text>
            <Text>{isMyTurn ? 'Is your Turn!' : 'Is Enemy Turn!'}</Text>
            <Text>Score 0 - 0</Text>
        </Badge>
        <AbsoluteCenter alignItems="center" justifyContent="center">
       {showWinAlert && <VStack 
          padding= '2em'
          bg='green.300'
          textAlign='center'
          borderRadius='1em'
          color='black.theme'
        >
          <Heading
            as='h3'
          >
            Hai vinto!
            </Heading>
            <Text>Uscendo dal gioco..</Text>
        </VStack>}
        {showLoseAlert && <VStack 
          padding= '2em'
          bg='green.300'
          textAlign='center'
          borderRadius='1em'
          color='black.theme'
        >
          <Heading
            as='h3'
          >
            Hai perso!
            </Heading>
            <Text>Uscendo dal gioco..</Text>
        </VStack>}
        

        
        </AbsoluteCenter>

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
    <Stack spacing={3} mt={5} justifyContent='center' alignItems='center'>
        <Button colorScheme="blue" variant="solid" width='10%' isDisabled={!isMyTurn}>Surrender</Button>

    </Stack>
    </>

    )
}
