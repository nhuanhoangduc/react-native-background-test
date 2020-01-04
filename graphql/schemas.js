const { gql } = require('apollo-server-express');
const GraphQLJSON = require('graphql-type-json');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// Read all schemas and resovlers
const objectFolders = fs.readdirSync(path.join(__dirname, 'objects'));
const { schemas, resolvers } = _.reduce(objectFolders, (memo, folderName) => {
    const schema = require(path.join(__dirname, 'objects', folderName, 'schema'));
    const resolvers = require(path.join(__dirname, 'objects', folderName, 'resolvers'));

    memo.schemas.push(schema);
    memo.resolvers.push(resolvers);

    return memo;
}, {
    schemas: [],
    resolvers: [],
});


const baseSchema = gql`
    scalar JSON

    type Query {
        _empty: String
    }
    
    type Mutation {
        _empty: String
    }
`;
const typeDefs = [baseSchema, ...schemas];
const allResolvers = _.merge(...resolvers, { JSON: GraphQLJSON, });


module.exports = {
    typeDefs: typeDefs,
    resolvers: allResolvers,
};
