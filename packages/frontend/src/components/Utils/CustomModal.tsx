import React from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { Tooltip } from '@chakra-ui/tooltip'
import { useDisclosure } from '@chakra-ui/hooks'

export const CustomModal = (props) => {
  // declare state for the modals
  const { isOpen, onOpen, onClose } = useDisclosure()
  //dispatch action to select the category to the parent and open modal
  const openModal = () => {
    onOpen()
  }

  return (
    <>
      <Tooltip
        colorScheme="twitter"
        aria-label="add tooltip"
        hasArrow
        label={props.labeltool}
      >
        {props.isIcon ?  
        <IconButton
          variant={props.variantButton ? props.variantButton : "outline"}
          colorScheme={props.colorScheme ? props.colorScheme : "twitter"}
          aria-label="close Modal"
          onClick={openModal}
          icon={props.icon}
            /> : 
        <Button 
            variant={props.variantButton ? props.variantButton : "outline"}
            colorScheme={props.colorScheme ? props.colorScheme : "twitter"}
            aria-label="close Modal"
            onClick={openModal}
         >
            {props.label}
            </Button>}
       
      </Tooltip>
      <Modal {...props} isOpen={isOpen} onClose={onClose} colorScheme="twitter">
        <ModalContent p="5">
          <ModalHeader>{props.header}</ModalHeader>
          <ModalCloseButton />
          {props.children}
        </ModalContent>
      </Modal>
    </>
  )
}
