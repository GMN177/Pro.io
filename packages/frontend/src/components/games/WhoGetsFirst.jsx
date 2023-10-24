import {AbsoluteCenter, Badge, Button, Grid, GridItem, Heading, Stack, Text, VStack} from "@chakra-ui/react";
import Chat from "@/components/Utils/Chat";
import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {loginSelectors} from "@/store/login/login.selector";
import {loggedUserSelectors} from "@/store/loggedUser/loggedUser.selector";
import {useParams} from "react-router-dom";
import {getWhoGetsFirstSocketInstance} from "@/api/socket";

const getBaseContext = () => {
    const empty = []
    for(let i = 0; i < 25; i++) {
        for(let j = 0; j<25; j++) {
            empty.push({x: i, y: j})
        }
    }
    return empty;
}
export const WhoGetsFirst = () => {

    const socket = useMemo(() => getWhoGetsFirstSocketInstance(), [])

    const {matchId} = useParams();


    const [context, setContext] = useState(getBaseContext())
    const [gameFinished, setGameFinished] = useState(false)
    const [showWinAlert, setShowWinAlert] = useState(false)
    const [showLoseAlert, setShowLoseAlert] = useState(false)

    const userId = useSelector(loginSelectors.getUserId)
    const user = useSelector(loggedUserSelectors.getLoggedUserInfo)
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
                templateColumns="repeat(25, 0.1fr)"
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
                <Button colorScheme="blue" variant="solid" width='10%' isDisabled={!isMyTurn}>Surrender</Button>
                <Button colorScheme="blue" variant="solid" width='10%' ref={btnRef} onClick={onOpen}>Chat</Button>
            </Stack>
        </>
    )
}
