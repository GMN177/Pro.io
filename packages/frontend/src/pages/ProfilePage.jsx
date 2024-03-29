import { Divider, HStack, Heading,  VStack, Button, Box, Input, Text } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
// import users from reducer store
import { useDispatch, useSelector } from 'react-redux'
import { CustomModal } from '../components/Utils/CustomModal'
import {CustomAlert} from '../components/Utils/CustomAlert'
import { loggedUserSelectors } from '@/store/loggedUser/loggedUser.selector'
import { loggedUserActions } from '@/store/loggedUser/loggedUser.action'
import { loginActions } from '@/store/login/login.action'
import { Link as ReachLink, useNavigate } from "react-router-dom";

export const ProfilePage = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector(loggedUserSelectors.getIsLoading)
    const isError = useSelector(loggedUserSelectors.getIsError)
    const isSuccess = useSelector(loggedUserSelectors.getIsSuccess)
    const loggedUser = useSelector(loggedUserSelectors.getLoggedUserInfo)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser?.id) {
            dispatch(loggedUserActions.findLoggedUser(loggedUser.id))
        }
    }, [loggedUser?.id])
    useEffect(() => {
        setTimeout(() => {
            dispatch(loggedUserActions.resetUserAttributes())
        }, 3000)

    }, [isError, isSuccess])

    // submit function to change username
    const changeUsername = () => {
        const id = loggedUser.id

        // dispatch action to change username
        dispatch(loggedUserActions.changeUsernameUser({username, password, id}))
        setPassword("");
        setUsername("")
    }

     // submit function to change password
     const changePassword = () => {
        const id = loggedUser.id

        // dispatch action to change username
        dispatch(loggedUserActions.changeUsernamePassword({password, newPassword, id}))
        setPassword("");
        setNewPassword("")
    }

    const deleteUser = () => {
        const id = loggedUser.id

        dispatch(loggedUserActions.deleteUser({id}))
        dispatch(loginActions.logout('', navigate))
    }

    if(!loggedUser) { return null;}

    return (
        <VStack p={4} justifyContent="flex-start" alignItems="flex-start">
            <Heading as="h3" >Profile</Heading>
            <Divider />
            <Box p={4}>
                <Heading as="h4" size='md' >Personal Informations</Heading>
                <HStack p={4}>
                    <Heading as="h5" size='sm' >Username: {loggedUser.username}</Heading>
                    <CustomModal
                        isCentered
                        header="Change Username"
                        labeltool = "change username"
                        blockScrollOnMount={false}
                        size="sm"
                        label="Change Username"
                        isIcon={false}
                    >
                        <VStack>
                            {isError && <CustomAlert status="error" message="Something went wrong during the username change"/>}
                            {isSuccess && <CustomAlert status="success" message="Username succesfully changed"/> }

                            <Input
                                variant="flushed"
                                placeholder="Password"
                                type="password"
                                name="password"
                                mb="4"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Input
                                variant="flushed"
                                placeholder="New Username"
                                type="text"
                                name="username"
                                mb="4"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <Button colorScheme="twitter" onClick={changeUsername} disabled={username === "" || password === ""} isLoading={isLoading}>Change Username</Button>
                        </VStack>

                    </CustomModal>
                </HStack>

                <HStack p={4}>
                    <Heading as="h5" size='sm' >Email: {loggedUser.email}</Heading>
                </HStack>
                <HStack p={4}>
                <Heading as="h5" size='sm' >Password: </Heading>
                    <CustomModal
                        isCentered
                        header="Change Password"
                        labeltool = "change password"
                        blockScrollOnMount={false}
                        size="sm"
                        label="Change Password"
                        isIcon={false}
                    >
                        <VStack>
                            {isError && <CustomAlert status="error" message="Something went wrong during the password change"/>}
                            {isSuccess && <CustomAlert status="success" message="Password succesfully changed"/> }
                            <Input
                                variant="flushed"
                                placeholder="Old Password"
                                type="password"
                                name="oldPassword"
                                mb="4"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Input
                                variant="flushed"
                                placeholder="New Password"
                                type="password"
                                name="newPassword"
                                mb="4"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                            <Button colorScheme="twitter" onClick={changePassword}>Change Password</Button>
                        </VStack>

                    </CustomModal>
                </HStack>
            </Box>
            <Divider />
            <Box p={4}>
                <Heading as="h4" size='md' >Game Informations</Heading>
                <HStack p={4}>
                    <Heading as="h5" size='sm' >Total games: {loggedUser.totMatches}</Heading>
                </HStack>
                <HStack p={4}>
                    <Heading as="h5" size='sm' >Total wins: {loggedUser.totWins}</Heading>
                </HStack>
            </Box>
            <Divider />
            <Box p={4}>
                <CustomModal
                        isCentered
                        header="Delete Account"
                        labeltool = "Delete Account"
                        blockScrollOnMount={false}
                        size="sm"
                        label="Delete Acccount"
                        isIcon={false}
                        variantButton="solid"
                        colorScheme="red"
                    >
                        <VStack>
                            <Text mb="4">Are you sure you want to delete your account?</Text>
                            <Button colorScheme="red" onClick={deleteUser}>Confirm Delete</Button>
                        </VStack>

                </CustomModal>
            </Box>
        </VStack>
    )
}
