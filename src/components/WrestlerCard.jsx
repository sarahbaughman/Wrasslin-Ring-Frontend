import React, {useContext} from 'react';
import Figure from 'react-bootstrap/Figure'
import { UserContext } from './../context/UserContext';
// import FigureImage from 'react-bootstrap/FigureImage'
// import FigureCaption from 'react-bootstrap/FigureCaption'



function WrestlerCard({wrestler}) {

  const {image, instagram, name, regions, weight} = wrestler
  
  const {user} = useContext(UserContext);

  return (
    <Figure>
      <Figure.Image
        // width={171}
        height={180}
        alt="171x180"
        src={image}
      />

      <Figure.Caption>
        <h4> Name: {name}</h4>
        {/* {user && user.role === 'promotor' ? (<button>Add to Roster</button>) : null} */}
        <h5>Weight: {weight}</h5>
        <h5>Regions: {regions}</h5>
        <h5>Instagram: {instagram}</h5>

      </Figure.Caption>

    </Figure>
  );
  
}


export default WrestlerCard