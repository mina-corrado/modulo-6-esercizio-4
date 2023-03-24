const mongoose = require('mongoose');

const blogpostSchema = new mongoose.Schema({
    category: String,
    title: {type: String, required: true},
    cover: String,
    readTime: {
        value: Number,
        unit: String
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Autore"},
    content: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model('Blogpost', blogpostSchema);