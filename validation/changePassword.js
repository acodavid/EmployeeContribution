const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePass(data) {

    let errors = {};

    data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.newPasswordConfirmation = !isEmpty(data.newPasswordConfirmation) ? data.newPasswordConfirmation : '';


    if (!Validator.isLength(data.currentPassword, { min: 6, max: 30 })) {
        errors.currentPassword = 'Password must be beetween 6 and 30 characters';
    }

    if (Validator.isEmpty(data.currentPassword)) {
        errors.currentPassword = 'This field is required';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Password must be beetween 6 and 30 characters';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'This field is required';
    }

    if (!Validator.isLength(data.newPasswordConfirmation, { min: 6, max: 30 })) {
        errors.newPasswordConfirmation = 'Password must be beetween 6 and 30 characters';
    }

    if (Validator.isEmpty(data.newPasswordConfirmation)) {
        errors.newPasswordConfirmation = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}