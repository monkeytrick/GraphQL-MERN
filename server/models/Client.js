const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }
})

                                //First Variable is name by which the schema may be referenced
module.exports = mongoose.model('Client', ClientSchema)