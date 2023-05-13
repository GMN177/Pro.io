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

import socket from "@/socket";
import {loginSelectors} from '@/store/login/login.selector'
import {useSelector} from 'react-redux'

let socketInstance = null;

export const GameCard = ({ id, title, image, description }) => {

  const token = useSelector(loginSelectors.getToken)

  const joinPublicGame = () => {
    console.log("join public game")
    const matchId = 1;
    try{
      // do rest call to retrieve match Id
      
      // create a socket instance
      socketInstance = socket({token, matchId});
      const resp = socketInstance.connect();
      socket.emit("joinPublicGame", {id})

    }catch(error){
      console.log("error", error)
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
          <Button variant="solid" colorScheme="green">
            Join a Private Game
          </Button>
        </VStack>
      </CardFooter>
    </Card>
  );
};
