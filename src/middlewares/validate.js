const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


const validate = (schema) => (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
        return next(
            new ApiError(
                httpStatus.UNSUPPORTED_MEDIA_TYPE,
                "SUpports JSON request body only"
            )
        );
    }
    console.log("in middleware");
    return next();
}

module.exports = validate;