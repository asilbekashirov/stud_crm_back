module.exports = class UserDto {
    email;
    id;
    isActivated;
    name;
    surname;
    birthday;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.surname = model.surname;
        this.birthday = model.birthday;
    }
}