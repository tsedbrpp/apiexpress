// validators.js

const isEmpty = (string: string) => {
    if (string.trim() === '') return true;
    else return false;
};

exports.validateLoginData = (data: { email: string; password: string; }) => {
    let errors = {};
    if (isEmpty(data.email)) { // @ts-ignore
        errors.email = 'Must not be empty';
    }
    if (isEmpty(data.password)) { // @ts-ignore
        errors.password = 'Must not be  empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};


