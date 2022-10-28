const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { models } = require('../utils/constants');

const SaleSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		content: {
			type: String
		},
	},
	{
		timestamps: true
	}
);

SaleSchema.index({ name: 'text' });

SaleSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true });

module.exports = mongoose.model(models.NOTES, SaleSchema);
