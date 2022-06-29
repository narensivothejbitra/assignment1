const express = require("express")
const router = express.Router();
const Post = require("../models/PostModel")

router.post("/new", async(request, response) => {
    const postBody = request.body
    let post = new Post({
        title: postBody.title,
        content: postBody.content,
        categoryName: postBody.categoryName,
        hashtag: postBody.hashtag,
        author: postBody.author
    })
    try {
        post = await post.save()
        if(!post) return response.send({errorMessage: "Error while creating post"})
        response.send({errorMessage: "Successfully created post", post})
    } catch (e) {
        response.send({errorMessage: "Internal error", error: e})
    }
})

router.put("/edit:id", async(request, response) => {
    let _id = request.params.id;
    try {
        const update = request.body
        const post = await Post.findOneAndUpdate(_id, {
            title: update.title,
            content: update.content,
            categoryName: update.categoryName,
            hashtag: update.hashtag,
            author: update.author

        })
        if(!post) {
            return response.send({errorMessage: "Error while updating post"})
        }
        response.send({errorMessage: "Successfully updated post", post})
    } catch(error) {
        response.send(error)
    }
})

router.delete("/delete:id", async(request, response) => {
    const _id = request.params.id
    try {
        const post = await Post.deleteOne(_id)
        if(!post) return response.send({errorMessage: "Post not found"})
        response.send({errorMessage: "Deleted successfully"})
    } catch(e) {
        response.send({ errorMessage: "Internal server error"})
    }
})

router.get("/all", async(request, response) => {
    try {
        const post = await Post.find()
        if(!post) return response.send("Post not found")
        response.send({errorMessage: "Posts found", post})
    } catch (e) {
        response.send({errorMessage: "internal error", error: e})
    }
})

module.exports = router;