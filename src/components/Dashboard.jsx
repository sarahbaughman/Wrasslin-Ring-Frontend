import React, {useContext} from "react";
import { UserContext } from './../context/UserContext'


function Dashboard(){

    const {user} = useContext(UserContext);

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
                    <img style={{ height: '18rem'}}src= {user.image}></img>
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