const {validationResult} = require('express-validator');

class UniversityController {
    async createUniversity(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('VALIDATION_ERROR', errors.array()))
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UniversityController();