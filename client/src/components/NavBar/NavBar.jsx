import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { setFreezeBackground } from './../../features/bgImage/imageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { VscMenu } from "react-icons/vsc";
import { GoGear } from "react-icons/go";
import { VscClose } from "react-icons/vsc";
import { FaGear } from "react-icons/fa6";
import { useLoginMutation, useLogoutMutation } from '../../slices/usersApiSlice'
import { logout } from '../../slices/authSlice'
import { setUserData } from '../../features/userData/userDataSlice'

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavBar = () => {
  
  const [ toggleBoolean, setToggleBoolean ] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const [isActive, setActive] = useState(false);
  const [isFrozen, setFreezeBg] = useState(false);
  const [ display, setDisplay ] = useState( 'none' );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userCred } = useSelector((state) => state.auth); 
  const [logoutApiCall, { isLogoutLoading} ]= useLogoutMutation();
  const currentUser = userCred !== null ? userCred?.name : null;
  console.log(currentUser)
  // setCurrentUser(userCred?.name);
  // useEffect(()=>{
  //   setCurrentUser(userCred?.name);
  // },[userCred])

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); //reset Cookie
      dispatch(logout()); //reset localStorage
      dispatch(setUserData(null));
      navigate('/start')
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    dispatch(setFreezeBackground(toggleBoolean));
  },[toggleBoolean])

  const toggleNav = () => {
    setActive(!isActive);
  }

  const toggleSettings = () => {
        if ( display == 'none' ) {
            setDisplay( 'block' )
        } else {
            setDisplay( 'none' )
        }
    }

  
  const toggleFreezeBg = () => {
    setToggleBoolean(prev => !prev);
    setFreezeBg(!isFrozen);
  }
  
  return (
    <>
        <nav id="nav" className={(isActive) 
          ? "showNav": "hideNav"}>
        {/* <nav id="nav" className={"showNav"}> */}
          <div className="navButton" onClick={toggleNav}>
            <b>{(isActive) ? <VscClose /> : <VscMenu />}</b>
          </div>
            <ul id="divider">
              <div id="top">
              {currentUser ?(
                <>
                <div className='nav-links' id='currentUser'>
                  <li>{console.log(currentUser)}{currentUser} </li>
                </div>
                <div className='nav-links'>
                  <li><Link to='/home' >Home</Link></li>
                </div>
                <div className='nav-links'>
                  <li><Link to='/my-space' >My Space</Link></li>
                </div>
                <div className='nav-links'>
                  <li><Link to='/add' >Add Quote</Link></li>
                </div>
                </>
              ) : (
                <>
                <div className='nav-links'>
                  <li><Link to='/start' >Sign-up</Link></li>
                </div>
                </>
              )}
                
                <div onClick={toggleFreezeBg} className={(isFrozen) ? "frozen nav-links": "notFrozen nav-links"}>
                <li>Freeze Image</li>
                </div>
              </div>
              <div id='bottom'>
              {currentUser ?(
                <>
                <div className='nav-links ' 
                // onClick={ toggleSettings }
                >
                  {/* <FaGear /> */}
                    <li><Link to='/start' onClick={ logoutHandler }> Logout </Link></li>
                <div className='nav-link-dropdown' style={{display:display}}>
                  <div className='nav-link-dropdown-items' >
                  </div>

                </div>
                </div>
                </>
              ) : (
                <>
                </>
              )}
              </div>
            </ul>
        </nav>
    </>
  )
}

export default NavBar