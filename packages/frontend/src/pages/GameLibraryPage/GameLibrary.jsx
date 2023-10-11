import React, {useEffect, useState} from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  useMediaQuery,
  PopoverTrigger,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  Button,
  VStack,
  Text
} from "@chakra-ui/react";
import { GameCard } from "@/components/GameCard";
import {useDispatch, useSelector} from "react-redux";
import {gamesActions} from "@/store/games/games.action";
import {gamesSelectors} from "@/store/games/games.selector";
import { loggedUserActions } from "@/store/loggedUser/loggedUser.action";
import FilterIcon from "@/assets/Icons/FilterIcon";
import { loginSelectors } from "@/store/login/login.selector";
import { Lobby } from "@/components/Lobby";

export const GameLibrary = () => {

    const dispatch = useDispatch();
    const games = useSelector(gamesSelectors.getGamesList)
    const [gameChosen, setGameChosen] = useState(null)
    const idUser = useSelector(loginSelectors.getUserId);
    const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
      dispatch(gamesActions.fetchGamesList())
      dispatch(loggedUserActions.findLoggedUser(idUser))

  }, [])

  const openLobby = (description) => {
      setGameChosen(description)
      onOpen()
  }

  const filterGames = (mode) => {
    switch (mode) {
      case 'nameAsc':
        dispatch(gamesActions.filterGamesByNameAsc(games))
        break;

      default:
        break;

    }
  }

  return (
    <Box>
      <HStack p={8} justifyContent="space-between">
        <Heading as="h2">Game Library </Heading>
        <Popover>
          <PopoverTrigger>
            <Button>
              <FilterIcon boxSize={6} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filter Games</PopoverHeader>
              <PopoverBody>
                <VStack>
                  <Button variant="solid" colorScheme="blue" w="100%"> Filter by number of players playing </Button>
                  <Button variant="solid" colorScheme="blue" w="100%" onClick={() => filterGames('nameAsc')}> Filter by Name Asc </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>   
        </Popover>

      </HStack>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          "2xl": "repeat(4, 1fr)",
        }}
        alignItems="center"
        gap={20}
        p={10}
      >
        {games && games.map((game) => (
          <GameCard
            key={game._id}
            id={game._id}
            title={game.title}
            name={game.name}
            image={game.image}
            description={game.description}
            openLobby={openLobby}
            playersOnline={game.activePlayers}
          />
        ))}
      </Grid>
          <Lobby isOpen={isOpen} onClose={onClose} description={gameChosen}></Lobby>
    </Box>
  );
};
