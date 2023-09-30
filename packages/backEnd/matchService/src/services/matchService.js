const express = require("express");
const jsend = require("jsend");
const matchController = require("../controllers/matchController");
const playController = require("../controllers/playController");
const router = express.Router();

router.use(express.json());

// get all games from database
router.get("/", async (req, res) => {
    console.log(req.body.tokenData);
    try {
        let matches = await matchController.getAllMatches();
        return res.status(matches.status).send(matches.response);
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

// get single game from database.
router.get("/:id", async (req, res) => {
    try {
        let match = await matchController.getMatch(req.params.id);
        return res.status(match.status).send(match.response);
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

// get single game by name from database.
router.get("/matchByGame/:game", async (req, res) => {
    try {
        let matches = await matchController.getMatchesByGame(req.params.game);
        return res.status(matches.status).send(matches.response);
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

router.get("/matchByUser/:user", async (req, res) => {
    try {
        let plays = await playController.getByMatchAndUser(req.params.match, req.params.user);
        return res.status(plays.status).send(plays.response);
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

//ho bisogno di tutti gli userId e i punti
// modify game.
router.put("/:id", async (req, res) => {
    try {
        const matchUpdated = await matchController.updateMatch(
            req.params.id,
            req.body.game,
            req.body.duration,
            req.body.startTime,
            req.body.endTime,
            req.body.status,
        );
        return res.status(matchUpdated.status).send(matchUpdated.response);
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

router.post("/", async (req, res) => {
    try {
        const matchToAdd = await matchController.createMatch(
            req.body.game,
            req.body.duration,
            req.body.startTime,
            req.body.endTime,
            req.body.status
        );
        return res.status(matchToAdd.status).send(matchToAdd.response);
    } catch (err) {
        if (Number(err.message) === 11000) {
            return res
                .status(409)
                .send(jsend.error({message: "Duplicate key error"}));
        } else {
            return res.status(500).send(jsend.error({message: err.message}));
        }
    }
});

router.post("/matchmaking", async(req, res) => {
    try {
        const playToAdd = await matchController.matchmaking(req.body.game, req.body.user, req.headers.authorization);
        return res.status(playToAdd.status).send(playToAdd.response);
    } catch (err) {
        if (Number(err.message) === 11000) {
            return res
                .status(409)
                .send(jsend.error({message: "Duplicate key error"}));
        } else {
            return res.status(500).send(jsend.error({message: err.message}));
        }
    }
})

module.exports = router;
