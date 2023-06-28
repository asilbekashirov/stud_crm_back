const universityModel = require("../models/university-model")
const ApiError = require('../exceptions/api-error')
const UniversityDto = require("../dtos/university-dto")

class UniversityService {
    async create(props) {
        const {name} = props

        const university = await universityModel.find({name})

        if (university) {
            throw ApiError.BadRequest("UNIVERSITY_ALREADY_REGISTERED")
        }

        const newUniversity = universityModel.create(university)
        const universityDto = new UniversityDto(newUniversity)

        return {universityDto}
    }
    async delete(props) {
        const {id} = props

        await universityModel.findByIdAndDelete({_id: id})
    }
    async update(props) {
        const {} = props
    }
}

module.exports = new UniversityService()