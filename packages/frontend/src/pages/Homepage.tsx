import { useState } from "react";
import { Flex, Box, Spacer, VStack, Button, Image } from "@chakra-ui/react";
import background from "@/assets/backgroundImage.png";

const Homepage = () => {
  const getRandomPosition = () => {
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth / 2 - 30; // assuming box width of 100px
    const maxY = window.innerHeight / 2 - 30; // assuming box height of 100px
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    return { x: randomX, y: randomY };
  };

  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(getRandomPosition());

  const handleBoxClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      setPosition(getRandomPosition());
    }, 200);
  };

  return (
    <Flex h="calc(90vh)">
      <VStack flex={1} justify="center" gap="50">
        <Button color="white" bg="blue.theme">
          Gioca Online
        </Button>
        <Button color="white" bg="blue.theme">
          Gioca da solo
        </Button>
      </VStack>

      <Box
        backgroundImage={background}
        backgroundSize="cover"
        flex={1}
        position="relative"
      >
        <Box
          bg="red.theme"
          position="absolute"
          top={position.y}
          left={position.x}
          width="2em"
          height="2em"
          onClick={handleBoxClick}
        >
          :)
        </Box>
      </Box>
    </Flex>
  );
};

export default Homepage;
