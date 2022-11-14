import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
function NavbarComp(props) {
  let activeStyle = {
    backgroundColor: "Yellow",
    border: "1px dashed Black"
  };
  return (
    <nav>
      <ul className="Mainul">
        <li className="Mainli">
          <NavLink
            to="/movies/all"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Movies
          </NavLink>
        </li>
        <li className="Mainli">
          <NavLink
            to="/subscriptions/all"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Subscriptions
          </NavLink>
        </li>
        {
          props.admin ? <li className="Mainli">

            <NavLink to="/users/all"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Manage users
            </NavLink>
          </li> : null
        }
        <li className="Mainli">
          <NavLink to="/logout"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarComp