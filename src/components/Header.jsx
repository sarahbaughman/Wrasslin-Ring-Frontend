import React, {useContext} from "react";
import { UserContext } from './../context/UserContext';
import {Redirect} from 'react-router-dom'
import './Header.css'



function Header() {

    const { user, logoutUser} = useContext(UserContext);

    if (!user){
            return <Redirect to='/'/>
        }
    

return (
    <div className="Header">
        {/* <img style={{ textAlign: 'left', height: 150}}src = "https://www.seekpng.com/png/detail/163-1632409_boxing-ring-wrestling-ring-clip-art.png"></img> */}
        <p  style={{ textAlign: 'center' }}>WRASSLIN' RING</p>
        
        {user ? 
        (<button
            onClick  = {logoutUser}
            style={{ float: 'right' }}
            >Logout
        </button>) 
        : null}

        {/* darkmode button with functionality  */}
    </div>
)

}

export default Header