import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMember } from '../redux/appReducer';
import api from '../utils/Data'
function AddNewMember() {
  const [subToAdd, SetSubToAdd] = useState({ name: "", email: "", city: "" })
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  
  const sendDataToServer = async () => {

    //sending an api post req - to add the new movie data
    let response = await api.postMember({ ...subToAdd }, token)
    if (response.status === 200) {
      //add the new movie data to the redux global store
      dispatch(addMember({ ...subToAdd, _id: response.data }));
      navigate("/subscriptions/all")
    }

  }
  return (
    <div>Name: <input type="text" onChange={(e) => SetSubToAdd({ ...subToAdd, name: e.target.value })} />
      <br />
      Email: <input type="text" onChange={(e) => SetSubToAdd({ ...subToAdd, email: e.target.value })} />
      <br />
      City: <input type="text" onChange={(e) => SetSubToAdd({ ...subToAdd, city: e.target.value })} />
      <br />
      <button onClick={sendDataToServer}>Save</button>
      <button onClick={() => { navigate("/subscriptions/all") }}>Cancel</button>
    </div>
  )
}

export default AddNewMember