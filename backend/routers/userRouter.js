const express = require("express")
const User = require("../models/UserModel")
const router = express.Router()
const bcrypt = require("bcrypt")
router.post("/new", async (request, response) => {
    const salt = 10
    const hashPassword = await bcrypt.hash(request.body.password, salt)
    request.body.password = hashPassword;
    const userBody = request.body
    let user = new User({
        name: userBody.name,
        lastName: userBody.lastName,
        userName: userBody.userName,
        password: userBody.password,
        email: userBody.email
    })
    try {
        user = await user.save()
        if(!user) return response.send({errorMessage: "Error while creating user"})
        response.json(user)
    } catch (e) {
        response.send({errorMessage: "Internal server error", error: e})
    }
})

router.post('/login', async(request, response) => {
    const user = request.body
    try{
        const userInfo = await User.findOne({email: user.email})
        if(!userInfo) return response.send({errorMessage: "User not found following email"})
        const unhashedPassword = await bcrypt.compare(user.password, userInfo.password)
        if(!unhashedPassword) return response.send({errorMessage: "Password is incorrect"})
        response.json(userInfo)
    } catch (error) {
        response.send({errorMessage: "Server error", error})
    }
})

router.put("/edit:id", async (request, response) => {
    let id = request.params.id;
    try {
        let user = await User.findOne({_id: id})
        if(!user) return response.status(404).send({ message: `User not found`})
        user = request.body;
        user.save()
        response.send({ errorMessage: "Updated successfully", user})
    } catch (e) {
        response.send({ errorMessage: "Internal server error", error: e})
    }
})

router.delete("/delete:id", async(request, response) => {
    let id = request.params.id
    try {
        const user = await User.deleteOne({_id: id})
        if(!user) return response.send({errorMessage: "User not found"})
        response.status(200).send("Deleted successfully")
    } catch(e) {
        response.send({errorMessage: "Internal error while deleting user"})
    }

})

router.get("/all", async(request, response) => {
    try{
        const user = await User.find()
        if(!user) return response.send({ errorMessage: "Users not found" })
        response.send(user)
    } catch(e) {
        response.send({ errorMessage: "Internal error"})
    }
})

module.exports = router;