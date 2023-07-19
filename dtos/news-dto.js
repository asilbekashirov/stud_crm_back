module.exports = class NewsDto {
    name = {
        en,
        ru,
        uz
    }
    image
    _id

    constructor(model) {
        this._id = model._id
        this.name = {
            uz: model.name.uz,
            ru: model.name.ru,
            en: model.name.en
        }
        this.image = model.image
    }

}