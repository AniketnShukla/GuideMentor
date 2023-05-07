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
    <>
        <nav id="nav" className={(isActive) ? "showNav": "hideNav"}>
          <div className="navButton" onClick={toggleNav}>
            <b>{(isActive) ? <VscClose /> : <VscMenu />}</b>
          </div>
            <ul id="divider">
              <div id="top">
                <div className='nav-links' id='currentUser'>
                  <li>
                  {/* <Link to='/a' > */}
                      {currentUser} 
                  {/* </Link> */}
                  </li>
                </div>
                <div className='nav-links'>
                  <li>
                    <Link to='/home' >
                      Home
                    </Link>
                  </li>
                </div>
                <div className='nav-links'>
                  <li>
                    <Link to='/my-space' >
                      My Space
                    </Link>
                  </li>
                </div>
                <div className='nav-links'>
                  <li>
                    <Link to='/add' >
                      Add
                    </Link>
                  </li>
                </div>
                {/* </div> */}
                <div onClick={toggleFreezeBg} className={(isFrozen) ? "frozen nav-links": "notFrozen nav-links"}>
                <li>FreezeBg</li>
                </div>
              </div>
              <div className='nav-links' id='bottom'>
                <li>
                  <Link to='/start' onClick={()=>{
                    sessionStorage.removeItem('username')
                  }}>
                        Logout
                  </Link>
                </li>
              </div>
            </ul>
        </nav>
    </>
  )
}

export default NavBar