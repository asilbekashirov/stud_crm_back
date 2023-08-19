const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {

    async addUniversity(req, res, next) {
        try {
            
            const {id} = req.params
            const university = req.body

            const user = await userService.addUni(id, university)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getUserProfile(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.getProfile(id)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeUniversity(req, res, next) {
        try {
            const {id} = req.params
            const universityId = req.body
            const user = await userService.removeUni(id, universityId)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('VALIDATION_ERROR', errors.array()))
            }
            const userData = await userService.register(req.body)
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(201).json(userData)
        } catch (e) {
            next(e)
        }
    }
    async updateUser(req, res, next) {
        try {
            const {id} = req.params

            const user = await userService.update(id, req.body)

            return res.json(user)

        } catch (error) {
            next(error)
        }
    }
    async updatePassword(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.updatePassword(id, req.body)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async deleteUser(req, res, next) {
        try {
            const {id} = req.params

            await userService.delete(id)

            return res.json({message: "User deleted"})

        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshCookie')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()