module.exports = class CourseDto {
    id;
    name = {}
    description = {}
    active
    tuitionFee
    semesters
    intake = {}
  
    constructor(model) {
      this.id = model.id;
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
  