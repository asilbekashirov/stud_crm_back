const universityModel = require("../models/university-model");
const ApiError = require("../exceptions/api-error");
const UniversityDto = require("../dtos/university-dto");
const courseModel = require("../models/course-model");

class UniversityService {
  async create(data, image) {

    const university = await universityModel.findOne({
      "name.en": data["name.en"],
    });

    if (university) {
      throw ApiError.BadRequest("UNIVERSITY_ALREADY_REGISTERED");
    }

    const universityImagePath = "/media/" + image?.filename;

    data.image = !!image ? universityImagePath : "";

    const baseUniversity = Object.assign({}, data);

    delete baseUniversity.bachelors;
    delete baseUniversity.masters;
    delete baseUniversity.phd;

    const newUniversity = new universityModel(baseUniversity);

    await newUniversity.save();

    const coursesArray = [
      {
        bachelors: JSON.parse(data.bachelors),
      },
      {
        masters: JSON.parse(data.masters),
      },
      {
        phd: JSON.parse(data.phd),
      },
    ];

    for (const course of coursesArray) {
        for (const [key, value] of Object.entries(course)) {
            for (const courseItem of value) {
                courseItem.university = newUniversity._id; 
                const newCourse = new courseModel(courseItem);
                await newCourse.save();
                console.log(key)
                console.log(newCourse);
                newUniversity[key].push(newCourse)
                await newUniversity.save()
            }
        }
    }

    const universityDto = new UniversityDto(newUniversity);

    return { university: universityDto };
  }

  async findById(id) {
    const university = await universityModel.findOne({ _id: id })
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

  async getUniversities() {
    return await universityModel.find()
        .populate({path: 'bachelors'})
        .populate({path: 'masters'})
        .populate({ path: 'phd'})
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
