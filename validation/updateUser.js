const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateUpdateUser(data) {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // email regex
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const numberRegex = /^\d+\.?\d*$/;


    if (!re.test(data.email)) {
        errors.email = 'Email is not valid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
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

    if (Validator.isEmpty(data.terminationDate)) {
        errors.terminationDate = 'Termination date is required';
    }

    if (Validator.isEmpty(data.orgLevel)) {
        errors.orgLevel = 'Organization level is required';
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