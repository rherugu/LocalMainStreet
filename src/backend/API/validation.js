//VALIDATION
const Joi = require('@hapi/joi')


const registerValidation = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        fname: Joi.string().min(1).required(),
        lname: Joi.string().min(1).required(),
    });
    return schema.validate(req);
}

const LoginValidation = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(req);
}


module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;