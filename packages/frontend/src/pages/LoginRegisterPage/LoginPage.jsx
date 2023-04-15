import React, { useState, useEffect } from "react";
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
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "@/store/login/login.action";
import { loginSelectors } from "@/store/login/login.selector";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {

  useEffect( () => {
    console.log('start effect')

    dispatch(loginActions.getUsers())
  } )

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector(loginSelectors.getIsLoading);
  const isError = useSelector(loginSelectors.getIsError);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(loginActions.userLogin({ username, password, navigate }));
    }
  };

  return (
    <Center
      className={styles.background}
      width={"100%"}
      height={"95vh"}
      shadow="dark-lg"
    >
      <VStack
        shadow="lg"
        borderRadius={10}
        boxSize="md"
        bg="grey.theme"
        justifyContent="space-around"
        paddingTop={"20px"}
        alignItems="center"
        px={10}
      >
        <Heading as="h2" color="black.theme" size="lg">
          Welcome to pro.io!
        </Heading>
        <FormControl m={30} textAlign="center">
          <form onSubmit={onSubmit} noValidate={true}>
            <Input
              variant="flushed"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              mb={10}
              borderBottomColor="#D1D1E9"
              borderBottomWidth={2}
            />
            <Input
              variant="flushed"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              borderBottomColor="#D1D1E9"
              borderBottomWidth={2}
            />
            {!isError && (
              <Text color="red.theme" mt={4}>
                Username and password don't match!
              </Text>
            )}
            <Button
              type={"submit"}
              width="40"
              color="white"
              colorScheme="twitter"
              isLoading={isLoading}
              mt={8}
            >
              Login
            </Button>
          </form>
        </FormControl>
        <Text as="b" color="black.theme" size="md">
          Don't have an account?
          <Link
            color={"#444CF7"}
            as={ReachLink}
            to={"/signUp"}
            fontWeight={700}
          >
            {"  "}
            Sign up
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};
