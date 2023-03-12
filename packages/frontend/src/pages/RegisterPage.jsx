import React, { useState } from "react";
import {
    Button,
    Center,
    Input,
    VStack,
    FormControl,
    Heading, Text, Link,
} from "@chakra-ui/react";
import {registerActions} from "@/store/register/register.action";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/store/store.config";
import {useSelector} from "react-redux";
import {registerSelectors} from "@/store/register/register.selector";
import {loginSelectors} from "@/store/login/login.selector";

export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoadingRegister = useSelector(registerSelectors.getIsLoading)
    const isLoadingLogin = useSelector(loginSelectors.getIsLoading)

    const onSubmit = (e) => {
        e.preventDefault()
        if(username && email && password) {
            dispatch(registerActions.signUp({username,email, password, navigate}))
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
                        /><Input
                        variant="flushed"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                            isLoading={isLoadingRegister || isLoadingLogin}
                        >
                            Register
                        </Button>

                    </form>

                </FormControl>

                <Text as="b" color="black.theme" size="md" >
                    Already have an account? <Link color={'#444CF7'} as={ReachLink} to={"/login"} fontWeight={700}> Sign in</Link>
                </Text>
            </VStack>
        </Center>
    );
};
