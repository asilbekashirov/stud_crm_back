const universityModel = require("../models/university-model");
const ApiError = require("../exceptions/api-error");
const UniversityDto = require("../dtos/university-dto");
const courseModel = require("../models/course-model");
const countryModel = require("../models/country-model");

class UniversityService {
  async create(data, image) {

    // check if university already exists
    const university = await universityModel.findOne({
      "name.en": data["name.en"],
    });
    if (university) {
      throw ApiError.BadRequest("UNIVERSITY_ALREADY_REGISTERED");
    }

    // assign image path to university
    const universityImagePath = "/media/university/" + image?.filename;
    data.image = !!image ? universityImagePath : "";

    const baseUniversity = Object.assign({}, data);

    delete baseUniversity.bachelors;
    delete baseUniversity.masters; 
    delete baseUniversity.phd;
    
    // save record
    const newUniversity = new universityModel(baseUniversity);
    await newUniversity.save();

    // normalize country name, so it starts with capital letter
    const countryStandard = `${data["country"].at(0).toUpperCase()}${data["country"].substring(1).toLowerCase()}`;
    // update countries and count of universities
    const foundCountry = await countryModel.findOne({country: countryStandard})
    if (foundCountry) {
      // increment count
      foundCountry.universities += 1;
      await foundCountry.save();
    } else {
      const newCountry = new countryModel({
        country: countryStandard,
        universities: 1,
      });
      await newCountry.save();
    }

    const coursesArray = [
      { bachelors: JSON.parse(data.bachelors) },
      { masters: JSON.parse(data.masters) },
      { phd: JSON.parse(data.phd) },
    ];

    for (const course of coursesArray) {
        for (const [key, value] of Object.entries(course)) {
            for (const courseItem of value) {
                courseItem.university = newUniversity._id; 
                const newCourse = new courseModel(courseItem);
                await newCourse.save();
                newUniversity[key].push(newCourse)
                await newUniversity.save()
            }
        }
    }

    const universityDto = new UniversityDto(newUniversity);

    return { university: universityDto };
  }

  async findById(id) {
    const university = await universityModel.findById(id)
        .populate({path: 'bachelors'})
        .populate({path: 'masters'})
        .populate({ path: 'phd'});

    if (!university) {
      throw new ApiError.BadRequest("UNIVERSITY_NOT_FOUND");
    }

    const universityDto = new UniversityDto(university);

    return { university: universityDto };
  }

  async delete(id) {
    const deletedUni = await universityModel.findByIdAndDelete(id);

    if (!deletedUni) {
      throw new ApiError.BadRequest("UNIVERSITY_NOT_FOUND");
    }
  }

  async getUniversities(page = 1, limit = 10, country = "") {

    const params = {}

    const checkFields = () => {
      const paramsArr = [country]
      if (!Array.isArray(paramsArr)) return
      [{key: 'country', value: country}].map(item => {
        if (!item.value) return
        params[item.key] = item.value
      })
    }
    checkFields()

    console.log(params);
    return await universityModel.paginate(params, {page, limit, populate: ["bachelors", "masters", "phd"]})
  }

  async update(id, rest) {
    let university = await universityModel.find({ _id: id });

    if (!university) {
      throw ApiError.BadRequest("UNIVERSITY_NOT_FOUND");
    }

    university = { ...university, ...rest };

    await university.save();

    const universityDto = new UniversityDto(university);

    return { university: universityDto };
  }
}

module.exports = new UniversityService();
