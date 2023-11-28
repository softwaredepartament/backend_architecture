function returnResponse(res, status, message, error) {
    return res.status(status).json({
        status,
        message,
        error,
    });
}

module.exports = {
    returnResponse,
};
