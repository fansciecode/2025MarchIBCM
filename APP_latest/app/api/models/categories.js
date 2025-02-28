const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const catSchema = new Schema({
    catId: {
        type: String
    },
    catName: {
        type: String
    }
});
module.exports = mongoose.model('categories', catSchema)