module.exports = class UserDto {
    email;
    login;
    phone;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.login = model.login;
        this.phone = model.phone;
        this.isActivated = model.isActivated;
    }
}
