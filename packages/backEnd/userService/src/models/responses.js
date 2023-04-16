const jsend = require('jsend')

const INVALID_ID = {
    status: 404,
    response: jsend.fail({message: 'invalid userId'})
}

const INVALID_USERNAME_OR_PW = {
    status : 403,
    response: jsend.fail({message: 'invalid username or password'}) 
}

const GENERIC_ERROR = {
    status: 400,
    response: jsend.fail({message: 'something went wrong'})
}

const USER_NOT_FOUND = {
    status: 404,
    response: jsend.fail({message: 'user not found'})
} 

const DELETE_SUCCESS = {
    status: 200,
    response: jsend.success({message: 'account deleted successfully'})
} 

const UPDATE_SUCCESS = {
    status: 200,
    response: jsend.success({message: "record updated"})
} 

const SENT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({message: "request sent"})
}

const ACCEPT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({message: "request accepted"})
}

const REJECT_REQUEST_SUCCESS = {
    status: 200,
    response: jsend.success({message: "request refused"})
}

function genericSuccessResponse(status, data){
    return {
        status: status,
        response: jsend.success({message: data})
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
    genericSuccessResponse
}


