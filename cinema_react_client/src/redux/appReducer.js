import { createSlice } from "@reduxjs/toolkit";
export const appReducer = createSlice({
    name: "Reducer",
    initialState:
    {
        data: { timeElapsed: false, userinfo: {}, dataFromApi: {} }
    },
    reducers:
    {
        timeElapsed: (state, action) => {
            return { data: { userinfo: state.data.userinfo, dataFromApi: state.data.dataFromApi, timeElapsed: action.payload } }
        },
        dataFromApi: (state, action) => {
            return { data: { userinfo: state.data.userinfo, timeElapsed: state.data.timeElapsed, dataFromApi: action.payload } }
        },
        ManageUsersData: (state, action) => {
            return { data: { userinfo: state.data.userinfo, timeElapsed: state.data.timeElapsed, dataFromApi: {...state.data.dataFromApi, users: action.payload} } }
        },
        removeUser: (state, action) => {
            state.data.dataFromApi.users.splice(state.data.dataFromApi.users.findIndex(user=>user.id === action.payload),1)
        },
        addUser: (state, action) => {
            let user = action.payload
            state.data.dataFromApi.users.push(user)
        },
        editUser: (state, action) => {
            state.data.dataFromApi.users.splice(state.data.dataFromApi.users.findIndex(u => u.id === action.payload.id), 1, action.payload)
        },
        userinfo: (state, action) => {
            return { data: { timeElapsed: state.data.timeElapsed, dataFromApi: state.data.dataFromApi, userinfo: action.payload } }
        },
        addMovie: (state, action) => {
            let movieToAdd = action.payload;
            state.data.dataFromApi.movies.push(movieToAdd)
        },
        updateMovie: (state, action) => {
            state.data.dataFromApi.movies.splice(state.data.dataFromApi.movies.findIndex(mov => mov._id === action.payload._id), 1, action.payload)
        },
        removeMovie: (state, action) => {
            state.data.dataFromApi.movies.splice(state.data.dataFromApi.movies.findIndex(mov => mov._id === action.payload.movieid), 1)
        },
        addMember: (state, action) => {
            let subToAdd = action.payload;
            state.data.dataFromApi.members.push(subToAdd)
        },
        removeMember: (state, action) => {
            state.data.dataFromApi.members.splice(state.data.dataFromApi.members.findIndex(member=> member._id === action.payload.id), 1)
        },
        editMember: (state, action) => {
            let member = state.data.dataFromApi.members.find(mem => mem._id === action.payload._id)
            member._id = action.payload._id
            member.email = action.payload.email
            member.city = action.payload.city
            member.name = action.payload.name
        },
        updateSubscription: (state, action) => {
            let Member = state.data.dataFromApi.subscriptions.find(member => member.memberid === action.payload.memberid)
            if (Member) {
                Member.movies.push({ movieid: action.payload.movieid, date: action.payload.date })
            }
        },
        createSubscription: (state, action) => {
            state.data.dataFromApi.subscriptions.push(action.payload)
        }
    }
})
export const { timeElapsed, userinfo, dataFromApi, ManageUsersData, removeUser, addUser, editUser, removeMovie, addMovie, updateMovie, addMember, removeMember, editMember, updateSubscription, createSubscription } = appReducer.actions
export default appReducer.reducer