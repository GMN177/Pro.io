import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  VStack,
  Text,
  FormControl,
  Heading,
} from "@chakra-ui/react";
import background from "@/assets/backgroundImage.png";

export const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Center className="background" width={"100%"} height={"90vh"}>
      <VStack
        boxSize="96"
        bg="grey.theme"
        justifyContent="space-around"
        borderRadius={"11px"}
        paddingTop={"30px"}
        boxShadow="lg"
      >
        <Heading as="h3" color="black.theme" size="md">
          Welcome to pro.io!
        </Heading>
        <FormControl p={3} m={30}>
          <Input
            variant="flushed"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            mb={10}
          />
          <Input
            variant="flushed"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          onClick={props.onLogin}
          width="40"
          bg="red.theme"
          colorScheme="messenger"
        >
          Login
        </Button>
      </VStack>
    </Center>
  );
};
