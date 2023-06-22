import React, {useContext} from "react";
import { UserContext } from './../context/UserContext';



function Header() {

    const { user, setUser, logoutUser} = useContext(UserContext);

return (
    <>
        <p style={{ textAlign: 'center' }}>WRASSLIN' RING</p>
        
        {user ? 
        (<button
            onClick  = {logoutUser}
            style={{ float: 'right' }}
            >Logout
        </button>) 
        : null}

        {/* darkmode button with functionality  */}
    </>
)

}

export default Header