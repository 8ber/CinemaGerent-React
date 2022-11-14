const membersDAL = require(`../DAL/membersWS`)
const membersModel = require(`../models/membersModel`)

const moviesDAL = require(`../DAL/moviesWS`)
const moviesModel = require(`../models/moviesModel`)

// When the server launches, it will stock the pre-made DB collections with
// the required data from the API's using a data access layer (DAL).


//getting members data
membersDAL.getMembers().then(async (data) => 
{
    var members = await data.data.map((x)=> {
        return {"name" : x.name,"email": x.email ,"city" : x.address.city}})
    await members.forEach(member =>{
        membersModel({
            "name" : member.name,
            "email" : member.email,
            "city" : member.city
        }).save((err)=>{
            if (err) reject(err)
        })
    })
})

//getting movies/series data
moviesDAL.getMovies().then(async (data) => 
{
    var movies = await data.data.map((x)=> {
        return {"name" : x.name,"genres": x.genres ,"image" : x.image.original, "premiered" : x.premiered}
    })
    await movies.forEach(movie =>{
        moviesModel({
            "name" : movie.name,
            "genres" : movie.genres,
            "image" : movie.image,
            "premiered" : movie.premiered
        }).save((err)=>{
            if (err) reject(err)
        })
    })
})
