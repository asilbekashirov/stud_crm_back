module.exports = class UserDto {
    email;
    _id;
    isActivated;
    fullName;
    birthday;
    role;
    selectedUniversities = []
    appliedUniversities = []

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
        this.birthday = model.birthday;
        this.fullName = model.fullName;
        this.role = model.role;
        this.selectedUniversities = model.selectedUniversities;
        this.appliedUniversities = model.appliedUniversities;
    }
}