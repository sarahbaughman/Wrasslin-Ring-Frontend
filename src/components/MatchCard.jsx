import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function MatchCard({match}){
    console.log(match)
    
    return (
        <div>
            <Card style={{ width: '18rem', borderColor: 'black', borderWidth: '8px'}}>
                <Card.Img variant="top" src="https://classroomclipart.com/image/static2/preview2/outline-one-wrestler-jumping-into-the-ring-clipart-40467.jpg" style={{ height: '100px' }} />

                <Card.Body>
                    <Card.Title>This is a match card!</Card.Title>
                    <Card.Title>Match Type: {match.type}</Card.Title>
                    <Card.Title>Storyline: {match.storyline}</Card.Title>
                    <Card.Text>
                        {/* {match.storyline} */}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item></ListGroup.Item>
                    <br></br>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            <br></br>
            <button>Edit Match</button>
            </Card>

        <br></br>
        </div>
    )
}


export default MatchCard