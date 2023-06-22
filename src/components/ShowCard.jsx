import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function ShowCard({show}){
    const {name, city, date, state, address, where_to_view,venue} = show
    return (
        <div>
            <Card style={{ width: '18rem', borderColor: 'black', borderWidth: '8px'}}>
                <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/007/194/207/original/wrestling-silhouette-art-free-vector.jpg" style={{ height: '100px' }} />

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Title>Where to View: {where_to_view}</Card.Title>
                    {/* <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Date: {date}</ListGroup.Item>
                    <br></br>
                    <ListGroup.Item>{venue}</ListGroup.Item>
                    <ListGroup.Item>{address}</ListGroup.Item>
                    <ListGroup.Item>{city}, {state}</ListGroup.Item>
                </ListGroup>
            <br></br>
            <button>Edit Show</button>
            </Card>

        <br></br>
        </div>
    )
}


export default ShowCard