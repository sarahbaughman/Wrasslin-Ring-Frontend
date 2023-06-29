import React, {useContext} from 'react';
import Figure from 'react-bootstrap/Figure'
import { UserContext } from './../context/UserContext';
import { Card, Button, Image } from 'semantic-ui-react'
import './wrestlercard.css'


function WrestlerCard({wrestler}) {

  const {image, instagram, name, regions, weight} = wrestler
  
  const {user} = useContext(UserContext);

  return (

    <div  className = 'card'>
    <Card 
      style = {{marginTop: '15px'}}
      >
      <Card.Content >
        <Image
          floated='center'
          size='medium'
          src={image}
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Instagram: {instagram}</Card.Meta>
        <Card.Description> <strong>Weight: {weight}</strong></Card.Description>
        <Card.Description> <strong>Regions: {regions}</strong></Card.Description>
      </Card.Content> 
    </Card >
    </div>
  );
  
}


export default WrestlerCard