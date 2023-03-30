// function to get a random position within the screen size / 2
export const getRandomPosition = () => {
  const minX = 0;
  const minY = 0;
  const maxX = window.innerWidth / 2 - 40; // assuming box width of 40px
  const maxY = window.innerHeight / 2 - 40; // assuming box height of 40px
  const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  return { x: randomX, y: randomY };
};
