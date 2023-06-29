import React, {useContext} from "react";
import { NavLink } from 'react-router-dom';
import { UserContext } from './../context/UserContext'
import './navbar.css'
import { Button } from "semantic-ui-react";


function NavBar() {

const {user} = useContext(UserContext);
if (user) {
return (
    <div className = "nav-bar-div" style={{ display: 'inline-block' }}>
        {user && user.role === 'promotor' ? (
            <Button.Group color="orange" vertical size="huge">
                <Button><NavLink to="/dashboard" exact className="nav-link">
                Dashboard
            </NavLink></Button>
            <br></br>
            <Button><NavLink to="/buildshow" exact className="nav-link">
                Build Show 
            </NavLink></Button>
            <br></br>
            <Button><NavLink to="/showarchive" className="nav-link">
                Show Archive
            </NavLink></Button>
            <br></br>
            <Button>
            <NavLink to="/wrestlers" className="nav-link">
                Wrestlers
            </NavLink>
            </Button>
            <br></br>
            <Button>
            <NavLink to="/storylines" className="nav-link">
                Storylines
            </NavLink> 
            </Button>
            </Button.Group>)
            : (null)

        }

        {user && user.role === 'wrestler' ? (
            
            
            <Button.Group color="orange" vertical size="huge">
                <Button>
                    <NavLink to="/dashboard" exact className="nav-link">Dashboard</NavLink>
                </Button>
                <br></br>
                <Button>
                    <NavLink to="/upcomingshows" exact className="nav-link">
                        Upcoming Shows
                    </NavLink>
                </Button>
                <br></br>
                <Button>
                    <NavLink to="/showhistory" className="nav-link">
                        Show History
                    </NavLink>
                </Button>
                <br></br>
                <Button>
                    <NavLink to="/submitstoryline" className="nav-link">
                        Submit Storyline
                    </NavLink>
                </Button>
                <br></br>
                <Button>
                    <NavLink to="/wrestlers" className="nav-link">Wrestlers</NavLink> 
                </Button>

            </Button.Group>
            )
            : (null)

        }


        
    </div>
    )
}
else{
    return null
}
}


export default NavBar