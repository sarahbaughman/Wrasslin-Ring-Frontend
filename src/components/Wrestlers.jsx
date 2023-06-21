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

console.log("wrestlers")
console.log(wrestlers)

const renderWrestlers = wrestlers.map((wrestler) => 
    <WrestlerCard 
        key = {wrestler.id}
        wrestler = {wrestler}
    />
)

if (user){
    return (
        <div>
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