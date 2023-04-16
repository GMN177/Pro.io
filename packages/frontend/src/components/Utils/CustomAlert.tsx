import React from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'

export const CustomAlert = ({status, message}) => {
  return (
    <Alert status={status} variant='left-accent'>
    <AlertIcon />
    {message}
  </Alert>
  )
}
