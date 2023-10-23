import {
    Card,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    VStack,
    Spinner,
    Heading,
    Text
  } from "@chakra-ui/react";

export const LobbyPrivate = ({onClose, isOpen, description, privateKey}) => {
    console.log('description', description)
    console.log('key', privateKey)

    return (

        <Modal onClose={onClose} size="5xl" isOpen={isOpen} isCentered >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Creating the private match</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={8}>
                        <Stack >
                        <Heading as="h3" size="lg">{privateKey} </Heading>
                        <Text textAlign="center">Share with your friend this code!</Text>
                        </Stack>
                        <Stack>
                            <Spinner size='xl' thickness='4px'
                                        speed='1.35s'
                                        emptyColor='gray.200'
                                        color='blue.500'/>
                        </Stack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}