const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('@server/database/mongo/UserModel');


module.exports = {
    Query: {
        me: (_, __, context) => {
            return null;
        },
    },

    Mutation: {
        login: async (_, { username, password }) => {
            const user = await UserModel.findOne({
                username: username,
            });
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error('Wrong password');
            }

            const token = jwt.sign({
                _id: user._id,
                username: username,
            }, 'server');

            return {
                username: user.username,
                token: token,
            };
        },
    },

    User: {

    },
};