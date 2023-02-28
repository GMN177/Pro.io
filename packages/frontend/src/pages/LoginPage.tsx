import {
  Box,
  Center,
  FormControl,
  Text,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Center height="90vh">
      <VStack
        borderRadius={15}
        bg="grey.theme"
        boxSize="96"
        justifyContent="space-around"
      >
        <Text as="h1" color="black.theme">
          Welcome to pro.io!
        </Text>

        <FormControl p={3} m={30}>
          <Input type="email" variant="flushed" placeholder="Email" mb={10} />

          <Input type="password" variant="flushed" placeholder="password" />
        </FormControl>
        <Button
          mt={4}
          type="submit"
          width="40"
          bg="red.theme"
          colorScheme="messenger"
        >
          Log in
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginPage;
