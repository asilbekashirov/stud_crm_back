module.exports = class UniversityDto {
  id;
  nameRu;
  nameEn;
  nameUz;
  descriptionRu;
  descriptionEn;
  descriptionUz;
  country;
  city;
  active;
  foundIn;
  tuitionFee;
  image;

  constructor(model) {
    this.id = model.id;
    this.nameRu = model.nameRu;
    this.nameEn = model.nameEn;
    this.nameUz = model.nameUz;
    this.descriptionRu = model.descriptionRu;
    this.descriptionEn = model.descriptionEn;
    this.descriptionUz = model.descriptionUz;
    this.country = model.country;
    this.city = model.city;
    this.active = model.active;
    this.foundIn = model.foundIn;
    this.tuitionFee = model.tuitionFee;
    this.image = model.image;
  }
};
