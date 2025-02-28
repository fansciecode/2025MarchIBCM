const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/IBCM';

mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
