const jsend = require('jsend')

const INVALID_ID = {
  status: 404,
  response: jsend.fail({ message: "Invalid gameId" }),
};

const INVALID_NAME = {
  status: 403,
  response: jsend.fail({ message: "Invalid game name" }),
};

const GENERIC_ERROR = {
  status: 400,
  response: jsend.fail({ message: "Something went wrong" }),
};

const GAME_NOT_FOUND = {
  status: 404,
  response: jsend.fail({ message: "Game not found" }),
};

const DELETE_SUCCESS = {
  status: 200,
  response: jsend.success({ message: "Game deleted successfully" }),
};

const UPDATE_SUCCESS = {
  status: 200,
  response: jsend.success({ message: "Game updated" }),
};

function genericSuccessResponse(status, data) {
  return {
    status: status,
    response: jsend.success({ message: data }),
  };
}

module.exports = {
  INVALID_ID,
  INVALID_NAME,
  GENERIC_ERROR,
  GAME_NOT_FOUND,
  DELETE_SUCCESS,
  UPDATE_SUCCESS,
  genericSuccessResponse,
};
