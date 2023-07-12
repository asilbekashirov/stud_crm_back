const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dtos/user-dto')

class UserService {
    async register(props) {

        const {email, password} = props

        const candidate = await UserModel.findOne({ email })

        if (candidate) {
            // throw error if user already registered
            throw ApiError.BadRequest('USER_ALREADY_REGISTERED')
        }

        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({...props, password: hashedPassword, activationLink})
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const token = tokenService.generateToken({...userDto})

        return {...token, user: userDto}

    }

    async update(id, rest) {
        let user = await UserModel.findOne({_id: id})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        user = {...user, ...rest}
        await user.save()
        const userDto = new UserDto(user)

        return {user: userDto}
    }

    async delete(id) {
        await UserModel.findByIdAndDelete(id)
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('INCORRECT_ACTIVATION_LINK')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Некорректный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})

        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
}

module.exports = new UserService()