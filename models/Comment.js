const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {
        name: String,
        avatar: String,
    },
    content: {type: String, required: true},
    blogpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
    }
});

module.exports = mongoose.model('Comment', commentSchema);