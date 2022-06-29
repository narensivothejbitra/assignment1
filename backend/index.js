require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./db/mongoose")

const port = process.env.PORT || 5000
const userRouter = require("./routers/userRouter")
const postRouter = require("./routers/postRouter")


app.use("/user", userRouter)
app.use("/post", postRouter)


app.listen(port, () => {
    console.log(`Starting on ${port}`)
})