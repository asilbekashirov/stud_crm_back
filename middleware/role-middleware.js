const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/api-error')

module.exports = function(roles) {
    return function (req, res, next) {

        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: "USER_NOT_AUTHORIZED"})
            }

            const {role: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

            // let hasRole = false
            // userRoles.forEach(role => {
            //     if (roles.includes(role)) {
            //         hasRole = true
            //     }
            // })
            const hasRole = roles.some(role => role === userRoles)
            if (!hasRole) {
                return res.status(403).json({message: "NOT_ENOUGH_RIGHTS"})
            }
            next();

        } catch (error) {
            return next(ApiError.RightError())
        }    
    }
}