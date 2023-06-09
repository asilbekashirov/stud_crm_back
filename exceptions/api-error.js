module.exports = class ApiError extends Error {

    status;
    errors;

    constructor(status, message, errors = []) {
        super(message)
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        throw new ApiError(401, 'NOT_AUTHORIZED');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static RightError() {
        throw new ApiError(403, 'NOT_ENOUGH_RIGHTS');
    }

}