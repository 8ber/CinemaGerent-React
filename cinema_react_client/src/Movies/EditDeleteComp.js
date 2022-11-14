import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeMovie } from '../redux/appReducer';
import api from '../utils/Data'
function EditDeleteComp(props) {
  const token = JSON.parse(localStorage.getItem("token"));
  const storeData = useSelector(state => state.appReducer.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <br />
      {
        //link to EditMovie page
        storeData.userinfo.permissions.includes("Update Movies") && <button onClick={() => { navigate(`/movies/edit/${props.movieID}`) }}>Edit</button>
      }

      {
        //calls to a function to delete the movie from the database including from the subscriptions watched movies list + the client side redux store

        storeData.userinfo.permissions.includes("Delete Movies") && 
        <button onClick={
          async () => {
            let response = await api.deleteMovie(props.movieID,token)
            if(response.data.deleted) dispatch(removeMovie(props.movieID));
          }}>
            Delete
            </button>
      }
    </>
  )
}

export default EditDeleteComp