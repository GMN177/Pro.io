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
} from "@chakra-ui/react";

import {socket} from "@/api/socket";
import {loginSelectors} from '@/store/login/login.selector'
import {useSelector, useDispatch} from 'react-redux'
import {matchServices} from "@/api/match.service";
import {loggedUserSelectors} from "@/store/loggedUser/loggedUser.selector";
import { loggedUserActions } from "@/store/loggedUser/loggedUser.action";
export const GameCard = ({ id, title, image, description, openLobby }) => {

  const token = useSelector(loginSelectors.getAccessToken)
  const userId = useSelector(loginSelectors.getUserId)

  const dispatch = useDispatch()

  const joinPublicGame = async () => {
    try {

      const matchId = (await matchServices.matchmaking({user: userId, game: id})).data.data.message

      const querySocket = {token, matchId}

      console.log('querySocket', querySocket)

      const socketInstance = socket({token, matchId });

      /* Handlers socket */
      socketInstance.on('newState', (message) => {
        console.log('ci sono', message)
        if(message.stateValue === 'playing') {
          // TODO --> we need to redirect to the game page
          dispatch(loggedUserActions.addUserToMatch(matchId))
        }
      })

      socketInstance.on("connect_error", (err) => {
        console.log('err',err instanceof Error); // true
        console.log(err.message); // not authorized
        console.log(err.data); // { content: "Please retry later" }
      });

      socketInstance.connect();

      // wait 1 second
      setTimeout(() => {
        openLobby()
      }, 1000)

      socketInstance.emit('READY')

    } catch (e) {

    }
  }


  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Image test"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="xl">
            x Players online now
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" flexDir="column-reverse">
        <VStack spacing="4">
          <Button variant="solid" colorScheme="blue" onClick={joinPublicGame}>
            Join a Public game
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Create a Private Game
          </Button>
          <Button variant="solid" colorScheme="green" onClick={joinPublicGame}>
            Join a Private Game
          </Button>
        </VStack>
      </CardFooter>
    </Card>
  );
};
