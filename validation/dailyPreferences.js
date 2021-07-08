const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePreferences(data) {
    let errors = {};

    data.remoteOrOffice = !isEmpty(data.remoteOrOffice) ? data.remoteOrOffice : '';
    data.workingFrom = !isEmpty(data.workingFrom) ? data.workingFrom : '';
    data.workingTo = !isEmpty(data.workingTo) ? data.workingTo : '';
    data.onPauseFrom = !isEmpty(data.onPauseFrom) ? data.onPauseFrom : '';
    data.onPauseTo = !isEmpty(data.onPauseTo) ? data.onPauseTo : '';

    const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (Validator.isEmpty(data.remoteOrOffice)) {
        errors.remoteOrOffice = 'This field is required';
    }

    if (!re.test(data.workingFrom)) {
        errors.workingFrom = 'This field is not valid (HH:MM)';
    }

    if (Validator.isEmpty(data.workingFrom)) {
        errors.workingFrom = 'This field is required';
    }

    if (!re.test(data.workingTo)) {
        errors.workingTo = 'This field is not valid (HH:MM)';
    }

    if (Validator.isEmpty(data.workingTo)) {
        errors.workingTo = 'This field is required';
    }

    if (!re.test(data.onPauseFrom)) {
        errors.onPauseFrom = 'This field is not valid (HH:MM)';
    }

    if (Validator.isEmpty(data.onPauseFrom)) {
        errors.onPauseFrom = 'This field is required';
    }

    if (!re.test(data.onPauseTo)) {
        errors.onPauseTo = 'This field is not valid (HH:MM)';
    }

    if (Validator.isEmpty(data.onPauseTo)) {
        errors.onPauseTo = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}