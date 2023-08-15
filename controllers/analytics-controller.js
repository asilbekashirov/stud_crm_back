const analyticsService = require("../service/analytics-service")

class AnalyticsController {
    async getAnalytics(req, res, next) {
        try {
            const analytics = await analyticsService.getAnalytics()

            return res.status(200).json(analytics)
        } catch (error) {
            next()
        }
    }
}

module.exports = new AnalyticsController()