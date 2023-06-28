const {Schema, model} = require('mongoose');

const UniversitySchema = new Schema({
    nameRu: {type: String, required: true},
    nameEn: {type: String, required: true},
    nameUz: {type: String, required: true},
    foundIn: {type: Date},
    country: {type: String, required: true},
    city: {type: String, required: true},
    active: {type: Boolean, default: false},
    tuitionFee: {type: Number, default: 0},
    descriptionRu: {type: String},
    descriptionEn: {type: String},
    descriptionUz: {type: String},
    image: {type: String}
}, {timestamps: true})

module.exports = model('University', UniversitySchema);