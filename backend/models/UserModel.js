const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model("User", userSchema)

const signUpUser = async (request, response) => {

    const hashPassword = await bcrypt.hash(request.body.password, 10)

    const userBody = request.body
    let user = new User({
        name: userBody.name,
        lastName: userBody.lastName,
        userName: userBody.userName,
        password: hashPassword,
        email: userBody.email
    })
    try {
        user = await user.save()
        if(!user) return response.send({errorMessage: "Error while creating user"})
        response.json(user)
    } catch (e) {
        response.send({errorMessage: "Internal server error", error: e})
    }
}

const loginAccount = async(request, response) => {
    const user = request.body
    try{
        const userInfo = await User.findOne({email: user.email})
        if(!userInfo) return response.status(404).send({errorMessage: "User not found following email"})
        const unhashedPassword = await bcrypt.compare(user.password, userInfo.password)
        if(!unhashedPassword) return response.status(500).send({errorMessage: "Password is incorrect"})
        response.json(userInfo)
    } catch (error) {
        response.status(500).send({errorMessage: "Server error", error})
    }
}

const editAccount = async (request, response) => {
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
}

const deleteAccount = async(request, response) => {
    let id = request.params.id
    try {
        const user = await User.deleteOne({_id: id})
        if(!user) return response.send({errorMessage: "User not found"})
        response.status(200).send("Deleted successfully")
    } catch(e) {
        response.send({errorMessage: "Internal error while deleting user"})
    }

}

const getAllAccounts = async(request, response) => {
    try{
        const user = await User.find()
        if(!user) return response.send({ errorMessage: "Users not found" })
        response.send(user)
    } catch(e) {
        response.send({ errorMessage: "Internal error"})
    }
}

module.exports = {signUpUser, loginAccount, editAccount, deleteAccount, getAllAccounts};