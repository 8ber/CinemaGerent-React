import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../redux/appReducer';
import api from '../utils/Data'
function EditDeleteComp(props) {
  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      {
         <button onClick={() => { navigate(`/users/edit/${props.id}`) }}>Edit</button>
      }

      {
        <button onClick={
          async () => {
            let response = await api.deleteUser(props.id,token)
            if(response.status === 200) dispatch(removeUser(props.id));
          }}>
            Delete
            </button>
      }
    </>
  )
}

export default EditDeleteComp