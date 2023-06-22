import React, { useEffect, useState} from 'react'
import { } from 'react-router-dom'


export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

// state
const [user, setUser] = useState(null)

// all functions regarding users

useEffect(() => {
    fetch("/check_session")
    .then((response) => {
        if (response.ok) {
            response.json()
            .then(user => {
                setUser(user)
            });
            }
    });
}, []);

function logoutUser(){
    fetch("/logout", {
        method: "DELETE"
    }).then(res => {
        if (res.status === 204) {
            setUser(null)
            console.log("redirect here")
        }
    })
    
}

return (
    <UserContext.Provider

        value={{user, setUser, logoutUser}}
    >
        {children}

    </UserContext.Provider>
    )
}

export default UserProvider