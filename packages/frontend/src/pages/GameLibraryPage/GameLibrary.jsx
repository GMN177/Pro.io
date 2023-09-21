import React, {useEffect, useState} from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  useMediaQuery,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { GameCard } from "@/components/GameCard";
import {useDispatch, useSelector} from "react-redux";
import {gamesActions} from "@/store/games/games.action";
import {gamesSelectors} from "@/store/games/games.selector";
import { Lobby } from "@/components/Lobby";

export const GameLibrary = () => {

    const dispatch = useDispatch();
    const games = useSelector(gamesSelectors.getGamesList)

    const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
      dispatch(gamesActions.fetchGamesList())
  }, [])
    console.log('games', games)
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
        {games && games.map((game) => (
          <GameCard
            key={game._id}
            id={game._id}
            title={game.title}
            image={game.image}
            description={game.description}
            openLobby={onOpen}
          />
        ))}
      </Grid>
          <Lobby isOpen={isOpen} onClose={onClose}></Lobby>
    </Box>
  );
};
