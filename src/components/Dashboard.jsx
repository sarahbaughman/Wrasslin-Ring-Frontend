import React, {useContext} from "react";
import { UserContext } from './../context/UserContext'
import {Redirect} from 'react-router-dom'


function Dashboard(){

    const {user} = useContext(UserContext);

    if (!user){
        return <Redirect to='/'/>
    }

    return (
       
        <div>
             <h1>USER DASHBOARD</h1>

             
            {user && user.role === 'promotor' ? (
                <>
                    <h1> Hello {user.name}</h1>
                    <p>This is your dashboard</p>
                </>
                )
                : (null)

            }

            {user && user.role === 'wrestler' ? (
                <>
                    <img src= {user.image}></img>
                    <h1> Hello {user.name}</h1>
                    <p>This is your dashboard</p>
                </>
                )
                : (null)
            }
        </div>
    )
}


export default Dashboard