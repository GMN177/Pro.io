import { Flex, Image, Spacer, Text, Link, Box } from "@chakra-ui/react";
import proLogo from "/logo.svg";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      bg="#F2F2F2"
      justify="space-between"
      padding="1.5rem"
      align="center"
      color="blue.theme"
      boxShadow="lg"
    >
      <Image alt="Logo" src={proLogo} />
      <Text ml={5} color="blue.theme" fontWeight={700}>
        Pro.io
      </Text>
      <Spacer />
      <Flex mr={2}>
        <Link href="#" w="120px" fontWeight={700}>
          LeaderBoard
        </Link>
        <Link href="#" fontWeight={700}>
          Login
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
