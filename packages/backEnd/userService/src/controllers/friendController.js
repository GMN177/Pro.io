const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const responses =  require('../models/responses')

async function getUserFriends(id){
    if(!mongoose.isValidObjectId(id)){
        return responses.INVALID_ID
    }
    try{
        let ret = await User.findOne({ _id: id, status: 'ACTIVE' })
            .populate([
                { path: 'friends', select: 'username' },
                { path: 'pending', select: 'username' },
                { path: 'sent', select: 'username' }
            ])
            .exec()

        if(ret == null) {
            return responses.USER_NOT_FOUND
        }
        let response = responses.genericSuccessResponse(200, {
            friends: ret.friends,
            pending: ret.pending,
            sent: ret.sent
        })
        return response
    }catch(err){
        throw new Error(err.message)
    }
}

async function addFriend(id1, id2) {
    if(!mongoose.isValidObjectId(id1) || !mongoose.isValidObjectId(id2)){
        return responses.INVALID_ID 
    }
    try{
        let ret1 = await User.findOne({_id: id1}).where('status').equals('ACTIVE').exec()
        let ret2 = await User.findOne({_id: id2}).where('status').equals('ACTIVE').exec()

        if(ret1 != null && ret2 != null && 
            !ret1.friends.includes(id2) && !ret2.friends.includes(id1) &&
            !ret1.sent.includes(id2) && !ret2.pending.includes(id1)){
            ret1.sent.push(id2)
            ret2.pending.push(id1)
            ret1.save()
            ret2.save()
        }else{
            return responses.GENERIC_ERROR 
        }
        return responses.SENT_REQUEST_SUCCESS 
    }catch(err){
        throw new Error(err.message)
    }
}

async function acceptFriend(personalId, idToAccept){
    if(!mongoose.isValidObjectId(personalId) || !mongoose.isValidObjectId(idToAccept)){
        return responses.INVALID_ID 
    }
    try{
        let ret1 = await User.findOne({_id: personalId}).where('status').equals('ACTIVE').exec()
        let ret2 = await User.findOne({_id: idToAccept}).where('status').equals('ACTIVE').exec()
        if(ret1 != null && ret2 != null && 
            ret1.pending.includes(idToAccept) && ret2.sent.includes(personalId) &&
            !ret1.friends.includes(idToAccept) && !ret1.friends.includes(personalId)){
                ret1.pending.splice(ret1.pending.indexOf(idToAccept), 1)
                ret1.friends.push(idToAccept)
                ret2.sent.splice(ret2.sent.indexOf(personalId), 1)
                ret2.friends.push(personalId)
                ret1.save()
                ret2.save()
        }else{
            return responses.GENERIC_ERROR
        }
        return responses.ACCEPT_REQUEST_SUCCESS 
    }catch(err){
        throw new Error(err.message)
    }
}

async function refuseFriend(personalId, friendId) {
    if(!mongoose.isValidObjectId(personalId) || !mongoose.isValidObjectId(friendId)){
        return responses.INVALID_ID 
    }
    try{
        let ret1 = await User.findOne({_id: personalId}).where('status').equals('ACTIVE').exec()
        let ret2 = await User.findOne({_id: friendId}).where('status').equals('ACTIVE').exec()

        if(ret1 != null && ret2 != null &&
            ret1.pending.includes(friendId) && ret2.sent.includes(personalId) &&
            !ret1.friends.includes(friendId) && !ret1.friends.includes(personalId)){
                ret1.pending.splice(ret1.pending.indexOf(friendId),1)
                ret2.sent.splice(ret2.sent.indexOf(personalId),1)
                ret1.save()
                ret2.save()
            }
        else{
            return responses.GENERIC_ERROR 
        }
        return responses.REJECT_REQUEST_SUCCESS
    }catch(err) {
        throw new Error(err.message)
    }
}


module.exports = {addFriend, acceptFriend, getUserFriends, refuseFriend}