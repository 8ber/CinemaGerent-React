const userModel = require('../models/usersModel')
const usersDAL = require('../DAL/usersDAL')
const permissionsDAL = require('../DAL/permissionsDAL')
const jwt = require('jsonwebtoken')

// creating a random cryptographic key ("Secret") that is unique to the server
// inorder to use it in the JWT handshake

// require('crypto').randomBytes(64).toString('hex') -> using NodeJS inbuild model
var Secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611"

const login = (obj) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ username: obj.username }, (err, data) => {
            //cannot find the username in the DB
            if (!data) reject("Unknown username: " + obj.username)
            //error from the DB
            else if (err) console.log("this is login error" + err)
            else {
                //if theres no error, and the user is found - match his password too
                if (data.password === obj.password) resolve({ loginStatus: true, id: data._id.toString() })
                else reject("Login attempt failed.") //Wrong password.
            }
        })
    })
}

// checks if the user is found in the DB & if he is mutable
// to protect editing of users
const checkUser = (obj) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ username: obj.username, mutable: true }, (err, data) => {
            console.log(data)
            if (!data) reject("Username " + obj.username + " cannot be found.") //No user found or user is not mutable(allready picked a password)
            else if (data.mutable) resolve(true)
            else if (err) console.error(err)
        })
    })
}

// Saves the new password by updating the DB + mutable status to false.
const storePassword = (obj) => {
    return new Promise((resolve) => {
        userModel.findOneAndUpdate({ username: obj.username }, { password: obj.password, mutable: false }, (err) => {
            if (err) console.error(err)
            else resolve(true)
        })
    })
}

// a func to get -ALL(combined)- data from the jFiles about the user - via his ID(available using the login function)
const getUserData = async (id) => {
    let userInfo = await usersDAL.getUser(id);
    let userPermissions = await permissionsDAL.getUserPermissions(id)
    return { ...userInfo, permissions: userPermissions.permissions };
}


// signing a JWT
const signToken = async (id) => {
    let user = await usersDAL.getUser(id);
    return jwt.sign({ id: id }, Secret, { expiresIn: String(user.sessiontimeout) + "m" });
}

// validate a JWT using an express middleware function
const validateToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, Secret, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    else res.sendStatus(401);
};

module.exports = { login, checkUser, storePassword, getUserData, signToken, validateToken }