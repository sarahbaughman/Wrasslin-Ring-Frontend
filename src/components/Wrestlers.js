import React, {useEffect, useState} from 'react'


function Wrestlers(){

const [wrestlers, setWrestlers] = useState([])

useEffect(() => { 
fetch("/users")
.then(r => r.json())
.then(user => setWrestlers(user))}, [])

console.log("wrestlers")
console.log(wrestlers)



return (
    <>
    <p>Hello from the wrestlers page</p>
    </>
)
}

export default Wrestlers