const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegister(data) {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // email regex
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const re2 = /^[^@\s]+@wayseven.com$/
    const numberRegex = /^\d+\.?\d*$/;


    if (!re2.test(data.email)) {
        errors.email = 'Email is not valid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be beetween 6 and 30 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = 'Date of birth is required';
    }

    if (Validator.isEmpty(data.typeOfPosition)) {
        errors.typeOfPosition = 'Type of position is required';
    }

    if (Validator.isEmpty(data.hiredDate)) {
        errors.hiredDate = 'Hired date is required';
    }

    if (Validator.isEmpty(data.contractDuration)) {
        errors.contractDuration = 'Contract duration is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }

    if (!numberRegex.test(data.durationOfPreviousService)) {
        errors.durationOfPreviousService = 'Duration of previous service is not valid';
    }

    if (Validator.isEmpty(data.durationOfPreviousService)) {
        errors.durationOfPreviousService = 'Duration of previous service is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}