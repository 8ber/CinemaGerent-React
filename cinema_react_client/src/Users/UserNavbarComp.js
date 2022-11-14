import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './UserNavbarComp.css'
function UserNavbarComp(props) {
  const isAdmin = useSelector(state => state.appReducer.data.userinfo.admin)
  let activeStyle = {
    backgroundColor: "Yellow",
    border: "1px dashed Black"
  };
  return (
    <>
      <ul className="AdminUl">
        {
          isAdmin &&
          <li className="AdminLi">
            <NavLink to="/users/all"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              All Users
            </NavLink>
          </li>
        }
        {
          isAdmin &&
          <li className="AdminLi">
            <NavLink to="/users/add"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Add a User
            </NavLink>
          </li>
        }
      </ul>
      <Outlet />
    </>
  )
}

export default UserNavbarComp