const countryModel = require('../models/country-model');
const universityModel = require('../models/university-model');
const userModel = require('../models/user-model');

class AnalyticsService {
    async getAnalytics() {
        const totalUsers = await userModel.countDocuments({ role: "user" })
        const totalAdmins = await userModel.countDocuments({ role: "admin" })
        const totalUniversities = await universityModel.countDocuments()

        const countriesAndCounts = await countryModel.find()

        return {totalUsers, totalUniversities, countriesAndCounts, totalAdmins}
    }

    async getCountries() {
        const countriesAndCounts = await countryModel.find()

        const countries = countriesAndCounts.map(country => country.country)

        return countries
    }
}

module.exports = new AnalyticsService();