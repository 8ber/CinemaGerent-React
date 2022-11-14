import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './SubsNavbarComp.css'
function SubsNavbarComp(props) {
  const storeData = useSelector(state => state.appReducer.data.userinfo.permissions)
  let activeStyle = {
    backgroundColor: "Yellow",
    border: "1px dashed Black"
  };
  return (
    <>
      <ul className="NavUl">
        {
          storeData.includes("View Subscriptions") &&
          <li className="NavLi">
            <NavLink to="/subscriptions/all"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              All Members
            </NavLink>
          </li>
        }
        {
          storeData.includes("Create Subscriptions") &&
          <li className="NavLi">
            <NavLink to="/subscriptions/add"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Add Member
            </NavLink>
          </li>
        }
      </ul>
      <Outlet />
    </>
  )
}

export default SubsNavbarComp