// MODULES
const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blogModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// CREATE A BLOG
app.post('/blogs', async(req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(200).json(blog)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// GET ALL BLOGS
app.get('/blogs', async(req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// GET BLOG BY ID
app.get('/blogs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// UPDATE BY ID
app.put('/blogs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if(!blog) {
            return res.status(404).json({message: 'blog does not exist'});
        }
        const updatedBlog = await Blog.findById(id);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// DELETE BY ID
app.delete('/blogs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog) {
            return res.status(404).json({message: 'blog does not exist'})
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// CONNECT TO DATABASE
mongoose.connect('mongodb://localhost:27017/CRUD')
.then(() => {
    console.log('connected to database')
    app.listen(3000, () => {
        console.log('app is running on port 3000')
    });
})
.catch((error) => {
    console.error('Error connecting', error)
});