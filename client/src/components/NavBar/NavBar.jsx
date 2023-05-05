import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { setFreezeBackground } from './../../features/bgImage/imageSlice'
import { useDispatch } from 'react-redux'
import { VscMenu } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";

const NavBar = () => {
  const [ toggleBoolean, setToggleBoolean ] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isActive, setActive] = useState(false);
  const [isFrozen, setFreezeBg] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    setCurrentUser(sessionStorage.getItem('username'));
  },[])
  
  useEffect(()=>{
    dispatch(setFreezeBackground(toggleBoolean));
  },[toggleBoolean])
  const toggleNav = () => {
    setActive(!isActive);
  }
  const toggleFreezeBg = () => {
    setToggleBoolean(prev => !prev);
    setFreezeBg(!isFrozen);
  }
  
  return (
        <nav id="nav" className={(isActive) ? "showNav": "hideNav"}>
          <div className="navButton" onClick={toggleNav}>
            <b>{(isActive) ? <VscClose /> : <VscMenu />}</b>
          </div>
            <ul>
              <div className='add-btn' id='currentUser'>
                <li>
                {/* <Link to='/a' > */}
                    {currentUser} 
                {/* </Link> */}
                </li>
              </div>
              <div className='add-btn'>
                <li>
                  <Link to='/add' >
                    Add
                  </Link>
                </li>
              </div>
                <li>
                </li>
              {/* //make a start page */}
                <li>
                  <div className='add-btn'>
              <Link to='/start' onClick={()=>{
                sessionStorage.removeItem('username')
              }}>
                    Logout
              </Link>
                  </div>
                </li>
              {/* </div> */}
              <div onClick={toggleFreezeBg} className={(isFrozen) ? "frozen add-btn": "notFrozen add-btn"}>
              <li>FreezeBg</li>
              </div>
            </ul>
        </nav>
  )
}

export default NavBar