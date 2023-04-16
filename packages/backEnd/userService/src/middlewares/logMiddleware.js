function logger(req, res, next){
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const time  = 'time: '.concat(hours, ':', minutes, ':', seconds);
    const url = req.url;
    const method = req.method;
    console.log('###', method, url, time);
    next();
}
