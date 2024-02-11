const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a blog title"]
        },
        author: {
            type: String,
            required: [true, "Please enter a blog author"],
        },
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;