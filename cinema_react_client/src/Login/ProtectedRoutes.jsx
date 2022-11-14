import { Outlet } from "react-router-dom";
import LoginComp from './LoginComp'

const ProtectedRoutes = (props) => {

 return props.NeedLogin ? <LoginComp SetNeedLogin={props.SetNeedLogin}/> : <Outlet /> 
}

export default ProtectedRoutes