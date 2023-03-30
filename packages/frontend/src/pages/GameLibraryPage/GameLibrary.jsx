import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import { GameCard } from "@/components/GameCard";

export const GameLibrary = () => {
  const games = [
    { id: 1, title: "first game", image: "/", description: "descr" },
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

  const [isLgScreen] = useMediaQuery("(min-width: 992px)");

  const [visibleIndex, setVisibleIndex] = useState(0);

  const visibleGames = isLgScreen
    ? games.slice(visibleIndex, visibleIndex + 6)
    : games.slice(visibleIndex, visibleIndex + 4);
  const hiddenGames = isLgScreen ? games.slice(6) : games.slice(4);

  const handlePrevClick = () => {
    setVisibleIndex((prevIndex) => prevIndex - (isLgScreen ? 6 : 4));
  };

  const handleNextClick = () => {
    setVisibleIndex((prevIndex) => prevIndex + (isLgScreen ? 6 : 4));
  };

  return (
    <Box>
      <Grid templateColumns={isLgScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}>
        {visibleGames.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            image={game.image}
            description={game.description}
          />
        ))}
      </Grid>
      {hiddenGames.length > 0 && (
        <Box display="flex" justifyContent="center" mt="4">
          {/* render carousel arrows here */}
        </Box>
      )}
    </Box>
  );
};
