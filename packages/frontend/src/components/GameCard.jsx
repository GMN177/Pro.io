import React, {useState} from "react";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Divider,
  ButtonGroup,
  Button,
  Text,
  Heading,
  CardFooter,
  VStack,
  Popover,
  PopoverTrigger,
  useDisclosure,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  Input
} from "@chakra-ui/react";

import {chatSocket, ticTacToeSocket, whoGetsFirstSocket} from "@/api/socket";
import {loginSelectors} from '@/store/login/login.selector'
import {useSelector, useDispatch} from 'react-redux'
import {matchServices} from "@/api/match.service";
import { loggedUserActions } from "@/store/loggedUser/loggedUser.action";
import {useNavigate} from "react-router-dom";
import {CustomAlert} from '../components/Utils/CustomAlert'
import {loggedUserSelectors} from "@/store/loggedUser/loggedUser.selector";
import {loginActions} from "@/store/login/login.action";
import {usersService} from "@/api/users.service";

export const GameCard = ({ id, name, image, description, openLobby, playersOnline, openPrivateLobby }) => {

  const token = useSelector(loginSelectors.getAccessToken)
  const userId = useSelector(loginSelectors.getUserId)
  const username = useSelector(loggedUserSelectors.getLoggedUserInfo).username
  const refreshToken = useSelector(loginSelectors.getRefreshToken)
  const [keyPrivate, setKeyPrivate] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const joinPublicGame = async () => {
    try {

      const matchId = (await matchServices.matchmaking({user: userId, game: id})).data.data.message

      const chatSocketInstance = chatSocket({username, matchId})

      if(name === 'TicTacToe') {
        const socketInstance = ticTacToeSocket({token, matchId });

        /* Handlers socket */
        socketInstance.off('newState').on('newState', (message) => {
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchId))
            navigate('/' + name + '/' + matchId, {
              state:
                  {
                    firstPlayer: userId === message.stateContext.players[message.stateContext.currentPlayer]
                  }}
            )
          }
        })

        socketInstance.on("connect_error", (err) => {
          dispatch(loginActions.userTokenRefresh({ refreshToken }));

          console.log('err',err instanceof Error); // true
          console.log(err.message); // not authorized
          console.log(err.data); // { content: "Please retry later" }
        });

        socketInstance.connect();

        // wait 1 second
        setTimeout(() => {
          openLobby(description)
        }, 1000)

        socketInstance.emit('READY')

      } else if (name === 'WhoGetsFirst') {
        const socketInstance = whoGetsFirstSocket({token, matchId });

        /* Handlers socket */
        socketInstance.off('newState').on('newState', (message) => {
          console.log('newState', message)
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchId))
            navigate('/' + name + '/' + matchId, {
              state: {
                firstX: message.stateContext.currentX,
                firstY: message.stateContext.currentY,
                enemyId: message.stateContext.players.find(p => p !== userId)
              }
            })
          }
        })

        socketInstance.on("connect_error", (err) => {
          dispatch(loginActions.userTokenRefresh({ refreshToken }));

          console.log('err',err instanceof Error); // true
          console.log(err.message); // not authorized
          console.log(err.data); // { content: "Please retry later" }
        });

        socketInstance.connect();

        // wait 1 second
        setTimeout(() => {
          openLobby(description)
        }, 1000)

        socketInstance.emit('READY')
      }

    } catch (e) {

    }
  }

  const createPrivateGame = async () => {
    try{
      const matchKey = (await matchServices.createPrivateMatch({user: userId, game: id})).data.data.message

      console.log('matchKey',matchKey);

      const chatSocketInstance = chatSocket({username, matchId: matchKey})
      if(name === 'TicTacToe') {
        const socketInstance = ticTacToeSocket({token, matchId : matchKey });
        console.log('socketInstance', socketInstance)
        /* Handlers socket */
        socketInstance.on('newState', (message) => {
          console.log('ci sono', message)
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchKey))
            navigate('/' + name + '/' + matchKey, {
              state:
                  {
                    firstPlayer: userId === message.stateContext.players[message.stateContext.currentPlayer]
                  }}
            )
          }
        })
        socketInstance.connect();
        socketInstance.emit('READY')
        // wait 1 second
        setTimeout(() => {
          openPrivateLobby(description, matchKey)
        }, 1000)
      } else if (name === 'WhoGetsFirst') {
        console.log('matchKey', matchKey)
        const socketInstance = whoGetsFirstSocket({token, matchId: matchKey });

        /* Handlers socket */
        socketInstance.off('newState').on('newState', (message) => {
          console.log('newState', message)
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchKey))
            navigate('/' + name + '/' + matchKey, {
              state: {
                firstX: message.stateContext.currentX,
                firstY: message.stateContext.currentY,
                enemyId: message.stateContext.players.find(p => p !== userId)
              }
            })
          }
        })

        socketInstance.on("connect_error", (err) => {
          dispatch(loginActions.userTokenRefresh({ refreshToken }));

          console.log('err',err instanceof Error); // true
          console.log(err.message); // not authorized
          console.log(err.data); // { content: "Please retry later" }
        });

        socketInstance.connect();
        socketInstance.emit('READY')

        // wait 1 second
        setTimeout(() => {
          openPrivateLobby(description, matchKey)
        }, 1000)

      }

    }catch(e) {
      console.log('exception', e)
    }
  }

  const joinPrivateGame = async (key) => {
    try{
      const matchId = (await matchServices.joinPrivateMatch({user: userId, matchId: key})).data.data.message
      console.log('matchId', matchId)
      if(matchId === "" || matchId === 'Match not found' || matchId === 'Invalid match') {
        setErrorMessage(matchId);
        return
      }
      const chatSocketInstance = chatSocket({username, matchId})

      if(name === 'TicTacToe') {

        const socketInstance = ticTacToeSocket({token, matchId });

        console.log('socketInstance', socketInstance)
        /* Handlers socket */
        socketInstance.on('newState', (message) => {
          console.log('ci sono', message)
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchId))
            navigate('/' + name + '/' + matchId, {
              state:
                  {
                    firstPlayer: userId === message.stateContext.players[message.stateContext.currentPlayer]
                  }}
            )
          }
        })
        socketInstance.connect();
        socketInstance.emit('READY')
      } else if (name === 'WhoGetsFirst') {
        const socketInstance = whoGetsFirstSocket({token, matchId });

        /* Handlers socket */
        socketInstance.off('newState').on('newState', (message) => {
          console.log('newState', message)
          if(message.stateValue === 'playing') {
            dispatch(loggedUserActions.addUserToMatch(matchId))
            navigate('/' + name + '/' + matchId, {
              state: {
                firstX: message.stateContext.currentX,
                firstY: message.stateContext.currentY,
                enemyId: message.stateContext.players.find(p => p !== userId)
              }
            })
          }
        })

        socketInstance.on("connect_error", (err) => {
          dispatch(loginActions.userTokenRefresh({ refreshToken }));

          console.log('err',err instanceof Error); // true
          console.log(err.message); // not authorized
          console.log(err.data); // { content: "Please retry later" }
        });

        socketInstance.connect();

        socketInstance.emit('READY')
      }
    }
    catch(e) {
      console.log('exception', e)
      setErrorMessage(e.message);
    }
  }


  return (
      <Card maxW="sm">
        <CardBody>
          <Image
              src={image}
              alt="Image test"
              borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Text color="blue.600" fontSize="xl">
              {playersOnline} Players online now
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter display="flex" flexDir="column-reverse">
          <VStack spacing="4">
            <Button variant="solid" colorScheme="blue" onClick={joinPublicGame}>
              Join a Public game
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={createPrivateGame}>
              Create a Private Game
            </Button>
            <Popover
                placement="right"
            >
              <PopoverTrigger>
                <Button variant="solid" colorScheme="green">
                  Join a Private Game
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Insert Key</PopoverHeader>
                <PopoverBody>
                  <VStack>
                    {errorMessage && <CustomAlert status="error" message={errorMessage}/>}
                    <Input variant="solid" colorScheme="blue" w="100%" value={keyPrivate} onChange={(event) => setKeyPrivate(event.target.value)} placeholder="Insert Key" />
                    <Button isDisabled={!keyPrivate} variant="solid" colorScheme="green" w="100%" onClick={() => joinPrivateGame(keyPrivate)}> Join </Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </VStack>
        </CardFooter>
      </Card>
  );
};
