import { Flex, Box, Spacer, VStack, Button, Image } from "@chakra-ui/react";
import background from "../../public/backgroundImage.png";

const Homepage = () => {
  return (
    <Flex h="calc(100vh)">
      <VStack flex={1} justify="center" gap={15}>
        <Button>ciao</Button>
        <Button>ciao</Button>
      </VStack>

      <Box
        backgroundImage={background}
        boxSize="100%"
        bgRepeat="no-repeat"
        backgroundSize="cover"
        flex={1}
        position="relative"
      >
        {" "}
        <Box
          bg="white"
          opacity={0}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="3%"
          height="3%"
          animation="pulse 2s ease-in-out infinite"
          zIndex={2}
        />
      </Box>
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </Flex>
  );
};

export default Homepage;
