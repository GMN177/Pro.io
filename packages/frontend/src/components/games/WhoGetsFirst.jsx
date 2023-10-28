import {
    AbsoluteCenter,
    Badge,
    Button,
    Grid,
    GridItem,
    Heading,
    Stack,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import Chat from "@/components/Utils/Chat";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";
import {loggedUserSelectors} from "@/store/loggedUser/loggedUser.selector";
import {useNavigate, useParams} from "react-router-dom";
import {getWhoGetsFirstSocketInstance} from "@/api/socket";

const getBaseContext = () => {
    const empty = []
    for(let i = 0; i < 25; i++) {
        for(let j = 0; j<25; j++) {
            empty.push({x: i, y: j, selected: false})
        }
    }
    return empty;
}
export const WhoGetsFirst = ({firstY, firstX}) => {

    const socket = useMemo(() => getWhoGetsFirstSocketInstance(), [])

    const {matchId} = useParams();

    const [context, setContext] = useState(getBaseContext())
    const [gameFinished, setGameFinished] = useState(false)
    const [showWinAlert, setShowWinAlert] = useState(false)
    const [showLoseAlert, setShowLoseAlert] = useState(false)


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()

    const userId = useSelector(loginSelectors.getUserId)
    const user = useSelector(loggedUserSelectors.getLoggedUserInfo)

    useEffect(() => {

        if(socket && userId) {
            socket.off('newState').on('newState', (message) => {
                console.log('newState', message.stateValue)
                if((message.stateValue === 'playing' || message.stateValue === 'win')) {
                    setContext(getBaseContext())
                    setTimeout(() => setContext(c => c.map(item => {
                        if(item.x ===  message.stateContext.currentX && item.y === message.stateContext.currentY) {
                            return {
                                ...item,
                                selected: true
                            }
                        }
                        return {
                            ...item,
                            selected: false
                        }
                    })), 3000)
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
            })

        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setContext(c => c.map(item => {
                if (item.x === firstX && item.y === firstY) {
                    return ({
                        ...item,
                        selected: true
                    })
                }
                return item;
            }))
        }, 3000)
    }, [firstX, firstY])

    return (
        <>
            <Badge bg="blue.theme" color='white' width="100%" p="1em" display="flex" justifyContent="space-between">
                <Text>Who Gets First</Text>
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
                templateColumns="repeat(25, 0.001fr)"
                gap={1}
                justifyItems="center" // Center content horizontally
                alignItems="center"  // Center content vertically
                borderRadius="10px"
                p={4}
                bg="white"
                justifyContent="center"
            >
                {context.map((item, i) => {
                    return (
                        <GridItem
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            key={i}
                            width="1em"
                            onClick={() => {
                                if(item.selected) {
                                    socket.emit('PLAY', {x: item.x, y: item.y})
                                }
                            }}
                            height="1em"
                            fontSize="3xl"
                            boxShadow= "0px 0px 10px rgba(0, 0, 0, 0.4)"
                            borderRadius="5px"
                            cursor={"pointer"}
                            bgColor={item.selected ? 'red' : null}
                        />)

                })}
            </Grid>
            <Chat isOpen={isOpen} onClose={onClose} btnRef={btnRef} username={user?.username} onOpen={onOpen} matchId={matchId}/>
            <Stack spacing={3} my={5} justifyContent='center' alignItems='center' direction='row' >
                <Button colorScheme="blue" variant="solid" width='10%' onClick={() => socket.emit('SURRENDER')}>Surrender</Button>
                <Button colorScheme="blue" variant="solid" width='10%' ref={btnRef} onClick={onOpen}>Chat</Button>
            </Stack>
        </>
    )
}
