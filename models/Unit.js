const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String } = Schema.Types


const unitSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model("Unit", unitSchema);