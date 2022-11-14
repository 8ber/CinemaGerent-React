import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie } from '../redux/appReducer';
import api from '../utils/Data'
function AddMovie() {
  const storeData = useSelector(state => state.appReducer.data.dataFromApi)
  const [movieToAdd,SetMovieToAdd] = useState({name: "", genres: [], image: "", premiered: ""})
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const sendDataToServer = async ()=> 
  {
    //converting input fields data - to match the DB format
    let genres = movieToAdd.genres.split(",")
    let premiered = new Date(movieToAdd.premiered).toISOString();

    //sending an api post req - to add the new movie data
    let response = await api.postMovie({...movieToAdd, genres: genres, premiered: premiered}, token)
    if (response.status === 200)
    {
      //add the new movie data to the redux global store
      dispatch(addMovie({...movieToAdd, genres: genres, premiered: premiered, _id: response.data.postStatus}));
      navigate("/movies/all")
    }
    
  }
  return (
    <div>Name: <input type="text" onChange={(e)=>SetMovieToAdd({...movieToAdd, name: e.target.value})}/>
    <br/>
    Genres: <input type="text" onChange={(e)=>SetMovieToAdd({...movieToAdd, genres: e.target.value})}/>
    <br/>
    image url: <input type="text" onChange={(e)=>SetMovieToAdd({...movieToAdd, image: e.target.value})}/>
    <br/>
    Premiered: <input type="date" onChange={(e)=>SetMovieToAdd({...movieToAdd, premiered: e.target.value})}/>
    <br/>
    <button onClick={sendDataToServer}>Save</button>
    <button onClick={()=>{navigate("/movies/all")}}>Cancel</button>
    </div>
  )
}

export default AddMovie