const mongoose = require('mongoose');

mongoose.connect('mongodb://gamerdou_username:gamerdou_password@127.0.0.1:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
