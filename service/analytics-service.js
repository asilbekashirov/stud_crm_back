const countryModel = require('../models/country-model');
const universityModel = require('../models/university-model');
const userModel = require('../models/user-model');

class AnalyticsService {
    async getAnalytics() {
        const totalUsers = await userModel.countDocuments({ role: "user" })
        const totalUniversities = await universityModel.countDocuments()

        const countriesAndCounts = await countryModel.find()

        return {totalUsers, totalUniversities, countriesAndCounts}
    }
}

module.exports = new AnalyticsService();