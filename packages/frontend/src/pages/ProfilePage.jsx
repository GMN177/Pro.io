import { Divider, HStack, Heading,  VStack, Button, Box, Input, Text } from '@chakra-ui/react'
import React, {useState} from 'react'
// import users from reducer store
import { useDispatch, useSelector } from 'react-redux'
import { loginSelectors } from '@/store/login/login.selector'
import { CustomModal } from '../components/Utils/CustomModal'
import { loginActions } from '@/store/login/login.action'

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(loginSelectors.getUser)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    // submit function to change username
    const changeUsername = () => {
        const id = user.id

        // dispatch action to change username
        dispatch(loginActions.changeUsernameUser({username, password, id}))
        setPassword("");
        setUsername("")
    }

     // submit function to change password
     const changePassword = () => {
        const id = user.id

        // dispatch action to change username
        dispatch(loginActions.changeUsernamePassword({password, newPassword, id}))
        setPassword("");
    }


    return (
        <VStack p={4} justifyContent="flex-start" alignItems="flex-start">
            <Heading as="h3" >Profile</Heading>
            <Divider />
            <Box p={4}>
                <Heading as="h4" size='md' >Personal Informations</Heading>
                <HStack p={4}>
                    <Heading as="h5" size='sm' >Username: {user.username}</Heading>
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
                            <Button colorScheme="twitter" onClick={changeUsername} disabled={username === "" || password === ""}>Change Username</Button>
                        </VStack>

                    </CustomModal>
                </HStack>

                <HStack p={4}>
                    <Heading as="h5" size='sm' >Email: {user.email}</Heading>
                </HStack>
                <HStack p={4}>
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
                    <Heading as="h5" size='sm' >Total games: {user.totMatches}</Heading>
                </HStack>
                <HStack p={4}>
                    <Heading as="h5" size='sm' >Total wins: {user.totWins}</Heading>
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
                            <Button colorScheme="red" >Confirm Delete</Button>
                        </VStack>

                </CustomModal>
            </Box>
        </VStack>
    )
}
