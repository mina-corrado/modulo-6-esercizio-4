/*
– GET /blogPosts/:id/comments => ritorna tutti i commenti di uno specifico post
– GET /blogPosts/:id/comments/:commentId=> ritorna un commento specifico di un post specifico
– POST /blogPosts/:id => aggiungi un nuovo commento ad un post specifico
– PUT /blogPosts/:id/comment/:commentId => cambia un commento di un post specifico
– DELETE /blogPosts/:id/comment/:commentId=>elimina un commento specifico da un post specifico
*/
const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

router.get('/blogPosts/:id/comments', async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await BlogPost.findById(id).populate("comments");
        return res.json(result.comments);
    } catch (error) {
        next(error)
    }
});

router.get('/blogPosts/:id/comments/:commentId', async (req, res, next) => {
    const {id, commentId} = req.params;
    console.log("id commid ", id, commentId);
    try {
        const result = await BlogPost.findOne( {_id: id } )
                        .populate("comments");
        const comment = result.comments.filter((comment)=>comment._id == commentId)[0];
        return res.json(comment);
    } catch (error) {
        next(error)
    }
});

router.post('/blogPosts/:id/comments', async (req, res, next) => {
    const {id} = req.params;
    const body = req.body;
    try {
        const comment = new Comment({
            title: body.title,
            author: {
                name: body.author && body.author.name || 'Mina Corrado',
                avatar: body.author && body.author.avatar || 'https://ui-avatars.com/api/?name=Mina+Corrado',
            },
            content: body.content,
            blogpost: id,
        });
        await comment.save();
        await BlogPost.updateOne({_id: id}, {$push: {comments: comment}});
        return res.json(comment);
    } catch (error) {
        next(error)
    }
});

router.put('/blogPosts/:id/comments/:commentId', async (req, res, next) => {
    const {id, commentId} = req.params;

    console.log("id commid ", id, commentId);
    try {
        const body = req.body;

        const comment = await Comment.updateOne({_id: commentId}, {...body});
 
        await BlogPost.updateOne(
            {_id: id, comments: { $elemMatch: { _id: commentId } }}, 
            {$set:  comment});
        
        return res.json(comment);

    } catch (error) {
        next(error)
    }
});

router.delete('/blogPosts/:id/comments/:commentId', async (req, res, next) => {
    const {id, commentId} = req.params;
    try {
        await BlogPost.updateOne({_id: id}, {$pull: {comments: commentId}});
        const comment = await Comment.findByIdAndDelete(commentId);
        return res.json(comment);
    } catch (error) {
        next(error)
    }
});

module.exports = router;