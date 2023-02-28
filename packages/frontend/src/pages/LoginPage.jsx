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
import {useDispatch} from "react-redux";
import {loginActions} from "@/store/login/login.action";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    if(username && password) {
      dispatch(loginActions.userLogin({username, password}))
    }
  }

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
            <form onSubmit={onSubmit} noValidate={true}>
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
              <Button
                  type={'submit'}
                  width="40"
                  bg="red.theme"
                  colorScheme="messenger"
              >
                Login
              </Button>
            </form>

          </FormControl>
        </VStack>
      </Center>
  );
};
