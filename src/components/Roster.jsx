import React, {useContext} from "react";
import { UserContext } from './../context/UserContext'
import {Redirect} from 'react-router-dom'


function Roster(){

//     const [wrestlers, setWrestlers] = useState([])

//     useEffect(() => { 
//     fetch("/users")
//     .then(r => r.json())
//     .then(wrestlers => {
//         const filterWrestlers = wrestlers.filter()
//         setWrestlers(user)})}, [])

// console.log("wrestlers")
// console.log(wrestlers)

    return (
       
        <div>
            <h1> Hello from the roster</h1>
        </div>
    )
}


export default Roster