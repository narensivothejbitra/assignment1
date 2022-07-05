const express = require("express")
const router = express.Router()
const {signUpUser, loginAccount, editAccount, deleteAccount, getAllAccounts} = require("../models/UserModel");
router.post("/new", signUpUser)

router.post('/login', loginAccount)

router.put("/edit:id", editAccount)

router.delete("/delete:id", deleteAccount)

router.get("/all", getAllAccounts)

module.exports = router;