const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017/realestate-management", {useNewUrlParser: true})
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error, "mongoose error"))


module.exports = mongoose;