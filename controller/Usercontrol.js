const validator = require("validator")
const bcrypt = require("bcrypt")
const userModel = require('../model/users')



const userController = {}

//add a new user
userController.login = async (req, res) => {
    //get the body incoming data
    let email = req.body.email
    let password = req.body.password

    //if there's no email
    if (!email) {
        return res.status(406).json({ status: false, message: "Email is required" })
    }

    if (!password) {
        return res.status(406).json({ status: false, message: "Password is required" })
    }

    //if the email is invalid
    if (!validator.isEmail(email)) {
        return res.status(406).json({ status: false, message: "Email is invalid" })
    }

    //if the passowrd is not minimum of 8ter
    if (password.length < 8) {
        return res.status(406).json({ status: false, message: "Password is invalid" })
    }

    //fetch the account data from the DB
    let getUser = await userModel.findOne({ email }).catch(e => ({ error: e }));

    
    //if error occur
    if (getUser && getUser.error) {
        return res.status(500).json({ status: false, message: "Oops! Somthing Went wrong!" })
    }
    getUser = getUser ? getUser.dataValues: null
    // console.log(getUser.dataValues, 'user');
    //if the data does not exists
    if (!getUser) {
        return res.status(404).json({ status: false, message: "Account not found" })
    }

    //check the password is it's correct
    if (!bcrypt.compareSync(password, getUser.password)) {
        return res.status(406).json({ status: false, message: "Invalid email or password" })
    }

    //rmove the password param
    delete getUser.password

    return res.status(200).json({ status: true, data: getUser })
};




userController.signup = async (req, res) => {
    //get the body incoming data
    let name = req.body.name ? req.body.name.trim() : ""
    let username = req.body.username ? req.body.username.trim() : ""
    let email = req.body.email ? req.body.email.trim() : ""
    let password = req.body.password ? req.body.password.trim() : ""

    //if there's no name
    if (!name) {
        return res.status(406).json({ status: false, message: "Name is required" })
    }

    let sName = name.trim().split(" ")

    //if the name contains invalid xter
    if (!/^[a-z\s\-]+$/i.test(name)) {
        return res.status(406).json({ status: false, message: "Name must be contain only alphabets" })
    }

    //if the name is too long
    if (name.length > 45) {
        return res.status(406).json({ status: false, message: "Name is too long" })
    }

    if (name.length < 4) {
        return res.status(406).json({ status: false, message: "First and last name too short" })
    }

    //if the name is not first and last name
    if (sName.length !== 2) {
        return res.status(406).json({ status: false, message: sName.length > 2 ? "Only first and last name needed" : "First and last name is required" })
    }

    //if there's no email
    if (!email) {
        return res.status(406).json({ status: false, message: "Email is required" })
    }

    if (!password) {
        return res.status(406).json({ status: false, message: "Password is required" })
    }

    //if the email is invalid
    if (!validator.isEmail(email)) {
        return res.status(406).json({ status: false, message: "Email is invalid" })
    }

    //if the passowrd is not minimum of 8ter
    if (password.length < 8) {
        return res.status(406).json({ status: false, message: "Password is invalid" })
    }

    //check the user name
    if (!username) {
        return res.status(406).json({ status: false, message: "Username is required" })
    }

    //if the name contains invalid xter
    if (!/^[a-z0-9]+$/i.test(username)) {
        return res.status(406).json({ status: false, message: "Username can only be alphanumberic. No space or special character is required" })
    }

    //if the username is too long
    if(username.length > 10){
        return res.status(406).json({ status: false, message: "Username too long. It cannot be more than 10 characters"})
    }

    let pashHash = bcrypt.hashSync(password,10)
    let OTP =String(Math.random()*9).replace(".","").substring(0,6)
    //fetch the account data from the DB
    let getUser = await userModel.create({ name,  username, email, reg_otp:OTP,
         password:pashHash }).catch(e => ({ error: e }));

    //if error occur
    if (getUser && getUser.error) {
        console.log(getUser.error);
        return res.status(500).json({ status: false, message: "Oops! Somthing Went wrong!" })
    }

    //if the data does not exists
    if (!getUser) {
        return res.status(404).json({ status: false, message: "Could not complete your request" })
    }

    return res.status(200).json({ status: true, data: {otp: getUser.reg_otp} })
}


module.exports = userController