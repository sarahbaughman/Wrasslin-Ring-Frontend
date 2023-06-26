import React, {useEffect, useState, useContext} from 'react'
import WrestlerCard from "./WrestlerCard"
import { UserContext } from '../context/UserContext';
import {Redirect} from 'react-router-dom'


function Wrestlers(){

const { user } = useContext(UserContext);

const [wrestlers, setWrestlers] = useState([])

useEffect(() => { 
    fetch("/users")
    .then(r => r.json())
    .then(user => setWrestlers(user))}, [])

const renderWrestlers = wrestlers.map((wrestler) => 
    <WrestlerCard 
        key = {wrestler.id}
        wrestler = {wrestler}
    />
)
console.log(wrestlers)
if (user){
    return (
        <div className = 'wrapper'>
            <h1>WRESTLERS PAGE</h1>
            {renderWrestlers}
        </div>
    )
}

if (!user){
    return <Redirect to='/'/>
}


}

export default Wrestlers