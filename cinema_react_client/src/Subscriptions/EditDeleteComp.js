import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeMember } from '../redux/appReducer';
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
        //link to EditSub page
        storeData.userinfo.permissions.includes("Update Subscriptions") && <button onClick={() => { navigate(`/subscriptions/edit/${props.memberID}`) }}>Edit</button>
      }

      {
        //calls to a function to delete the member from the database including from the subscriptions watched movies list + the client side redux store

        storeData.userinfo.permissions.includes("Delete Subscriptions") && 
        <button onClick={
          async () => {
            let response = await api.deleteMember(props.memberID,token)
            if(response.status === 200) 
            {
              dispatch(removeMember({id: props.memberID}));
            }
          }}>
            Delete
            </button>
      }
    </>
  )
}

export default EditDeleteComp