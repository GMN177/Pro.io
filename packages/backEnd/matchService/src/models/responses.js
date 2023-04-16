const jsend = require('jsend')

const INVALID_ID = {
    status: 404,
    response: jsend.fail({message: "Invalid matchId"}),
};

const INVALID_GAME = {
    status: 403,
    response: jsend.fail({message: "Invalid game"}),
};

const INVALID_MATCH = {
    status: 403,
    response: jsend.fail({message: "Invalid match"}),
};

const INVALID_USER = {
    status: 403,
    response: jsend.fail({message: "Invalid user"}),
};

const GENERIC_ERROR = {
    status: 400,
    response: jsend.fail({message: "Something went wrong"}),
};

const MATCH_NOT_FOUND = {
    status: 404,
    response: jsend.fail({message: "Match not found"}),
};

const PLAY_NOT_FOUND = {
    status: 404,
    response: jsend.fail({message: "Play not found"}),
};

const UPDATE_SUCCESS = {
    status: 200,
    response: jsend.success({ message: "Match updated" }),
};

function genericSuccessResponse(status, data) {
    return {
        status: status,
        response: jsend.success({message: data}),
    };
}

module.exports = {
    INVALID_ID,
    INVALID_GAME,
    INVALID_MATCH,
    INVALID_USER,
    GENERIC_ERROR,
    MATCH_NOT_FOUND,
    PLAY_NOT_FOUND,
    UPDATE_SUCCESS,
    genericSuccessResponse,
};
