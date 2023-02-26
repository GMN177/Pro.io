import {Flex, Image, Spacer, Text, Link, Box, Icon} from "@chakra-ui/react";
import proLogo from "/logo.svg";
import React from 'react';
import {Button} from "@chakra-ui/button";
import {Link as ReachLink} from 'react-router-dom'

const Navbar = (props) => {
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

          {
            props.isLogged ? (
                    <>
                      <Button onClick={props.logOut}>LOG OUT</Button>
                      <Link href="#" w="120px" fontWeight={700}>
                        LeaderBoard
                      </Link>
                    </>
                )
                : (
                    <Link as={ReachLink} to={'/login'} fontWeight={700}>
                      Log in
                    </Link>
                )
          }

        </Flex>
      </Flex>
  );
};

export default Navbar;
