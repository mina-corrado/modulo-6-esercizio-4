const express = require('express');
const router = express.Router();

const BlogPost = require('../models/BlogPost');
const Author = require('../models/Autore');


router.get('/blogPosts', async (req, res, next) => {
    const {page = '1', size = '4'} = req.query;
    const result = await BlogPost.find()
            .populate("author")
            .skip((Number(page)-1) * Number(size))
            .limit(Number(size));
    const count = await BlogPost.count();
    return res.json({count, results: result});
});

router.get('/blogPosts/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await BlogPost.findById(id).populate('comments', 'author');
        return res.json(result);
    } catch (error) {
        next(error)
    }
});

router.post('/blogPosts', async (req, res, next) => {
    const body = req.body;
    console.log(`body is `, body)
    try {
        const author = new Author({
            ...body.author
        });
        await author.save();
        const post = new BlogPost({
            category: body.category,
            title: body.title,
            cover: body.cover || 'https://placekitten.com/640/360',
            readTime: {
                value: body.readTime && body.readTime.value || 1,
                unit: "minuti"
            },
            author,
            content: body.content,
        });
        await post.save();
        // console.log('post ',post);
        return res.status(201).json(post);
    } catch (error) {
        next(error)
    }
});

router.put('/blogPosts/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const body = req.body;
        const {author, ...restBody} = body;
        let authorObj = Author.findById(author._id);
        if (authorObj) {
            // modifica
            await Author.updateOne({_id: author._id}, {...author});
        } 
        const post = await BlogPost.findById(id);
        const result = await BlogPost.updateOne({_id: post._id}, { ...restBody });

        return res.json(result)
    } catch (error) {
        next(error)
    }
});

router.delete('/blogPosts/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const post = await BlogPost.findByIdAndDelete(id)
        return res.json(post);
    } catch (error) {
        next(error)
    }
});

module.exports=router;