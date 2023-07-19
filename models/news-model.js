const {model, Schema} = require('mongoose')

const NewsSchema = new Schema({
    name: {
        ru: {type: String, required: true},
        en: {type: String, required: true},
        uz: {type: String, required: true}
    },
    image: {type: String, required: true}
})

module.exports = model('News', NewsSchema)