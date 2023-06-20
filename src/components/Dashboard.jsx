import React, {useContext} from "react"
import { UserContext } from './../context/UserContext';

function Dashboard(){

    const { user, setUser} = useContext(UserContext);

    return (
        <div>
            <h1> Hello {user.name}</h1>
            <p>This is your dashboard</p>
        </div>
    )
}

export default Dashboard