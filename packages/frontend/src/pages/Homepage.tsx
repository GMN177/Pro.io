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
} from "@chakra-ui/react";
import {
  BsEmojiFrown,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiLaughing,
} from "react-icons/bs";
import "./Homepage.css";

const Homepage = () => {
  // function to get a random position within the screen size / 2
  const getRandomPosition = () => {
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth / 2 - 40; // assuming box width of 40px
    const maxY = window.innerHeight / 2 - 40; // assuming box height of 40px
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    return { x: randomX, y: randomY };
  };

  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(getRandomPosition());
  const [count, setCount] = useState(0);

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
            color="#2B2C34"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );
      case 3:
      case 4:
        return (
          <BsEmojiFrown
            color="#2B2C34"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );

      case 5:
      case 6:
        return (
          <BsEmojiExpressionless
            color="#2B2C34"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );

      default:
        return (
          <BsEmojiLaughing
            color="#2B2C34"
            transform="translate(50%, -50%)"
            size="2em"
          />
        );
    }
  };

  return (
    <Flex h="calc(90vh)">
      <VStack flex={1} justify="center" gap="50">
        <Heading justifySelf="flex-start" size={{ base: "md", xl: "lg" }}>
          Pro.io is a platform hosting multiple games, try them!
        </Heading>
        <Button color="white" bg="blue.theme">
          Gioca Online
        </Button>
        <Button color="white" bg="blue.theme">
          Gioca da solo
        </Button>
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
          bg="green.400"
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
