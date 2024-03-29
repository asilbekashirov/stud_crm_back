module.exports = class CourseDto {
    id;
    name = {
      en: "",
      ru: "",
      uz: ""
    }
    description = {
      en: "",
      ru: "",
      uz: ""
    }
    active
    tuitionFee
    semesters
    intake = {
      fall: false,
      spring: false,
    }
    educationType = {
      fullTime: false,
      partTime: false,
    }
    languages = []
  
    constructor(model) {
      this.id = model.id;
      this.educationType = {
        fullTime: model.educationType.fullTime,
        partTime: model.educationType.partTime
      },
      this.languages = model.languages
      this.name = {
        en: model.name.en,
        ru: model.name.ru,
        uz: model.name.uz
      },
      this.description = {
        en: model.description.en,
        ru: model.description.ru,
        uz: model.description.uz
      },
      this.tuitionFee = model.tuitionFee
      this.intake = {
        fall: model.intake.fall,
        spring: model.intake.spring
      },
      this.semesters = model.semesters,
      this.active = model.active
    }
  };
  