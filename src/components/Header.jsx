import React, {useContext} from "react";
import { UserContext } from './../context/UserContext';



function Header() {

    const { user, setUser, logoutUser} = useContext(UserContext);
    

return (
    <>
        <p>Hello from the header</p>
        
        {user ? 
        (<button
        onClick  = {logoutUser}
        >Logout</button>) 
        : null}

        {/* darkmode button with functionality  */}
    </>
)

}

export default Header