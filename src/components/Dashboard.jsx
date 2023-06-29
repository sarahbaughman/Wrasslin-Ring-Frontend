import React, {useContext} from "react";
import { UserContext } from './../context/UserContext'
import './dashboard.css'


function Dashboard(){

    const {user} = useContext(UserContext);

    return (

        <div className = 'dashboard-div' style={{ display: 'inline-block', height: '800px'}}>
    
            {user && user.role === 'promotor' ? (
                <>
                    <h1> Welcome {user.name}! </h1>
                    <p>Checkout the feed below for the latest kickass wrestling news:</p>
                    <div>
                        <iframe style={{ height: '800px', width: '900px'}} src="https://www.wrestle.buzz/"></iframe>
                    </div>
                </>
                )
                : (null)

            }

            {user && user.role === 'wrestler' ? (
                <>
                    <img className = 'dashboard-image' style={{ height: '18rem'}}src= {user.image}></img>
                    <h1> Welcome {user.name}</h1>
                    <p>Checkout the feed below for the latest kickass wrestling news:</p>
                    <div>
                        <iframe style={{ height: '800px', width: '900px'}} src="https://www.wrestle.buzz/"></iframe>
                    </div>
                </>
                )
                : (null)
            }
        </div>
    )
}


export default Dashboard