import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { LocationCity } from '@mui/icons-material';

function MatchBuilder() {
  const { user } = useContext(UserContext);
  const [wrestlers, setWrestlers] = useState([]);
  const [selectedWrestlers, setSelectedWrestlers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then((r) => r.json())
      .then((user) => setWrestlers(user));
  }, []);

  const handleChange = (event) => {
    const wrestlerName = event.target.value;
    const updatedSelectedWrestlers = [...selectedWrestlers];

    if (event.target.checked) {
      updatedSelectedWrestlers.push(wrestlerName);
    } else {
      const index = updatedSelectedWrestlers.indexOf(wrestlerName);
      if (index > -1) {
        updatedSelectedWrestlers.splice(index, 1);
      }
    }

    setSelectedWrestlers(updatedSelectedWrestlers);
  };

  const wrestlerLine = wrestlers.map((wrestler) => (
    <FormControlLabel
      key={wrestler.id}
      control={
        <Checkbox
          checked={selectedWrestlers.includes(wrestler.name)}
          onChange={handleChange}
          value={wrestler.name}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={wrestler.name}
    />
  ));

    const [matchType, setMatchType] = useState('')
    const [storyLine, setStoryline] = useState('')
    const [matches, setMatches] = useState([])
    

    const newMatch = {
        type : matchType,
        storyline: storyLine,
        show_id: null,
    }
    const [show, setShow] = useState([])
    function submitMatch(event){
        event.preventDefault()

        const newMatch = {
            type : matchType,
            storyline: storyLine,
            show_id: show.id, 
        }

        fetch('/matches', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON. stringify(newMatch),
        })
        .then (r => r.json())
        .then(newMatchData => console.log(newMatchData))
    }
// match stuff
// __________________________
// show stuff 


    const [showName, setShowName] = useState("")
    const [venueName, setVenueName] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [date, setDate] = useState("")
    const [whereToView, setWhereToView] = useState("")


    function submitShow(event){
        event.preventDefault()

        const newShow = {
            name : showName,
            venue: venueName,
            address: streetAddress,
            city: city,
            state: state, 
            date: date,
            where_to_view: whereToView, 
        }

        fetch('/shows', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON. stringify(newShow),
        })
        .then (r => r.json())
        .then(show => setShow(show))
    }
        console.log("show")
        console.log(show)
        





// _____________________________
    if (!user){
        return <Redirect to='/'/>
    }

return (
    <div>

    <h1> Show Builder</h1>

    <form onSubmit = {submitShow}>
        <Form.Control 
            as="textarea" 
            placeholder="Show Name" 
            value = {showName}
            onChange = {(e) => setShowName(e.target.value)}
            />

        <br></br>

        <Form.Control 
            as="textarea" 
            placeholder="Venue Name" 
            value = {venueName}
            onChange = {(e) => setVenueName(e.target.value)}
            />
        
        <br></br>

        <Form.Control 
            as="textarea" 
            placeholder="Venue Street Address" 
            value = {streetAddress}
            onChange = {(e) => setStreetAddress(e.target.value)}
            />
        
        <br></br>

        <Form.Control 
            as="textarea" 
            placeholder="City" 
            value = {city}
            onChange = {(e) => setCity(e.target.value)}
            />
        
        <br></br>

        <Form.Control 
            as="textarea" 
            placeholder="State" 
            value = {state}
            onChange = {(e) => setState(e.target.value)}
            />
        
        <br></br>
        
        <Form.Control 
            as="textarea" 
            placeholder="Date (entered YYYY-M-D)" 
            value = {date}
            onChange = {(e) => setDate(e.target.value)}
            />
        
        <br></br>
        
        <Form.Control 
            as="textarea" 
            placeholder="Where to View" 
            value = {whereToView}
            onChange = {(e) => setWhereToView(e.target.value)}
            />
        
        <br></br>

        <button type="submit">Build Show!</button>  
    </form>

    <h1>{show.name}</h1>
        
        


        
    











    


    <h1>Match Builder</h1>

    <form onSubmit = {submitMatch}>

        <Form.Control 
            as="textarea" 
            placeholder="Match Type" 
            value = {matchType}
            onChange = {(e) => setMatchType(e.target.value)}
            />

            <br></br>
    
        <Form.Control
            as="textarea"
            placeholder="Storyline"
            value = {storyLine}
            onChange = {(e) => setStoryline(e.target.value)}
            style={{ height: '100px' }}
            />
    
        <br></br>
    
        <button type="submit">Build Match</button>

    </form>

        {wrestlerLine}



    </div>
    );
}

export default MatchBuilder;
