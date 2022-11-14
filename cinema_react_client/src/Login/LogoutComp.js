import { useNavigate } from 'react-router-dom'
function LogoutComp(props) {
  const nav = useNavigate()
  localStorage.removeItem("token");
  localStorage.removeItem("time");  
  nav("/")
}

export default LogoutComp