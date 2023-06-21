import React, { useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

export const RosterContext = React.createContext()

export const RosterProvider = ({ children }) => {

    const [roster, setRoster] = useState([])

    // useEffect(() => {
    //     fetch('/roster')
    //     .then(r => {
    //       if (r.status === 200) {
    //         r.json().then(favs => setFavorites(favs))
    //       }
    //     })
    //   }, [])


    return (
        <RosterContext.Provider

            value={{}}
        >
            {children}

        </RosterContext.Provider>
    )
}

export default RosterProvider