const userModel = require('../models/usersModel')
const usersDAL = require('../DAL/usersDAL')
const permissionsDAL = require('../DAL/permissionsDAL')
const jFile = require('jsonfile')


//CRUD operations - exports as services.
const getUsers = async () => 
{
    let dbInfo = await userModel.find({});
    dbInfo.shift();
    let usersInfo = await usersDAL.getAllUsers();
    usersInfo.shift();
    let usersPermissions  = await permissionsDAL.getAll();
    usersPermissions.shift();
    let users = [];
    //all arrays have same length. they are arranged at the same order because the creation is at the same time (default entreis so the server wont crash - NO ? OPTIONAL CHAINING USED!) => the arrays share the same index for the same user.
    usersInfo.forEach((user,index) => {
        users.push({...user,permissions: usersPermissions[index].permissions, username: dbInfo[index].username})
    })
    return users;
}
const getUser = async (id) => 
{
    let userDbInfo = await userModel.findById(id);
    let userInfo = await usersDAL.getUser(id);
    let userPermissions  = await permissionsDAL.getUserPermissions(id);
    return {...userInfo, permissions: userPermissions.permissions, mutable: userDbInfo.mutable}
}
const updateUser = async (userObj) => 
{
    await userModel.findOneAndUpdate({_id: userObj.id}, userObj);
    await updateUserInUsersJSON(userObj);
    await updateUserInPermissionsJSON(userObj);
}
const addUser = async (userObj) => 
{
    //creation in the usersDB 
    let userID = await new Promise((resolve, reject) => {
        let user = userModel({username: userObj.username, mutable: true, password: ""})
        user.save((err)=>{
            if (err) reject(err)
            else resolve(user._id)
        })
    })    
    //creation in users.json 
    let usersJSON = await usersDAL.getAllUsers();
    usersJSON.push({id: userID, firstname: userObj.firstname, lastname: userObj.lastname, created_at: userObj.created_at, sessiontimeout : userObj.sessiontimeout})
    await usersDAL.saveAll(usersJSON);
    //creation in permissions.json 
    let PermissionsJSON = await permissionsDAL.getAll();
    PermissionsJSON.push({id: userID, permissions: userObj.permissions})
    await permissionsDAL.saveAll(PermissionsJSON);
    return userID;
}
const deleteUser = async (id) => 
{
    await userModel.findOneAndDelete({_id: id});
    await deleteUserInUsersJSON(id);
    await deleteUserInPermissionsJSON(id);
}


//Assistive functions - Not exported
const updateUserInPermissionsJSON = async (userToUpdate) => {
    let permissions = await new Promise((resolve, reject) => {
        jFile.readFile("./DAL/permissions.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
    let index = permissions.permissions.findIndex(user => user.id === userToUpdate.id)
    if (index >= 0)
    {
        permissions.permissions[index].permissions = userToUpdate.permissions;
    }
    return new Promise((resolve, reject) => {
        jFile.writeFile("./DAL/permissions.json", permissions, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
} 
const deleteUserInPermissionsJSON = async (id) => {
    let permissions = await new Promise((resolve, reject) => {
        jFile.readFile("./DAL/permissions.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
    let index = permissions.permissions.findIndex(user => user.id === id)
    if (index >= 0)
    {
        permissions.permissions.splice(index, 1)
    }
    return new Promise((resolve, reject) => {
        jFile.writeFile("./DAL/permissions.json", permissions, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
} 
const updateUserInUsersJSON = async (userToUpdate) => {
    let users = await new Promise((resolve, reject) => {
        jFile.readFile("./DAL/users.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
    let index = users.users.findIndex(user => user.id === userToUpdate.id)
    if (index >= 0)
    {
        users.users[index].firstname = userToUpdate.firstname;
        users.users[index].lastname =  userToUpdate.lastname;
        users.users[index].sessiontimeout = userToUpdate.sessiontimeout;
    }
    return new Promise((resolve, reject) => {
        jFile.writeFile("./DAL/users.json", users, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
} 
const deleteUserInUsersJSON = async (id) => {
    let users = await new Promise((resolve, reject) => {
        jFile.readFile("./DAL/users.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
    let index = users.users.findIndex(user => user.id === id)
    if (index >= 0)
    {
        users.users.splice(index, 1)
    }
    return new Promise((resolve, reject) => {
        jFile.writeFile("./DAL/users.json", users, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    }) 
} 
module.exports = {getUsers, getUser, updateUser, addUser, deleteUser}