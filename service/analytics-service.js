const universityModel = require('../models/university-model');
const userModel = require('../models/user-model');

class AnalyticsService {
    async getAnalytics() {
        const totalUsers = await userModel.countDocuments({ role: "user" })
        const totalUniversities = await universityModel.countDocuments()

        return {totalUsers, totalUniversities}
    }
}

module.exports = new AnalyticsService();