const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    // address:{
    //     type:String,
    //     required:true,
    //  },
    //  answer:{type:String,required:true},
    role: {
        type: Number,
        default: 0
    },
    subscription: {

        planDuration: {
            type: String
        },
        type_of_subscription: {
            type: String,
        },
        planStatus: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date
        },
        expired_at: {
            type: Date
        }

    }

}, { timestamp: true })
module.exports = mongoose.model('users', userSchema)