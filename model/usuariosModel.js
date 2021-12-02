const { Schema, model } = require('mongoose')

const usuarios3 = new Schema({
    fullName: {
        type: String,
        unique: true,
        required: true,
    },
    identification: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
module.exports = model('usuarios3', usuarios3, "usuarios3")