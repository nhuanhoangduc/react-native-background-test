const { gql } = require('apollo-server-express');


module.exports = gql`
    type Image {
        _id: ID!
        userId: ID!
        imageUrl: String
        hash: String
    }

    extend type Query {
        uploadedImages: [Image]
        uploadedImageHashes: [String]
    }
`;
