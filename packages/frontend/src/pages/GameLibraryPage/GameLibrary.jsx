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
import {FaFilter} from "react-icons/fa";
import { loginSelectors } from "@/store/login/login.selector";
import { Lobby } from "@/components/Lobby";
import {LobbyPrivate} from "@/components/LobbyPrivate";
import WhoGetsFirst from "../../assets/WhoGetsFirst.png"
import TicTacToe from "../../assets/TicTacToe.png"

export const GameLibrary = () => {

    const dispatch = useDispatch();
    const games = useSelector(gamesSelectors.getGamesList)
    const [gameChosen, setGameChosen] = useState(null)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const privateModal = useDisclosure()
    const [privateKey, setPrivateKey] = useState("");
    console.log(games)

  useEffect(() => {
      dispatch(gamesActions.fetchGamesList())

  }, [])

  const openLobby = (description) => {
      setGameChosen(description)
      onOpen()
  }

  const openPrivate = (description, privateKey) => {
      const {isOpen, onOpen, onClose} = privateModal
      setGameChosen(description)
      setPrivateKey(privateKey)
      onOpen()
  }

  const filterGames = (mode) => {
    switch (mode) {
      case 'nameAsc':
        dispatch(gamesActions.filterGamesByNameAsc(games))
      case 'activePlayers':
        dispatch(gamesActions.filterGamesByActivePlayers(games))
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
            <Button bg="none">
              <FaFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filter Games</PopoverHeader>
              <PopoverBody>
                <VStack>
                  <Button variant="solid" colorScheme="blue" w="100%" onClick={() => filterGames('activePlayers')}> Filter by number of players playing </Button>
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
            name={game.name}
            image={game.name === 'TicTacToe' ? TicTacToe: WhoGetsFirst}
            description={game.description}
            openLobby={openLobby}
            playersOnline={game.activePlayers}
            openPrivateLobby={openPrivate}
          />
        ))}
      </Grid>
          <Lobby isOpen={isOpen} onClose={onClose} description={gameChosen}></Lobby>
          <LobbyPrivate isOpen={privateModal.isOpen} onClose={privateModal.onClose} description={gameChosen} privateKey={privateKey}></LobbyPrivate>
    </Box>
  );
};
