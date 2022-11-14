import axios from 'axios';
const login = async (Username, Password) => {
    return await axios.post("http://localhost:4000/api/auth/login",{"username" : Username, "password" : Password})
}

const getUserInfo = async (token) => {
    return await axios.get('http://localhost:4000/api/auth/userinfo', { headers: {"x-access-token" : `${token}`} })
}

const registerAccount = async (Username, Password) => {
    return await axios.post("http://localhost:4000/api/auth/register",{"username" : Username, "password" : Password})
}


const auth = {login,getUserInfo,registerAccount}
export default auth