import React, {useState} from 'react';
import {Box, Button, Flex, Input} from '@chakra-ui/react';
import background from '@/assets/backgroundImage.png'

export const LoginPage = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <Box backgroundImage={background} backgroundSize={'cover'} width={'100%'} height={'90vh'}>
            <Flex justify={'center'} alignItems={'center'} height={'100%'}>
                <Box width={'552px'} height={'525px'} background={'#ffffff'} borderRadius={'11px'} paddingTop={'60px'}>
                    <Box width={'fit-content'} margin={'0 auto'}>
                        <p>Play with 5 other players in the world</p>
                        IMMAGINE
                        <Input variant='flushed'
                               placeholder='Username'
                               value={username}
                               onChange={(event) => setUsername(event.target.value)}
                        />
                        <Input variant='flushed'
                               type='password'
                               placeholder='Password'
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button onClick={props.onLogin}
                                colorScheme='red'>
                            Login</Button>
                    </Box>
                </Box>

            </Flex>
        </Box>
    )
}
