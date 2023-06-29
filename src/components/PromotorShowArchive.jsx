import React, {useState, useEffect} from 'react'
import { Card, Button } from 'semantic-ui-react'
import './promotorshowarchive.css'

function PromotorShowArchive(){

    const [archivedShows, setArchivedShows] = useState([])

    useEffect(() => {
        fetch("/promotorpastshows")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then(archiveData => {
                    setArchivedShows(archiveData)
                });
                }
        });
    }, [])

    console.log(archivedShows)


    const renderArchivedShows = archivedShows.map(show => {

        const dateParts = show.date.split('-');
        const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;

        return (
            <Card style = {{width: "90%",  margin: 'auto', marginTop: '30px'}}>
                <Card.Content style = {{color: 'black'}}>

                    <Card.Header>{show.name}</Card.Header>
                    <Card.Description>{formattedDate}</Card.Description>
                    <Card.Description><strong>Location:</strong> {show.venue},  {show.address},  {show.city}, {show.state}</Card.Description>
                    <Card.Description><strong>Aired: </strong>{show.where_to_view}</Card.Description>
                    <br></br>
                    <Card.Header>Matches:</Card.Header>
                    {show.matches.map(match => {
                        return (
                            <Card style = {{marginTop: '5px', width: '100%', border: '3px double black'}}>
                                <Card.Content style = {{backgroundColor:'#f7b334', color: 'black'}}>
                                    <Card.Header>{match.type}</Card.Header>
                                    <Card.Description><strong>Storyline: </strong>{match.storyline}</Card.Description>
                                    <br></br>
                                    <Card.Description><strong>Wrestlers:</strong></Card.Description>
                                    {match.match_wrestlers.map(wrestler => {
                                        return (
                                        <Card.Description>{wrestler.user.name}</Card.Description>
                                        )
                                    })}
                                </Card.Content>
                            </Card>
                        )
                    })}

                </Card.Content>


            </Card>
            


        )

    })


    return (
        <div style={{ height: '800px'}}>
            <h1 className = "custom-heading">Show Archive</h1>
            {renderArchivedShows}
        </div>
    )

}

export default PromotorShowArchive