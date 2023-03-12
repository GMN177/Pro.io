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
  Heading, Link,
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {loginActions} from "@/store/login/login.action";
import {loginSelectors} from "@/store/login/login.selector";
import {Link as ReachLink, useNavigate} from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector(loginSelectors.getIsLoading)
  const isError = useSelector(loginSelectors.getIsError)
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    if(username && password) {
      dispatch(loginActions.userLogin({username, password, navigate}))
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
              {
                isError && (
                    <Text fontSize={'sm'} color={'red.600'}>Username and password don't match!</Text>
                )
              }
              <Button
                  type={'submit'}
                  width="40"
                  bg="red.theme"
                  colorScheme="messenger"
                  isLoading={isLoading}
              >
                Login
              </Button>

              <Text as="b" color="black.theme" size="md">
                Don't have an account? <Link color={'#444CF7'} as={ReachLink} to={"/signUp"} fontWeight={700}> Sign up</Link>
              </Text>
            </form>
          </FormControl>


        </VStack>
      </Center>
  );
};
