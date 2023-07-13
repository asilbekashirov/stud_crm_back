const {Schema, model} = require('mongoose');

const UniversitySchema = new Schema({
    nameRu: {type: String, required: true},
    nameEn: {type: String, required: true},
    nameUz: {type: String, required: true},
    foundIn: {type: String},
    country: {type: String, required: true},
    city: {type: String, required: true},
    descriptionRu: {type: String},
    descriptionEn: {type: String},
    descriptionUz: {type: String},
    image: {type: String}
}, {timestamps: true})

module.exports = model('University', UniversitySchema);