import React, { useEffect } from 'react'
import './Start.css'
import { Link } from 'react-router-dom'
const Start = () => {
    
useEffect(()=>{
},[])
  return (
    <div className='startPage'>
        <section className="start">
            {/* <p className="start_header">HeadStache</p> */}
            <p className="start_header">Mentor</p>
            <p className="small_header">Be the hand you seek for help.</p>
            <h1 className="btn-group">
                <Link to="/signup" className="btn">Signup</Link>
                <Link to={(sessionStorage.getItem('username')) ? "/home" : "/login" } className="btn">Login</Link>
            </h1>
            {/* <Link to="#" className="btn">get me out of here</Link> */}
        </section>
    </div>
  )
}

export default Start