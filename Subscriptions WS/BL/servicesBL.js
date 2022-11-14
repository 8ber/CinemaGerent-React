const membersModel = require(`../models/membersModel`)
const moviesModel = require(`../models/moviesModel`)
const subscriptionsModel = require(`../models/subscriptionsModel`)

//CRUD services for movies
const getMovies = async () => {
    let allMovies = await moviesModel.find({})
    return allMovies
}

const updateMovie = async (movToUpdate) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndUpdate(movToUpdate._id, {
            "_id": movToUpdate._id,
            "name": movToUpdate.name,
            "geners": movToUpdate.geners,
            "image": movToUpdate.image,
            "premiered": movToUpdate.premiered
        }, (err) => {
            if (err) reject(err)
            else resolve(`${movToUpdate._id}`)
        })
    })
}

const addMovie = async (movToAdd) => {
    return new Promise((resolve, reject) => {
        let movie = moviesModel({
            "name": movToAdd.name,
            "genres": movToAdd.genres,
            "image": movToAdd.image,
            "premiered": movToAdd.premiered
        });
        movie.save((err) => {
            if (err) reject(err)
            else resolve(`${movie._id}`)
        })
    })
}

const deleteMovie = async (id) => {
    allSubs = await getSubscriptions();
    let subsToDel = allSubs.filter(sub => sub.movieid == id)
    await delFromSubscriptions(subsToDel);

    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndDelete(id, (err) => {
            if (err) reject(err)
            else resolve({ deleted: `${id}` })
        })
    })
}


//CRUD services for subscriptions
const getSubscriptions = async () => {
    let allSubscriptions = await subscriptionsModel.find({})
    return allSubscriptions
}

const createSubs = (newSubObj) => {
    return new Promise((resolve, reject) => {
        let sub = subscriptionsModel({
            "memberid": newSubObj.memberid,
            "movies": [...newSubObj.movies]
        });
        sub.save((err) => {
            if (err) reject(err)
            else resolve(`${sub._id}`)
        })
    })
}

const updateSub = async (SubObj) => {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findByIdAndUpdate(SubObj._id, {
            "_id": SubObj._id,
            "memberid": SubObj.memberid,
            "movies": [...SubObj.movies]
        }, (err) => {
            if (err) reject(err)
            else resolve(`${SubObj._id}`)
        })
    })
}

const delFromSubscriptions = async (arrToDel) => {
    await arrToDel.forEach(async id => { await subscriptionsModel.findOneAndDelete({ "_id": id._id }) })
}

//CRUD services for members
const getMembers = async () => {
    let allMembers = await membersModel.find({});
    return allMembers;
}

const addMember = async (memToAdd) => {
    return new Promise((resolve, reject) => {
        let member = membersModel({
            "name": memToAdd.name,
            "email": memToAdd.email,
            "city": memToAdd.city
        });
        member.save((err) => {
            if (err) reject(err)
            else resolve(`${member._id}`)
        })
    })
}

const updateMember = async (memToUpdate) => {
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndUpdate(memToUpdate._id, {
            "_id": memToUpdate._id,
            "name": memToUpdate.name,
            "email": memToUpdate.email,
            "city": memToUpdate.city,
        }, (err) => {
            if (err) reject(err)
            else resolve(`${memToUpdate._id}`)
        })
    })
}

const deleteMember = async (id) => {
    allSubs = await getSubscriptions();
    let subsToDel = allSubs.filter(sub => sub.memberid.toString() == id)
    await delFromSubscriptions(subsToDel);

    return new Promise((resolve, reject) => {
        membersModel.findByIdAndDelete(id, (err) => {
            if (err) reject(err)
            else resolve(`${id}`)
        })
    })
}


//Server side stats
const getStats = async () => {

    let stats = {}
    let numOfMovies = await getMovies()
    let numOfMembers = await getMembers()
    let numOfSubscriptions = await getSubscriptions()

    return { numOfMovies: numOfMovies.length, numOfMembers: numOfMembers.length, numOfSubscriptions: numOfSubscriptions.length }
}

module.exports = { getSubscriptions, getMovies, getMembers, getStats, updateMovie, addMovie, deleteMovie, createSubs, updateSub, addMember, updateMember, deleteMember }
