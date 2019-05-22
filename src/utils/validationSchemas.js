const Joi = require("@hapi/joi");

const createSchema = Joi.object().keys({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required()
})

const updateSchema = Joi.object().keys({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30)
})

module.exports = {
    createSchema,
    updateSchema
}