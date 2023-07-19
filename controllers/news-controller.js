const newsService = require('../service/news-service')

class NewsController {
    async createNews(req, res, next) {
        try {
            
            const createdNews = await newsService.create(req.body, req.file)

            return res.json(createdNews)
        } catch (error) {
            next(error)
        }
    }

    async deleteNews(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getAllNews(req, res, next) {
        try {
            const allNews = await newsService.getAll()

            return res.json(allNews)
        } catch (error) {
            next(error)
        }
    }

    async updateNews(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NewsController()