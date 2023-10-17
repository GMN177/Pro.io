import React, {useState, useMemo, useRef, useEffect} from "react"
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

const Chat = ({isOpen, onClose, onOpen, btnRef, username, matchId}) => {

    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState([])

    //const socket = useMemo(() => getChatSocketInstance(), [])


    useEffect(() => {
        if(isUndefined(username)){
            return;
        }
        const socket = chatSocket({username, matchId})
        setSocket(socket)

        socket.off('NEW_MESSAGE').on('NEW_MESSAGE', (data) => {
            console.log('newMessage: ',data)
            setMessages((mess) => [...mess, data])
        })

        socket.connect()

    }, [username])

    console.log('mess', messages)
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

