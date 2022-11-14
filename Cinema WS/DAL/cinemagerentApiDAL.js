const axios = require('axios');

const getAll = ()=> {
    return axios.get('http://localhost:8000/api/subscriptions/getall')
}

const getStats = ()=> {
    return axios.get('http://localhost:8000/api/stats')
}

const sendSubs = (subsObj) => {
    return axios.post('http://localhost:8000/api/subscriptions/sendSub', subsObj).catch(err =>console.log(err))
}

const updateSubs = (subsObj) => {
    return axios.put('http://localhost:8000/api/subscriptions/updateSub', subsObj).catch(err =>console.log(err))
}

const postMovie = (movieToAdd) => {
    return axios.post('http://localhost:8000/api/movies/add', movieToAdd).catch(err =>console.log(err))
}

const deleteMovie = (movieToDelete) => {
    return axios.delete(`http://localhost:8000/api/movies/delete/${movieToDelete}`).catch(err =>console.log(err))
}

const editMovie = (movieToEdit) => {
    return axios.put(`http://localhost:8000/api/movies/update`, movieToEdit).catch(err =>console.log(err))
}

const postMember = (memberToPost) => {
    return axios.post('http://localhost:8000/api/members/add', memberToPost).catch(err =>console.log(err))
}

const putMember = (memberToEdit) => {
    return axios.put('http://localhost:8000/api/members/update', memberToEdit).catch(err =>console.log(err))
}

const deleteMember = (id) => {
    return axios.delete(`http://localhost:8000/api/members/delete/${id}`).catch(err =>console.log(err))
}

module.exports = {getAll,getStats,sendSubs,updateSubs,postMovie,deleteMovie,editMovie,postMember,putMember,deleteMember}