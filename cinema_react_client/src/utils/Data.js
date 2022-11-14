import axios from 'axios';

const getData = async (token) => {
    return await axios.get('http://localhost:4000/api/data/all', { headers: { "x-access-token": `${token}` } })
}

const getUsersData = async (token) => {
    return await axios.get('http://localhost:4000/api/admin/all', { headers: { "x-access-token": `${token}` } })
}

const postUser = async (UserToAdd, token) => {
    return await axios.post('http://localhost:4000/api/admin/add', { ...UserToAdd }, { headers: { "x-access-token": `${token}` } })
}

const editUser = async (UserToEdit, token) => {
    return await axios.put('http://localhost:4000/api/admin/edit', { ...UserToEdit }, { headers: { "x-access-token": `${token}` } })
}

const deleteUser = async (userID, token) => {
    return await axios.delete(`http://localhost:4000/api/admin/delete/${userID}`, { headers: { "x-access-token": `${token}` } })
}

const postMovie = async (MovieToAdd, token) => {
    return await axios.post('http://localhost:4000/api/movies/postMovie', { ...MovieToAdd }, { headers: { "x-access-token": `${token}` } })
}

const deleteMovie = async (MovieToDelete, token) => {
    return await axios.post('http://localhost:4000/api/movies/deleteMovie', { id: MovieToDelete }, { headers: { "x-access-token": `${token}` } })
}

const updateMovie = async (MovieToUpdate, token) => {
    return await axios.put('http://localhost:4000/api/movies/updateMovie', MovieToUpdate, { headers: { "x-access-token": `${token}` } })
}

const postSubscription = async (SubToPost, token) => {
    return await axios.post('http://localhost:4000/api/subscriptions/createsubscription', SubToPost, { headers: { "x-access-token": `${token}` } })
}

const putSubscription = async (SubToUpdate, token) => {
    return await axios.post('http://localhost:4000/api/subscriptions/updatesubscription', SubToUpdate, { headers: { "x-access-token": `${token}` } })
}

const postMember = async (memberToPost, token) => {
    return await axios.post('http://localhost:4000/api/members/postMember', memberToPost, { headers: { "x-access-token": `${token}` } })
}

const putMember = async (MemberToEdit, token) => {
    return await axios.post('http://localhost:4000/api/members/putMember', MemberToEdit, { headers: { "x-access-token": `${token}` } })
}

const deleteMember = async (memberToDel, token) => {
    return await axios.post('http://localhost:4000/api/members/deleteMember', { id: memberToDel }, { headers: { "x-access-token": `${token}` } })
}


    const api = { getData, getUsersData, postUser, editUser, deleteUser, postMovie, deleteMovie, updateMovie, postSubscription, putSubscription, postMember, putMember, deleteMember }
    export default api