function userServiceLogger(req, res, next){
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const time  = 'time: '.concat(hours, ':', minutes, ':', seconds);
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    console.log('### USER SERVICE', method, `api/users${url}`, time, ip);
    next();
}

function authServiceLogger(req, res, next){
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const time  = 'time: '.concat(hours, ':', minutes, ':', seconds);
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    console.log('### AUTH SERVICE', method, `api/auth${url}`, time, ip);
    next();
}

module.exports = {userServiceLogger, authServiceLogger}