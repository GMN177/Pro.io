import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    Flex,
    Box
} from '@chakra-ui/react'
import { chatSocket, getChatSocketInstance } from "@/api/socket"
import {isUndefined} from "lodash"
import {io} from 'socket.io-client';

const Chat = ({isOpen, onClose, onOpen, btnRef, username, matchId}) => {

    const [socket, setSocket] = useState<ReturnType<typeof io>>()
    const [messages, setMessages] = useState([])

    const sendMessage = useCallback((data) => {
        console.log('newMessage: ', data)
        setMessages((mess) => [...mess, data])
    }, [])
    useEffect(() => {
        if(username && matchId && !socket) {
            const socketInstance = chatSocket({username, matchId})

            socketInstance.on('NEW_MESSAGE', sendMessage)
            socketInstance.connect()
            setSocket(socketInstance)
        }
        return () => {
            if(socket) {
                socket.off('NEW_MESSAGE')
            }
        }
    }, [username, matchId, socket])

    const inputRef = useRef()
    return (

        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            initialFocusRef={inputRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Write a message</DrawerHeader>

                <DrawerBody >
                    <Flex flexDirection='column-reverse' h='100%'>
                        {messages.reverse().map((message, index) => (
                            <Box key={message + index} alignSelf={message.sender ===  username ? 'flex-end' : 'flex-start'} mb={2} borderRadius='lg' bg={message.sender ===  username ? 'blue.500' : 'gray.300'}  p={2} color='white'>
                                {message.message}
                            </Box>
                        ))}
                    </Flex>
                </DrawerBody>

                <DrawerFooter>
                    <form id='chat-form' onSubmit={(e) => {
                        e.preventDefault()
                        console.log('socket', socket)
                        socket.emit('MESSAGE', inputRef.current.value)
                        inputRef.current.value = ''
                    }}
                    >
                        <Input placeholder='Type here...' mr={5} ref={inputRef}/>
                    </form>

                    <Button colorScheme='blue' type='submit' form='chat-form'>Send</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default Chat

