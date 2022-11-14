import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import auth from '../utils/Auth'

function RegisterComp() {
  const [Username, SetUsername] = useState("")
  const [Password, SetPassword] = useState("")
  const [Error, SetError] = useState("")
  const navigate = useNavigate();

  const createAccount = async () => {
    try { var response = await auth.registerAccount(Username, Password); }
    catch (error) {
      SetError({ status: error.response.status, text: error.response.data })
    }
    if (response.status === 201) {
      navigate("/")
    }
  }
  return (
    <div>
      <label htmlFor="username">Username</label>:
      <input type="text" 
      placeholder="as issued by the admin.."
      onChange={(e)=>SetUsername(e.target.value)} />
      <br />
      <label htmlFor="password">Password</label>:
      <input type="password" 
      onChange={(e)=>SetPassword(e.target.value)} />
      <br />
      <button onClick={createAccount}>Create</button>
      {Error ? <span><br />Error: [{Error.status}] - {Error.text}</span> : null}
      <p>*Notice: if you dont have a username - please content
        administrator@blah.com</p>
    </div>
  )
}

export default RegisterComp