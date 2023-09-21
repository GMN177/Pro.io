import { useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  Button,
  Image,
  Center,
  Heading,
  Link,
} from "@chakra-ui/react";
import {
  BsEmojiFrown,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiLaughing,
} from "react-icons/bs";
import "./Homepage.css";
import { useSelector } from "react-redux";
import { loginSelectors } from "@/store/login/login.selector";
import { loggedUserSelectors } from "@/store/loggedUser/loggedUser.selector";
import { getRandomPosition } from "@/lib/helperFunctions";
import { Link as ReachLink, useNavigate } from "react-router-dom";

const Homepage = () => {
  const accessToken = useSelector(loginSelectors.getAccessToken);
  const user = useSelector(loggedUserSelectors.getLoggedUserInfo);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(getRandomPosition());
  const [count, setCount] = useState(0);

  console.log(accessToken)
  console.log(user)

  // function to handle the click of the little box, change his position after 200 ms
  const handleBoxClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCount(count + 1);
      setPosition(getRandomPosition());
      setIsVisible(true);
    }, 200);
  };

  // function to render the right box with a count
  const renderBox = () => {
    switch (count) {
      case 0:
      case 1:
      case 2:
        return (
          <BsEmojiDizzy
            color="white"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );
      case 3:
      case 4:
        return (
          <BsEmojiFrown
            color="white"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );

      case 5:
      case 6:
        return (
          <BsEmojiExpressionless
            color="white"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );

      default:
        return (
          <BsEmojiLaughing
            color="white"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );
    }
  };

  return (
    <Flex h="calc(90vh)">
      <VStack flex={1} justify="center" gap="50">
        <Heading
          justifySelf="flex-start"
          size={{ base: "md", xl: "lg" }}
          px={10}
          textAlign="center"
        >
          Pro.io is a platform hosting multiple games, try them!
        </Heading>
        {
        accessToken ? 
        <>
          <Link as={ReachLink} to={"/games"} style={{ textDecoration: "none" }}>
            <Button color="white" bg="blue.theme">
              Play Online
            </Button>
          </Link>
          <Button color="white" bg="blue.theme">
            Play By Yourself
          </Button>
        </>
        :  
        <Link as={ReachLink} to={"/login"} style={{ textDecoration: "none" }}>
          <Button color="white" bg="blue.theme">
            Play Now
          </Button>
        </Link>  
      }
        
      </VStack>

      <Box
        flex={1}
        position="relative"
        className="background"
        display={{ base: "none", md: "block" }}
      >
        {count > 6 && (
          <Heading textAlign="center" mb={3}>
            You are ready
          </Heading>
        )}
        <Center
          bg="blue.theme"
          position="absolute"
          top={position.y}
          left={position.x}
          width="2.5em"
          height="2.5em"
          onClick={handleBoxClick}
        >
          {renderBox()}
        </Center>
      </Box>
    </Flex>
  );
};

export default Homepage;
