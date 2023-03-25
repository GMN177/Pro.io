const express = require("express");
const jsend = require("jsend");
const gameController = require("../controllers/matchController");
const router = express.Router();

router.use(express.json());

// get all games from database
router.get("/", async (req, res) => {
  try {
    let games = await gameController.getAllGames();
    return res.status(games.status).send(games.response);
  } catch (err) {
    return res.status(500).send(jsend.error({ message: err.message }));
  }
});

// get single game from database.
router.get("/game/:id", async (req, res) => {
  try {
    let game = await gameController.getGame(req.params.id);
    console.log(game);
    return res.status(game.status).send(game.response);
  } catch (err) {
    return res.status(500).send(jsend.error({ message: err.message }));
  }
});

// get single game by name from database.
router.get("/gameByName/:name", async (req, res) => {
  try {
    let game = await gameController.getGameByName(req.params.name);
    return res.status(game.status).send(game.response);
  } catch (err) {
    return res.status(500).send(jsend.error({ message: err.message }));
  }
});

// modify game.
router.put("/edit/:id", async (req, res) => {
  try {
    const gameUpdated = await gameController.updateGame(
      req.body.gameName,
      req.body.gameDescription,
      req.body.gamePlayersNumber,
      req.params.id
    );
    return res.status(gameUpdated.status).send(gameUpdated.response);
  } catch (err) {
    return res.status(500).send(jsend.error({ message: err.message }));
  }
});

router.post("/game", async (req, res) => {
  try {
    const gameToAdd = await gameController.createGame(
      req.body.gameName,
      req.body.gameDescription,
      req.body.gamePlayersNumber
    );
    console.log(gameToAdd);
    return res.status(gameToAdd.status).send(gameToAdd.response);
  } catch (err) {
    console.log("errrrr:"+err+"\n"+err.message)
    if (Number(err.message) === 11000) {
      return res
        .status(409)
        .send(jsend.error({ message: "Duplicate key error" }));
    } else {
      return res.status(500).send(jsend.error({ message: err.message }));
    }
  }
});

module.exports = router;
