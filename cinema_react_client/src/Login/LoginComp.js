import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userinfo, timeElapsed, dataFromApi, ManageUsersData } from '../redux/appReducer';
import auth from '../utils/Auth';
import api from '../utils/Data';

function LoginComp({ SetNeedLogin }) {
  //setting up mutable information - to store in state
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [Error, SetError] = useState("");

  //SPA navigation and redux action functions
  const dispatch = useDispatch();

  //function to be called when the user clicks the login button
  const LoginAttempt = async () => {
    try {
      var response = await auth.login(Username, Password);
    }
    catch (error) {
      SetError({ status: error.response.status, text: error.response.data })
    }
    const token = response.data.token;
    if (token) {
      //grabbing the current time using js Date obj
      var loginTimeStamp = new Date();

      //storing the token and time stamp in localStorage
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('time', JSON.stringify(loginTimeStamp));

      //updating the redux store
      dispatch(timeElapsed(false));
      console.log("updated time elapsed - logincomp")
      //Further API call to get user info & data
      try {
        let userInfo = await auth.getUserInfo(token);
        dispatch(userinfo(userInfo.data));
        console.log("updated userinfo - logincomp")

        var allData = await api.getData(token);
        dispatch(dataFromApi(allData.data))
        console.log("updated dataFromApi - logincomp")

        if (userInfo.data.admin)
        {
          let allUsersData = await api.getUsersData(token);
          dispatch(ManageUsersData(allUsersData.data))
          console.log("updated ManageUsersData - Hey mr.admin! - logincomp")
        }
      }
      catch (error) {
        console.error("Error from loginComp:" + error)
      }
      SetNeedLogin(false);
      console.log("changing NeedLogin State to false - logincomp")
    }
  }
  return (
    <center>
      <label htmlFor="Username">Username</label> : <input type="text"
        onChange={(e) => { SetUsername(e.target.value) }} />
      <br />
      <label htmlFor="Password">Password</label> : <input type="password"
        onChange={(e) => { SetPassword(e.target.value) }} />
      <br />
      <button onClick={LoginAttempt}>Login</button>
      <br />
      <br />
      Not a member? <Link to="/register">Click here</Link>.
      <br />
      {Error ? <span><br />Error: [{Error.status}] - {Error.text}</span> : null}    </center>
  );
}

export default LoginComp;