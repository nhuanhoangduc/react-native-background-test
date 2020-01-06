const _ = require('lodash');
const ImageModel = require('@server/database/mongo/ImageModel');


module.exports = {
    Query: {
        uploadedImages: (_, __, { user }) => {
            return ImageModel.find({
                userId: user._id
            }).lean();
        },

        uploadedImageHashes: async (__, ___, { user }) => {
            const images = await ImageModel.find({
                userId: user._id
            }).lean();
            return _.map(images, 'hash');
        },
    },

    Mutation: {

    },

    User: {

    },
};