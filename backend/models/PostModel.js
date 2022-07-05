const mongoose = require("../db/mongoose")
const {Schema} = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    categoryName: {
        type: String
    },
    hashtag: {
        type: String
    },
    author: {type: Schema.Types.ObjectId, ref: "User"}
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;