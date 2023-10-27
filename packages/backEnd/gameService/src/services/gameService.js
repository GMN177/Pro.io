const express = require("express");
const jsend = require("jsend");
const logger = require("../utils/logger");
const gameController = require("../controllers/gameController");

const router = express.Router();

// get all games from database
router.get("/", async (req, res) => {
    try {
        let games = await gameController.getAllGames();
        return res.status(games.status).send(games.response);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
});

// get single game from database.
router.get("/:id", async (req, res) => {
    try {
        let game = await gameController.getGame(req.params.id);
        return res.status(game.status).send(game.response);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
});

// get single game by name from database.
router.get("/game/:name", async (req, res) => {
    try {
        let game = await gameController.getGameByName(req.params.name);
        return res.status(game.status).send(game.response);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
});

// modify game.
router.put("/:id", async (req, res) => {
    try {
        const gameUpdated = await gameController.updateGame(
            req.body.gameName,
            req.body.gameDescription,
            req.body.gamePlayersNumber,
            req.params.id
        );
        return res.status(gameUpdated.status).send(gameUpdated.response);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
});

router.post("/", async (req, res) => {
    try {
        const gameToAdd = await gameController.createGame(
            req.body.gameName,
            req.body.gameDescription,
            req.body.gamePlayersNumber
        );
        return res.status(gameToAdd.status).send(gameToAdd.response);
    } catch (err) {
        logger.error(err.message);
        if (err.code === 11000) {
            return res
                .status(409)
                .send(jsend.error({
                    message: "Duplicate key error"
                }));
        } else {
            return res.status(500).send(jsend.error({
                message: err.message
            }));
        }
    }
});

module.exports = router;