import React, {useContext} from "react";
import { UserContext } from './../context/UserContext';
import {Redirect} from 'react-router-dom'
import './Header.css'
import { Button } from "semantic-ui-react";



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
        (<Button
            onClick  = {logoutUser}
            style={{ right: '20px', top: '20px', position: 'absolute', backgroundColor: '#f7b334', color: 'black' }}
            >Logout
        </Button>)
        : noUser()}
        </header>

        {/* darkmode button with functionality  */}
    </div>
)

}

export default Header