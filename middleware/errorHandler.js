const errorHandler = (error, request, response, next) => {
    console.log( `error ${error.message}`) // log the error
    const status = error.status || 400
    // send back
    response.status(status).send(error.message)
}

module.exports = errorHandler;