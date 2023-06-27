import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserContext } from '../context/UserContext';
// import Form from 'react-bootstrap/Form';
import ShowCard from './ShowCard'
import {Redirect} from 'react-router-dom'
import MatchCard from './MatchCard'
import {Card,Form,Input} from 'semantic-ui-react'



function MatchBuilder() {
    const { user } = useContext(UserContext);
    const [wrestlers, setWrestlers] = useState([]);
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);

//Grabs all wrestler users
    useEffect(() => {
    fetch('/users')
        .then((r) => r.json())
        .then((data) => setWrestlers(data));
    }, []);

//Updates the selected wrestlers as their box is checked 
    const handleChange = (event, wrestler) => {
    const updatedSelectedWrestlers = [...selectedWrestlers];

    if (event.target.checked) {
        updatedSelectedWrestlers.push(wrestler);
    } else {
        const index = updatedSelectedWrestlers.findIndex(
            (selectedWrestler) => selectedWrestler.id === wrestler.id
        );
    
    if (index > -1) {
        updatedSelectedWrestlers.splice(index, 1);
    }
    }

    setSelectedWrestlers(updatedSelectedWrestlers);
};

//Creates list of wrestlers with their checked boxes
const wrestlerLine = wrestlers.map((wrestler) => (
    <li>
    <FormControlLabel
        key={wrestler.id}
        control={
        <Checkbox
            checked={selectedWrestlers.some(
            (selectedWrestler) => selectedWrestler.id === wrestler.id
            )}
            onChange={(event) => handleChange(event, wrestler)}
            value={wrestler.name}
            inputProps={{ 'aria-label': 'controlled' }}
        />
        }
        label={wrestler.name}
    />
    </li>
));

// choose wrestlers stuff 
  // __________________________________
// match builder stuff
   


    // function submitMatch(event){
    //     event.preventDefault()

    //     const newMatch = {
    //         type : matchType,
    //         storyline: storyLine,
    //         show_id: show.id, 
    //     }

    //     fetch('/matches', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : "application/json",
    //         },
    //         body: JSON.stringify(newMatch),
    //     })
    //     .then (r => {if (r.status === 201){
    //         r.json()
    //     .then(newMatchData => {
    //         setMatches(newMatchData)
    //         resetMatchForm()
    //         console.log(matches)
    //     })}}
        
    //     )
    // console.log("Matches Matches Matches")
    // console.log(matches)

    //     selectedWrestlers.map(wrestler => 
    //         fetch('/matchwrestlers', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type" : "application/json",
    //             },
    //             body: JSON.stringify({
    //                 user_id : wrestler.id,
    //                 match_id : matches.id, 
    //             }),
    //         })

    //         .then (r => {if (r.status === 201){
    //             r.json()
    //         .then(newMatchWrestler => console.log(newMatchWrestler))
    //         setSelectedWrestlers([])
    // }}))
    // }

//Creates the match and the match wrestlers when user clicks "Create Match "
const [matchType, setMatchType] = useState('')
const [storyLine, setStoryline] = useState('')
const [matches, setMatches] = useState([])

const [show, setShow] = useState([])
    const resetMatchForm = () => {
        setMatchType("")
        setStoryline("")
    }

    function submitMatch(event) {
        event.preventDefault();

        const wrestlersArr = selectedWrestlers.map((wrestler) => {
            return {
                user_id: wrestler.id
            }
        })

        const newMatchPost = {
            match : {
                type: matchType,
                storyline: storyLine,
                show_id: show.id
            },
        
            wrestlers: wrestlersArr
        }

        fetch('/matches', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newMatchPost),
        })
        .then((r) => {
            if (r.status === 201) {
                return r.json()
            .then(newMatchData => console.log(newMatchData));
        }
        })
        resetMatchForm()
        setSelectedWrestlers([])
    }

    
// match stuff
// __________________________
// Creating new show form state
    

    const [showName, setShowName] = useState("")
    const [venueName, setVenueName] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [date, setDate] = useState("")
    const [whereToView, setWhereToView] = useState("")

// Creates new show, pairs it with the user
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
            created_by_user_id: user.id,
        }

        fetch('/shows', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newShow),
        })
        .then (r => {if (r.status === 201){
            r.json()
        .then(show => setShow(show))
        resetShowForm()
    }})}

        const resetShowForm = () => {
            setShowName("")
            setVenueName("")
            setStreetAddress("")
            setCity("")
            setState("")
            setDate("")
            setWhereToView("")
        }


