const jsend = require('jsend')

const INVALID_ID = {
    status: 404,
    response: jsend.error({message: 'invalid userId'})
}

const INVALID_USERNAME_OR_PW = {
    status : 403,
    response: jsend.error({message: 'invalid username or password'}) 
}

const GENERIC_ERROR = {
    status: 400,
    response: jsend.error({message: 'something went wrong'})
}

const GENERIC_NOT_FOUND = {
    status: 404,
    response: jsend.error({message: 'data not found'})
}

const USER_NOT_FOUND = {
    status: 404,
    response: jsend.fail({message: 'user not found'})
} 

const DELETE_SUCCESS = {
    status: 200,
    response: jsend.success({})
} 

const UPDATE_SUCCESS = {
    status: 200,
    response: jsend.success({})
} 

const SENT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({})
}

const ACCEPT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({})
}

const REJECT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({})
}

const FORBIDDEN_ERROR = {
    status: 403,
    response: jsend.error({message: "no refresh token"})
}

const NOT_VERIFIED = {
    status: 403,
    response: jsend.error({message: "user is not verified"})
}

function genericSuccessResponse(status, data){
    return {
        status: status,
        response: jsend.success(data)
    }
}

module.exports = {
    INVALID_ID,
    INVALID_USERNAME_OR_PW,
    GENERIC_ERROR,
    USER_NOT_FOUND,
    DELETE_SUCCESS,
    UPDATE_SUCCESS,
    SENT_REQUEST_SUCCESS,
    ACCEPT_REQUEST_SUCCESS, 
    REJECT_REQUEST_SUCCESS,
    FORBIDDEN_ERROR,
    GENERIC_NOT_FOUND,
    NOT_VERIFIED,
    genericSuccessResponse
}


