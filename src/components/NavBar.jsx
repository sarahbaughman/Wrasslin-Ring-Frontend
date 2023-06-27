import React, {useContext} from "react";
import { NavLink } from 'react-router-dom';
import { UserContext } from './../context/UserContext'
import './navbar.css'


function NavBar() {

const {user} = useContext(UserContext);

return (
    <div className = "nav-bar-div" style={{ display: 'inline-block' }}>
        {user && user.role === 'promotor' ? (
            <>
            <NavLink to="/dashboard" exact className="nav-link">
                Dashboard
            </NavLink>
            <br></br>
            <NavLink to="/buildshow" exact className="nav-link">
                Build Show 
            </NavLink>
            <br></br>
            <NavLink to="/showarchive" className="nav-link">
                Show Archive
            </NavLink>
            <br></br>
            <NavLink to="/wrestlers" className="nav-link">
                Wrestlers
            </NavLink>
            <br></br>
            <NavLink to="/storylines" className="nav-link">
                Storylines
            </NavLink> 
            </>)
            : (null)

        }

        {user && user.role === 'wrestler' ? (
            <>
            <NavLink to="/dashboard" exact className="nav-link">
                Dashboard
            </NavLink>
            <br></br>
            <NavLink to="/upcomingshows" exact className="nav-link">
                Upcoming Shows
            </NavLink>
            <br></br>
            <NavLink to="/showhistory" className="nav-link">
                Show History
            </NavLink>
            <br></br>
            <NavLink to="/submitstoryline" className="nav-link">
                Submit Storyline
            </NavLink>
            <br></br>
            <NavLink to="/wrestlers" className="nav-link">
                Wrestlers
            </NavLink> 
            </>)
            : (null)

        }
    </div>
    )
}


export default NavBar