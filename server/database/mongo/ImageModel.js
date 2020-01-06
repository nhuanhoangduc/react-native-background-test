const mongoose = require('./connection');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    imageUrl: String,
    hash: String,
});


module.exports = mongoose.model('images', imageSchema);
