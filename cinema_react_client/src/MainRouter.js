import React, { useEffect, useState, useCallback } from 'react'
//redux imports
import { useDispatch, useSelector } from 'react-redux'
import { userinfo, dataFromApi, ManageUsersData } from './redux/appReducer';
//routing imports
import { Routes, Route } from 'react-router-dom'
//utils imports
import auth from './utils/Auth';
import api from './utils/Data';
//Components imports
import TimerComp from './Timer/TimerComp'
import LogoComp from './Structure/LogoComp'
import NavbarComp from './Structure/NavbarComp'
import LoginComp from './Login/LoginComp'
import RegisterComp from './Login/RegisterComp'
import GateComp from './GateComp'
import ProtectedRoutes from './Login/ProtectedRoutes';
import MoviesNavbarComp from './Movies/MoviesNavbarComp';
import MoviesComp from './Movies/Movies'
import AddMovie from './Movies/AddMovie'
import EditMovie from './Movies/EditMovie'
import SubsNavbarComp from './Subscriptions/SubsNavbarComp';
import AddNewMember from './Subscriptions/AddNewMember';
import EditMember from './Subscriptions/EditMember'
import SubscriptionsComp from './Subscriptions/Subscriptions'
import UserNavbarComp from './Users/UserNavbarComp'
import UsersComp from './Users/Users'
import AddUser from './Users/AddUser'
import EditUser from './Users/EditUser';
import LogoutComp from './Login/LogoutComp';
function MainRouter() {

    //listening to the redux global store & setting reducer dispatch 
    const storeData = useSelector(state => state.appReducer.data)
    const dispatch = useDispatch();
    //a state to determine if a user needs to login
    const [NeedLogin, SetNeedLogin] = useState(true);

    //using memoization to cache the function (so it will not be created again and cause re-render)
    //a function to check if theres pre-existing token in localStorage
    const isTokenExists = useCallback(async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            //if theres a token available - check it by sending an API call to verify user personal info
            let response = await auth.getUserInfo(token);
            if (response.status === 200) {
                dispatch(userinfo(response.data));
                let allData = await api.getData(token);
                dispatch(dataFromApi(allData.data));
                if (response.data.admin) {
                    let allUsersData = await api.getUsersData(token);
                    dispatch(ManageUsersData(allUsersData.data))
                }
                SetNeedLogin(false);
            }
            else {
                //the token is expired - no "OK" from the server
                localStorage.removeItem("token", "time");
                SetNeedLogin(true)
            }
        }
        else SetNeedLogin(true); //there is no token available in localStorage
    }, [dispatch]);

    useEffect(() => { isTokenExists() }, [isTokenExists])

    //checking if the usage timer expires - forces user to re-login
    useEffect(() => {
        if (storeData.timeElapsed) {
            localStorage.removeItem("token");
            localStorage.removeItem("time");
            SetNeedLogin(true);
        }
    }, [storeData.timeElapsed])

    return (
        <center>
            <LogoComp />
            Hello {!NeedLogin ? storeData.userinfo.firstname : <>shady user</>}.<br/>
            {localStorage.getItem("time") && !storeData.timeElapsed ? <TimerComp sessiontimeout={storeData.userinfo.sessiontimeout} /> : null}
            {!NeedLogin ? <NavbarComp admin={storeData.userinfo.admin} /> : <></>}

            {/* --- Routing Main Branch --- */}
            <Routes>
                <Route path="/" element={NeedLogin ? <LoginComp SetNeedLogin={SetNeedLogin} /> : <GateComp />} />
                <Route path="/register" element={<RegisterComp />} />
                {/* --- Protected Routes --- */}
                <Route element={<ProtectedRoutes NeedLogin={NeedLogin} SetNeedLogin={SetNeedLogin} />}>

                    {/* --- Movie Sub-Routes --- */}
                    <Route path="/movies" element={<MoviesNavbarComp />}>
                        <Route path="all" element={storeData.userinfo.permissions?.includes("View Movies") ? <MoviesComp /> : <>Oops. <br />Authurized users only</>} />
                        <Route path="add" element={storeData.userinfo.permissions?.includes("Create Movies") ? <AddMovie /> : <>Oops. <br />Authurized users only</>} />
                        <Route path="edit/:id" element={storeData.userinfo.permissions?.includes("Update Movies") ? <EditMovie /> : <>Oops. <br />Authurized users only</>} />
                    </Route>
                    {/* --- Subscriptions Sub-Routes --- */}
                    <Route path="/subscriptions" element={<SubsNavbarComp />}>
                        <Route path="all" element={storeData.userinfo.permissions?.includes("View Subscriptions") ? <SubscriptionsComp /> : <>Oops. <br />Authurized users only</>} />
                        <Route path="add" element={storeData.userinfo.permissions?.includes("Create Subscriptions") ? <AddNewMember /> : <>Oops. <br />Authurized users only</>} />
                        <Route path="edit/:id" element={storeData.userinfo.permissions?.includes("Update Subscriptions") ? <EditMember /> : <>Oops. <br />Authurized users only</>} />
                    </Route>
                    {/* --- Admin Sub-Routes --- */}
                    <Route path="/users" element={<UserNavbarComp />}>
                        <Route path="all" element={storeData.userinfo.admin ? <UsersComp /> : <>Oops. <br />I answer to my admins only</>} />
                        <Route path="add" element={storeData.userinfo.admin ? <AddUser /> : <>Oops. <br />I answer to my admins only</>} />
                        <Route path="edit/:id" element={storeData.userinfo.admin ? <EditUser /> : <>Oops. <br />I answer to my admins only</>} />
                    </Route>

                    <Route path="/logout" element={<LogoutComp SetNeedLogin={SetNeedLogin} />} />

                </Route>
            </Routes>
        </center>
    )
}

export default MainRouter