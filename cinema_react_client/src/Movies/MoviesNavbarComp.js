import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './MoviesNavbarComp.css'
function MoviesNavbarComp(props) {
  const storeData = useSelector(state => state.appReducer.data.userinfo.permissions)
  let activeStyle = {
    backgroundColor: "Yellow",
    border: "1px dashed Black"
  };
  return (
    <>
      <ul className="MovUl">
        {
          storeData.includes("View Movies") &&
          <li className="MovLi">
            <NavLink to="/movies/all"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              All Movies
            </NavLink>
          </li>
        }
        {
          storeData.includes("Create Movies") &&
          <li className="MovLi">
            <NavLink to="/movies/add"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Add a Movie
            </NavLink>
          </li>
        }
      </ul>
      <Outlet />
    </>
  )
}

export default MoviesNavbarComp