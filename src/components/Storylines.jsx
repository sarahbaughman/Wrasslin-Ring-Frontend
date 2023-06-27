import React, {useEffect, useState} from 'react';
import { Card, Button } from 'semantic-ui-react'
import "./storylines.css" 

function Storylines(){
    const [storylines, setStorylines] = useState([])

    useEffect(() => {
        fetch("/proposedmatches")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then(propMatchData => {
                    setStorylines(propMatchData)
                });
                }
        });
    }, []);

    console.log(storylines)

    const renderStorylines = storylines.map(story => {
        
        return (

            <Card>
                <Card.Content>

                    <Card.Header>{story.type}</Card.Header>
                    <Card.Meta>Submitted by {story.submitted_user_name}</Card.Meta>
                    <Card.Description>{story.storyline}</Card.Description>
                    <br></br>
                    <Card.Description> <strong> Wrestlers: </strong> </Card.Description>
                    <br></br>
                    <Card.Description>{story.proposed_match_wrestlers.map(wrestler => <li style = {{listStyleType: 'none'}}>{wrestler.user.name}</li>)}</Card.Description>
                    <br></br>
                    <Button basic color='orange'> Edit Match Idea </Button>
                    <br></br><br></br>
                    <Button basic color='black'> Delete Match Idea </Button>

                </Card.Content>
            </Card>
        
        )})
    




    return (
        <div>
            <h1> Submitted Storyline Ideas</h1>
            <div className = "wrapper">
            {renderStorylines}
            </div>
        </div>
    )
}

export default Storylines