const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    type: {
        type: String,
        enum: ['happy', 'sad', 'exciting', 'scary'],
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
});

const Type = mongoose.model('Type', TypeSchema);
module.exports = Type;