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

    async findById(id) {
        const university = await universityModel.find({_id: id})

        if (!university) {
            throw new ApiError.BadRequest("UNIVERSITY_NOT_FOUND")
        }

        const universityDto = new UniversityDto(university)

        return {university: universityDto}
    }

    async delete(id) {
        await universityModel.findByIdAndDelete(id)
    }

    async update(id, rest) {

        let university = await universityModel.find({_id: id})

        if (!university) {
            throw ApiError.BadRequest("UNIVERSITY_NOT_FOUND")
        }

        university = {...university, ...rest}

        await university.save()

        const universityDto = new UniversityDto(university)

        return {university: universityDto}

    }
}

module.exports = new UniversityService()