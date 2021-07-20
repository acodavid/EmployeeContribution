const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfile(data) {

    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = 'Date of birth is required is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}