//Upcoming Show Cards with Matches Code - COMPLETE sans CSS---------------------------------------
        const [upcomingShows, setUpcomingShows] = useState([])

        useEffect(() => {
            // if (user) {
                fetch("/promotorupcomingshows")
                .then((response) => {
                if (response.ok) {
                    response.json()
                .then(data => {
                    setUpcomingShows(data);
                });
                }
                });
            }
        , []);

        const renderUpcomingShows = upcomingShows.map(show => {

            const dateParts = show.date.split('-');
            const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;

            return (
                <Card style={{ display: 'inline-block'}}>
                    <Card.Content>

                        <Card.Header>{show.name}</Card.Header>
                        <Card.Description>{formattedDate}</Card.Description>
                        <Card.Description><strong>Location:</strong> {show.venue},  {show.address},  {show.city}, {show.state}</Card.Description>
                        <Card.Description><strong>Aired: </strong>{show.where_to_view}</Card.Description>
                        <br></br>
                        <Card.Header>Matches:</Card.Header>
                        {show.matches.map(match => {
                            return (
                                <Card>
                                    <Card.Content>
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
        
// --------------------------------------------------------------------------------



return (
    <div style={{ display: 'inline-block' }}>

    
    {show.length === 0 ? (
        <div>

        <h1> Show Builder</h1>

        <Form onSubmit = {submitShow} style = {{width: '1000px'}}>
            <Form.Group>
            <Form.Field 
                control = {Input}
                placeholder="Show Name" 
                label = "Show Name"
                value = {showName}
                onChange = {(e) => setShowName(e.target.value)}
                />

            <br></br>

            <Form.Field 
                control = {Input}
                placeholder="Venue Name" 
                label = "Venue Name"
                value = {venueName}
                onChange = {(e) => setVenueName(e.target.value)}
            />

            {/* <Form.Control 
                as="textarea" 
                placeholder="Venue Name" 
                value = {venueName}
                onChange = {(e) => setVenueName(e.target.value)}
                /> */}
            
            <br></br>
            <Form.Field 
                control = {Input}
                placeholder="Venue Street Address" 
                label = "Venue Street Address"
                value = {streetAddress}
                onChange = {(e) => setStreetAddress(e.target.value)}
            />
            

            {/* <Form.Control 
                as="textarea" 
                placeholder="Venue Street Address" 
                value = {streetAddress}
                onChange = {(e) => setStreetAddress(e.target.value)}
                /> */}
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder="City" 
                label = "City"
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
            />

            {/* <Form.Control 
                as="textarea" 
                placeholder="City" 
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
                /> */}
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "ex: NY"
                label = "State" 
                value = {state}
                onChange = {(e) => setState(e.target.value)}
                style = {{width: '80px'}}
            />

            {/* <Form.Control 
                as="textarea" 
                placeholder="State" 
                value = {state}
                onChange = {(e) => setState(e.target.value)}
                />
            */}
        
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "Enter as YYYY-M-D"  
                label = "Date"
                value = {date}
                onChange = {(e) => setDate(e.target.value)}
            />
            
            {/* <Form.Control 
                as="textarea" 
                placeholder="Date (entered YYYY-M-D)" 
                value = {date}
                onChange = {(e) => setDate(e.target.value)}
                /> */}
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "Where to View" 
                label = "Where to View" 
                value = {whereToView}
                onChange = {(e) => setWhereToView(e.target.value)}
            />
            
            
            {/* <Form.Control 
                as="textarea" 
                placeholder="Where to View" 
                value = {whereToView}
                onChange = {(e) => setWhereToView(e.target.value)}
                /> */}
            
            <br></br>

            <button type="submit">Build Show!</button>  
            </Form.Group>
        </Form> 
    </div>
    
    ) : (null)

}

    <h1>{show.name}</h1>
        
        



    

    {show.length === 0 ? (null) : (
        <div>
            <ShowCard show = {show}/>
            <h1>Match Builder</h1>

            <Form onSubmit = {submitMatch}>
        <Form.Group>
        <Form.Field 
                control = {Input}
                placeholder= "Match Type" 
                label = "Match Type" 
                value = {matchType}
                onChange = {(e) => setMatchType(e.target.value)}
        />

        {/* <Form.Control 
            as="textarea" 
            placeholder="Match Type" 
            value = {matchType}
            onChange = {(e) => setMatchType(e.target.value)}
            /> */}

            <br></br>

        <Form.Field 
            control = {Input}
            placeholder= "Storyline"
            label = "Storyline"
            value = {storyLine}
            onChange = {(e) => setStoryline(e.target.value)}
            style={{ width: '500px', height: '80px', }}
        />
    
        {/* <Form.Control
            as="textarea"
            placeholder="Storyline"
            value = {storyLine}
            onChange = {(e) => setStoryline(e.target.value)}
            style={{ height: '100px' }}
            /> */}
    
        <br></br>
    
        <button 
            style={{width: '80px', height: '40x',}}
            type="submit">
            Build Match
        </button>

        </Form.Group>
    </Form>
    
    </div>
    
    )}

    {show.length === 0 ? (null): ([wrestlerLine])}

    <h1>Current Show</h1>

    {/* {renderCompletedMatches} Delete after figuring this out */}


    <h1>Upcoming Shows</h1>


        {renderUpcomingShows}

    </div>
)}

export default MatchBuilder;
