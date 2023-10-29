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

    const [messages, setMessages] = useState([])
    const chatSocket = useMemo(() => getChatSocketInstance(), [])

    const sendMessage = useCallback((data) => {
        setMessages((mess) => [data, ...mess])
    }, [])

    useEffect(() => {
        if(chatSocket) {
            chatSocket.on('NEW_MESSAGE', sendMessage)
            chatSocket.connect()
        }
        return () => {
            if(chatSocket) {
                chatSocket.off('NEW_MESSAGE')
                chatSocket.emit('disconnected')
            }
        }
     }, [])

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
                        {messages.map((message, index) => (
                            <Box key={message + index} alignSelf={message.sender ===  username ? 'flex-end' : 'flex-start'} mb={2} borderRadius='lg' bg={message.sender ===  username ? 'blue.500' : 'gray.300'}  p={2} color='white'>
                                {message.message}
                            </Box>
                        ))}
                    </Flex>
                </DrawerBody>

                <DrawerFooter>
                    <form id='chat-form' onSubmit={(e) => {
                        e.preventDefault()
                        // @ts-ignore
                        chatSocket.emit('MESSAGE', inputRef.current.value)
                        // @ts-ignore
                        inputRef!.current!.value = ''
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

