const NewsDto = require("../dtos/news-dto")
const newsModel = require("../models/news-model")

class NewsService {

    async create(data, image) {

        // assign image path to new record
        const newsImagePath = "/media/news" + image?.filename;
        data.image = !!image ? newsImagePath : "";

        const newNews = new newsModel(data)

        // await newNews.save()

        const newsDto = new NewsDto(newNews)

        return {news: newsDto}

    }

    async delete(id) {
        return await newsModel.findByIdAndDelete(id)
    }

    async update(id, data) {
        return await newsModel.findByIdAndUpdate(id, data)
    }

    async getAll() {
        return await newsModel.find()
    }

}

module.exports = new NewsService()