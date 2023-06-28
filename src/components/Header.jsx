import React, {useContext} from "react";
import { UserContext } from './../context/UserContext';
import {Redirect} from 'react-router-dom'
import './Header.css'



function Header() {

    const { user, logoutUser} = useContext(UserContext);

    const noUser = () => {
            return <Redirect to='/'/>
    }

return (
    <div className="Header">
        <header>
            <h1 className = 'wrasslin-ring'  style={{ textAlign: 'center' }} >WRASSLIN' RING</h1>
            {user ?
        (<button
            onClick  = {logoutUser}
            // style={{ float: 'right' }}
            >Logout
        </button>)
        : noUser()}
        </header>

        {/* darkmode button with functionality  */}
    </div>
)

}

export default Header