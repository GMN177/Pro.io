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
    Heading
  } from "@chakra-ui/react";

export const Lobby = ({onClose, isOpen}) => {

    return (

        <Modal onClose={onClose} size="5xl" isOpen={isOpen} isCentered >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Waiting Lobby</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={8}>
                        <Stack >
                        <Heading as="h3" size="lg">Waiting for players to join.. </Heading>
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