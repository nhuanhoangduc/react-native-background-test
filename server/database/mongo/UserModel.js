const mongoose = require('./connection');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    password: String,
});


module.exports = mongoose.model('users', userSchema);
