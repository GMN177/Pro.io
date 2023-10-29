const express = require("express");
const jsend = require("jsend");
const logger = require("../utils/logger");
const matchController = require("../controllers/matchController");
const playController = require("../controllers/playController");

const router = express.Router();

// get all games from database
router.get("/", async (req, res) => {
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
        const match = await matchController.matchmaking(req.body.game, req.headers.authorization);

        if (match.status === 200) {
            await playController.createPlay(req.body.user, match.response.data.message);
        }

        return res.status(match.status).send(match.response);
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

router.post("/createPrivateMatch", async(req, res) => {
    try {
        const privateMatch = await matchController.createPrivateMatch(req.body.game, req.body.user);

        if (privateMatch.status === 200) {
            await playController.createPlay(req.body.user, privateMatch.response.data.message);
        }

        return res.status(privateMatch.status).send(privateMatch.response);
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

router.post("/joinPrivateMatch", async(req, res) => {
    try {
        const privateMatch = await matchController.joinPrivateMatch(req.body.matchId, req.body.user, req.headers.authorization);

        if (privateMatch.status === 200) {
            await playController.createPlay(req.body.user, privateMatch.response.data.message);
        }

        return res.status(privateMatch.status).send(privateMatch.response);
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

router.patch("/:id/endMatch", async (req, res) => {
    try {
        const ret1 = await matchController.endMatch(
            req.params.id,
            req.body.endTime
        );

        if (ret1.status === 200) {
            const ret2 = await playController.endPlays(
                req.params.id,
                req.body.winner,
                req.body.winnerScore,
                req.body.loserScore
            );
        }

        return res.status(ret1.status).send(ret1.response);
    } catch (err) {
        logger.error(err.message);

        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
});

router.delete("/", async (req, res) => {
    try {
        const matchDeleted = await matchController.deleteAllMatches();
        const playDeleted = await playController.deleteAllPlays();
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}));
    }
});

module.exports = router;
