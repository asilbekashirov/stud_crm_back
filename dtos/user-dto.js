module.exports = class UserDto {
    email;
    id;
    isActivated;
    fullName;
    birthday;
    role;
    selectedUniversities = []
    appliedUniversities = []

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.birthday = model.birthday;
        this.fullName = model.fullName;
        this.role = model.role;
        this.selectedUniversities = model.selectedUniversities;
        this.appliedUniversities = model.appliedUniversities;
    }
}