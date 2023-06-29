import React, {useState, useEffect} from 'react'
import { Table } from 'semantic-ui-react'
import UserProvider from '../context/UserContext';
import './wrestlerupcomingshows.css'

function WrestlerUpcomingShows(){

    const [matchInfo, setMatchInfo] = useState([])

    useEffect(() => {
        fetch("/upcomingmatchesbyuserid")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then(showHistory => {
                    setMatchInfo(showHistory)
                });
                }
        });
    }, [])

    

    const renderTableCells = matchInfo.map(match => {

        const dateParts = match.show.date.split('-');
        const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;

        return (
            <Table.Row >
                <Table.Cell>{match.show.name}</Table.Cell>
                <Table.Cell>{formattedDate}</Table.Cell>
                <Table.Cell>{match.type}</Table.Cell>
                <Table.Cell>{match.match_wrestlers.map(wrestler => {
                    return (
                        <div>
                            {wrestler.user.name}
                        </div> 
                    )
                    })}
                
                </Table.Cell>
                <Table.Cell>{match.storyline}</Table.Cell>
            </Table.Row>

    )})


    return (
        <div className = 'upcoming-shows-div'>
            <h1 className = 'heading'> Your Upcoming Shows </h1>

            <Table striped>
                <Table.Header >
                    <Table.Row >
                        <Table.HeaderCell>Card</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Match Type</Table.HeaderCell>
                        <Table.HeaderCell>Wrestlers</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Storyline</Table.HeaderCell>
                    </Table.Row >
                </Table.Header>

                <Table.Body className = 'table'>

                    {renderTableCells}
                
                </Table.Body>

            </Table>
        </div>
    )
}

export default WrestlerUpcomingShows