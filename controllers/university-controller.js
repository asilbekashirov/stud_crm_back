const universityService = require('../service/university-service')
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

    async deleteUniversity(req, res, next) {
        try {
            const {id} = req.params
            await universityService.delete(id)

            return res.json({message: 'University has been deleted'})

        } catch (error) {
            next(error);
        }
    }

    async findUniversityById(req, res, next) {
        try {
            const {id} = req.params

            const university = await universityService.findById({id})

            return res.json(university);
        } catch (error) {
            next(error)
        }
    }

    async updateUniversity(req, res, next) {
        try {
            const {id} = req.params

            const university = await universityService.update(id, req.body)

            return res.json(university)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UniversityController();