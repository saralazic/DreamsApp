const mongoose = require('mongoose');


let Type = require('../models/type.model')

const Schema = mongoose.Schema;

const DreamSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    }
}, {
    timestamps: true
});


const Dream = mongoose.model('Dream', DreamSchema);
module.exports = Dream;