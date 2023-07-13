const universityModel = require("../models/university-model")
const ApiError = require('../exceptions/api-error')
const UniversityDto = require("../dtos/university-dto")

class UniversityService {
    async create(data, image) {
        const {nameEn} = data

        console.log(data);

        const university = await universityModel.findOne({nameEn})

        if (university) {
            throw ApiError.BadRequest("UNIVERSITY_ALREADY_REGISTERED")
        }

        const universityImagePath = '/media/' + image?.filename

        const newUniversity = await universityModel.create({...data, image: !!image ? universityImagePath : ""})
        const universityDto = new UniversityDto(newUniversity)

        return {university: universityDto}
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
        const deletedUni = await universityModel.findByIdAndDelete(id)

        if (!deletedUni) {
            throw new ApiError.BadRequest("UNIVERSITY_NOT_FOUND")
        }

    }

    async getUniversities() {
        return await universityModel.find()
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