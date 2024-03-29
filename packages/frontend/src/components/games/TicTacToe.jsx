import React, {useEffect, useMemo, useState, useRef} from 'react'
import {getChatSocketInstance, getTicTacToeSocketInstance} from "@/api/socket";
import { Badge, Button, Grid,GridItem, Heading, Stack, VStack, AbsoluteCenter, useDisclosure, Text, Alert  } from '@chakra-ui/react';
import {isUndefined} from "lodash";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";
import {loggedUserSelectors} from "@/store/loggedUser/loggedUser.selector"
import {useNavigate, useParams} from "react-router-dom";
import Chat from "../Utils/Chat";

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
    const [isMyTurn, setIsMyTurn] = useState(props.isFirstPlayer)
    const socket = useMemo(() => getTicTacToeSocketInstance(), [])
    const userId = useSelector(loginSelectors.getUserId)
    const user = useSelector(loggedUserSelectors.getLoggedUserInfo)
    const [gameFinished, setGameFinished] = useState(false)
    const [showWinAlert, setShowWinAlert] = useState(false)
    const [showLoseAlert, setShowLoseAlert] = useState(false)
    const [showDrawAlert , setShowDrawAlert] = useState(false)
    const {matchId} = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {

        if(socket && userId) {
            socket.off('newState').on('newState', (message) => {
                console.log('message', message)
                console.log('userId', userId)
                if((message.stateValue === 'playing' || message.stateValue === 'win' || message.stateValue === 'draw') && message.stateContext.cells) {
                    setContext(message.stateContext.cells)
                    if(message.stateValue === 'win' && !gameFinished) {
                        setGameFinished(true)
                        socket.off('newState')
                        socket.disconnect()
                        if(message.stateContext.players[message.stateContext.winner] === userId) {
                            setShowWinAlert(true)
                        } else {
                            setShowLoseAlert(true)
                        }
                        setTimeout(() => {
                            navigate('/games')
                        }, 3000)
                    }
                    if(message.stateValue === 'draw' && !gameFinished) {
                        setGameFinished(true)
                        setShowDrawAlert(true)
                        setTimeout(() => {
                            navigate('/games')
                        }, 3000)
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
        </Badge>
        <AbsoluteCenter alignItems="center" justifyContent="center">
       {showWinAlert && <Alert
          padding= '2em'
          bg='green.300'
          textAlign='center'
          borderRadius='1em'
          color='black.theme'
          fontSize="2xl"
        >
          
            Hai vinto! Uscendo dal gioco..
            </Alert>
  }
        {showLoseAlert && <Alert
          padding= '2em'
          bg='red.300'
          textAlign='center'
          borderRadius='1em'
          color='black.theme'
          fontSize="2xl"
        >
            Hai perso! Uscendo dal gioco..

        </Alert>}
        {showDrawAlert && <Alert
            padding='2em'
            bg='blue.300'
            textAlign='center'
            borderRadius='1em'
            color='black.theme'
            fontSize="2xl"
            >
                Pareggio ! Uscendo dal gioco...
            </Alert>
            }



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
    <Chat isOpen={isOpen} onClose={onClose} btnRef={btnRef} username={user?.username} onOpen={onOpen} matchId={matchId}/>
    <Stack spacing={3} my={5} justifyContent='center' alignItems='center' direction='row' >
        <Button colorScheme="blue" variant="solid" width='10%' isDisabled={!isMyTurn} onClick={() => socket.emit("SURRENDER")}>Surrender</Button>
        <Button colorScheme="blue" variant="solid" width='10%' ref={btnRef} onClick={onOpen}>Chat</Button>
    </Stack>
    </>

    )
}
