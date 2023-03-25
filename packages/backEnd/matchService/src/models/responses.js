const jsend = require('jsend')

const INVALID_ID = {
    status: 404,
    response: jsend.fail({message: "Invalid matchId"}),
};

const INVALID_GAME = {
    status: 403,
    response: jsend.fail({message: "Invalid game"}),
};

const GENERIC_ERROR = {
    status: 400,
    response: jsend.fail({message: "Something went wrong"}),
};

const MATCH_NOT_FOUND = {
    status: 404,
    response: jsend.fail({message: "Match not found"}),
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
    GENERIC_ERROR,
    MATCH_NOT_FOUND,
    genericSuccessResponse,
};
