const formatValidationErrorMessages = error => {
	const errorMessages = {};
	error.details.forEach(err => {
		errorMessages[err.path[0]] = err.message;
	});
	return errorMessages;
};

module.exports = { formatValidationErrorMessages }