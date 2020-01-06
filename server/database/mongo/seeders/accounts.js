const bcrypt = require('bcrypt');
const UserModel = require('@server/database/mongo/UserModel');


const username = 'admin';
const password = 'admin';
const saltRounds = 10;


module.exports = async () => {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await UserModel.deleteMany();
    await UserModel.create({
        username: username,
        password: passwordHash,
    });
};
