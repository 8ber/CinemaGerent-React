import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/appReducer'
import api from '../utils/Data'
function AddUser() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    created_at: "",
    id: "",
    sessiontimeout: 60,
    permissions:
    {
      View_Subscriptions: false,
      Create_Subscriptions: false,
      Update_Subscriptions: false,
      Delete_Subscriptions: false,
      View_Movies: false,
      Create_Movies: false,
      Update_Movies: false,
      Delete_Movies: false
    }
  })

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  const sendDataToServer = async () => {

    //getting the current time user created - in MongoDb's format
    let timeNow = new Date().toISOString().slice(0,10);
    //getting array with the subscriptions as strings
    var UpdatedPermissions = []
    for (let item of Object.entries(user.permissions)) {
      if (item[1]) UpdatedPermissions.push(String(item[0]).replace("_", " "))
    }
    // sending an api post req - to add the new user data to the backend
    let response = await api.postUser({ ...user, created_at: timeNow.trim(0,10), permissions: UpdatedPermissions}, token)
    if (response.status === 200) {
        console.log(response.data)
      //add the new user to the redux global store
      dispatch(addUser({ ...user, id: response.data, created_at: timeNow, permissions: UpdatedPermissions}));
      navigate("/users/all")
    }
  }

  return (
    <>
      First Name: <input type="text" onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
      <br />
      Last Name: <input type="text" onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
      <br />
      User Name: <input type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <br />
      Session time out (Minutes): <br /><input type="number" onChange={(e) => setUser({ ...user, sessiontimeout: +e.target.value })} />
      <br />
      Permissions:
      <div style={{ textAlign: "left", width: "30%" }}>
        <input type="checkbox"
          onChange={(e) => {
            setUser({ ...user, permissions: { ...user.permissions, View_Subscriptions: !user.permissions.View_Subscriptions } })
          }}
          checked={user.permissions.View_Subscriptions}
        />View Subscriptions
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Subscriptions: true, Update_Subscriptions: !user.permissions.Update_Subscriptions } }) }}
          checked={user.permissions.Update_Subscriptions}
        />Update Subscriptions
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Subscriptions: true, Create_Subscriptions: !user.permissions.Create_Subscriptions } }) }}
          checked={user.permissions.Create_Subscriptions}
        />Create Subscriptions
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Subscriptions: true, Delete_Subscriptions: !user.permissions.Delete_Subscriptions } }) }}
          checked={user.permissions.Delete_Subscriptions}
        />Delete Subscriptions
        <br />
        <input type="checkbox"
          onChange={(e) => {
            setUser({ ...user, permissions: { ...user.permissions, View_Movies: !user.permissions.View_Movies } })
          }}
          checked={user.permissions.View_Movies}
        />View Movies
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Movies: true, Update_Movies: !user.permissions.Update_Movies } }) }}
          checked={user.permissions.Update_Movies}
        />Update Movies
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Movies: true, Create_Movies: !user.permissions.Create_Movies } }) }}
          checked={user.permissions.Create_Movies}
        />Create Movies
        <br />
        <input type="checkbox"
          onChange={(e) => { setUser({ ...user, permissions: { ...user.permissions, View_Movies: true, Delete_Movies: !user.permissions.Delete_Movies } }) }}
          checked={user.permissions.Delete_Movies}
        />Delete Movies
      </div>
      <button onClick={sendDataToServer}>Save</button>
      <button onClick={() => { navigate("/users/all") }}>Cancel</button>

    </>)
}

export default AddUser