import React, { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { GameCard } from "@/components/GameCard";

export const GameLibrary = () => {
  const games = [
    {
      id: 1,
      title: "first game",
      image: "/",
      description:
        "descripsasdjsadnjasdsajkcasjbcasjbcsajbd  sjcba,c as asd as dsa dsa ",
    },
    { id: 2, title: "second game", image: "/", description: "descr" },
    { id: 3, title: "third game", image: "/", description: "descr" },
    { id: 4, title: "fourth game", image: "/", description: "descr" },
    { id: 5, title: "fifth game", image: "/", description: "descr" },
    { id: 6, title: "sixth game", image: "/", description: "descr" },
    { id: 7, title: "seventh game", image: "/", description: "descr" },
    { id: 8, title: "8 game", image: "/", description: "descr" },
    { id: 9, title: "9 game", image: "/", description: "descr" },
    { id: 10, title: "10 game", image: "/", description: "descr" },
    { id: 11, title: "11 game", image: "/", description: "descr" },
  ];

  return (
    <Box>
      <HStack p={8} justifyContent="space-between">
        <Heading as="h2">Game Library </Heading>
        <Text>Add filter</Text>
      </HStack>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          "2xl": "repeat(4, 1fr)",
        }}
        gap={20}
        p={10}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            image={game.image}
            description={game.description}
          />
        ))}
      </Grid>
    </Box>
  );
};
