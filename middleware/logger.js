const logger = (req, res, next) => {
    console.log("Request at ", req.url);
    next();
}

module.exports = logger;