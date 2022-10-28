const Joi = require('@hapi/joi');
const { formatValidationErrorMessages } = require('../../utils/helpers');

module.exports = {
	async register(req, res, next) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			confirm_password: Joi.any().valid(Joi.ref('password')).required(),
			name: Joi.string().required(),
		});

		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = formatValidationErrorMessages(error);
			return res.status(422).json(errorMessages);
		}
		next();
	},

	login(req, res, next) {
		const schema = Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required()
		});

		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = formatValidationErrorMessages(error);
			return res.status(400).json(errorMessages);
		}
		next();
	},

};
