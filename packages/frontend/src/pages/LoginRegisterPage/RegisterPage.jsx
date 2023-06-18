import React, { useState } from "react";
import {
  Button,
  Center,
  Input,
  VStack,
  FormControl,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { registerActions } from "@/store/register/register.action";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store.config";
import { useSelector } from "react-redux";
import { registerSelectors } from "@/store/register/register.selector";
import { loginSelectors } from "@/store/login/login.selector";
import styles from "./LoginPage.module.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoadingRegister = useSelector(registerSelectors.getIsLoading);
  const isLoadingLogin = useSelector(loginSelectors.getIsLoading);
  const isErrorRegister = useSelector(registerSelectors.getIsError);
  const messageError = useSelector(registerSelectors.getErrorMessage);

  const onSubmit = (e) => {
    e.preventDefault();
    if (username && email && password) {
      dispatch(registerActions.signUp({ username, email, password, navigate }));
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
        borderRadius={10}
        boxSize="md"
        bg="grey.theme"
        justifyContent="space-around"
        pt={"20px"}
        shadow="lg"
        px={10}
      >
        <Heading as="h2" color="black.theme" size="lg">
          Welcome to pro.io!
        </Heading>
        <FormControl textAlign="center">
          <form onSubmit={onSubmit} noValidate={true}>
            <Input
              variant="flushed"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              mb={10}
              borderBottomColor="#D1D1E9"
              borderBottomWidth={2}
              id="username"
              autoComplete="username"
            />
            <Input
              variant="flushed"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              mb={10}
              borderBottomColor="#D1D1E9"
              borderBottomWidth={2}
              id="email"
              autoComplete="email"
            />
            <Input
              variant="flushed"
              type="password"
              placeholder="Password"
              value={password}
              borderBottomColor="#D1D1E9"
              borderBottomWidth={2}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              autoComplete="current-password"
            />
            {isErrorRegister && (
              <Text color="red.theme" mt={2}>
                {messageError}
              </Text>
            )}
            <Button
              type={"submit"}
              width="40"
              color="white"
              colorScheme="twitter"
              isLoading={isLoadingRegister || isLoadingLogin}
              mt={6}
              isDisabled={!username || !email || !password}
            >
              Register
            </Button>
          </form>
        </FormControl>

        <Text as="b" color="black.theme" size="md" pb={2} mb={10}>
          Already have an account?{" "}
          <Link color={"#444CF7"} as={ReachLink} to={"/login"} fontWeight={700}>
            {" "}
            Sign in
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};
