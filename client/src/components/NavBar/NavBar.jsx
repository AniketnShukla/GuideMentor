import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { setFreezeBackground } from './../../features/bgImage/imageSlice'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const [ toggleBoolean, setToggleBoolean ] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setToggleBoolean(prev => !prev);
  }
  useEffect(()=>{
    dispatch(setFreezeBackground(toggleBoolean))
  },[toggleBoolean])
  return (
        <nav>
            <ul>
              <Link to='/add' >
                <li>
              <div className='add-btn'>
                Add
              </div>
              </li>
              </Link>
              <Link to='/login' >
                <li>
              <div className='add-btn'>
                Login
              </div>
              </li>
              </Link>
              <Link to='/signup' >
                <li>
                Signup
                  </li>
              </Link>
              //make a start page
              <Link to='/login' onClick={()=>{
                sessionStorage.removeItem('username')
              }}>
                <li>
                Logout
                  </li>
              </Link>
              {/* </div> */}
              <div onClick={handleClick}>
              <li>Freeze  Background</li>
              </div>
            </ul>
        </nav>
  )
}

export default NavBar