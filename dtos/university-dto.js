module.exports = class UniversityDto {
  id;
  name = {};
  description = {};
  country;
  city;
  foundIn;
  image;
  createdAt;
  updatedAt;
  bachelors;
  masters;
  phd;

  constructor(model) {
    this.id = model.id;
    this.name = {
      uz: model.name.uz,
      ru: model.name.ru,
      en: model.name.en
    }
    this.nameUz = model.nameUz;
    this.description = {
      uz: model.description.uz,
      ru: model.description.ru,
      en: model.description.en
    }
    this.country = model.country;
    this.city = model.city;
    this.foundIn = model.foundIn;
    this.image = model.image;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.bachelors = model.bachelors;
    this.masters = model.masters;
    this.phd = model.phd;
  }
};
