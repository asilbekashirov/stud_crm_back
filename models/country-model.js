const {model, Schema} = require('mongoose');

const CountrySchema = new Schema({
    country: {type: String, required: true, unique: true},
    universities: {type: Number}
})

module.exports = model('Country', CountrySchema);