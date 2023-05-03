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
              <div className='add-btn'>
              <Link to='/add' >
                <li>Add</li>
              </Link>
              </div>
              <div onClick={handleClick}>
                <li>Freeze Background</li>
              </div>
            </ul>
        </nav>
  )
}

export default NavBar