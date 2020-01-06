const ImageModel = require('@server/database/mongo/ImageModel');


module.exports = {
    Query: {
        uploadedImages: (_, __, { user }) => {
            return ImageModel.find({
                userId: user._id
            });
        },
    },

    Mutation: {

    },

    User: {

    },
};