/* eslint-disable func-names */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongooseDelete = require('mongoose-delete');
const { models, roles } = require('../utils/constants');

const UserSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			enum: ['Male', 'Female'],
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		phone_number: {
			type: String,
			required: true,
			unique: true
		},
		role: {
			type: String,
			enum: roles,
			required: true
		},
		profile_picture: {
			type: String
		},
		hash: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		},
		resetPasswordToken: {
			type: String,
			required: false
		},
		resetPasswordExpires: {
			type: Date,
			required: false
		},
		activated: {
			type: Boolean,
			required: true
		},
	},
	{
		timestamps: true
	}
);

UserSchema.index({ first_name: 'text', last_name: 'text' });

UserSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true });

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	/* eslint-disable no-underscore-dangle */
	return jwt.sign(
		{
			email: this.email,
			id: this._id,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		'secret'
	);
	/* eslint-enable no-underscore-dangle */
};
/* eslint-disable no-underscore-dangle */
UserSchema.methods.toAuthJSON = function () {
	return {
		...this._doc,
		salt: undefined,
		hash: undefined,
		access_token: this.generateJWT()
	};
};
/* eslint-enable no-underscore-dangle */

UserSchema.methods.generatePasswordReset = function () {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

module.exports = mongoose.model(models.USER, UserSchema);
