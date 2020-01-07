const _ = require('lodash');
const { withFilter } = require('apollo-server-express');
const ImageModel = require('@server/database/mongo/ImageModel');
const pubsub = require('@server/graphql/pubsub');


module.exports = {
    Subscription: {
        imageUploaded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('IMAGE_UPLOADED'),
                (payload, variables, context) => {
                    const { imageUploaded } = payload;
                    return _.get(imageUploaded, ['userId'], '').toString() === _.get(context, ['user', '_id'], '').toString();
                },
            ),
        },
    },
    
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