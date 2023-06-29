import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserContext } from '../context/UserContext';
// import Form from 'react-bootstrap/Form';
// import ShowCard from './ShowCard'
// import {Redirect} from 'react-router-dom'
// import MatchCard from './MatchCard'
import {Card,Form,Input, Button} from 'semantic-ui-react'
import './buildshow.css'



function MatchBuilder() {
    const { user } = useContext(UserContext);


    const [wrestlers, setWrestlers] = useState([]);
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);
    const [editMode, setEditMode] = useState(false)

    const [editingShow, setEditingShow] = useState()

    const [editingMatch, setEditingMatch] = useState([])
    const [editingMatchMode, setEditingMatchMode] = useState(false)


//Grabs all wrestler users
    useEffect(() => {
    fetch('/users')
        .then((r) => r.json())
        .then((data) => setWrestlers(data));
        setEditMode(false)
    }, []);



//Creates list of wrestlers with their checked boxes
    const wrestlerLine = wrestlers.map((wrestler) => (
        <li style = {{listStyleType: 'none'}}>
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

// choose wrestlers stuff 
// __________________________________


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
            .then(newMatchData => setMatches(newMatchData));
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

//Current Show Card with Matches
const [currentShow, setCurrentShow] = useState([])
    
    useEffect(() => {
        if (show) {
            fetch("/promotorupcomingshows")
            .then((response) => {
            if (response.ok) {
                response.json()
            .then(data => {
                const filterForCurrent = data.filter(showObj => showObj.id === show.id)
                setCurrentShow(filterForCurrent);
            });
            }
            });
        }
    }
    , [matches, show])

    const renderCurrentShow = currentShow.map(show => {

        const dateParts = show.date.split('-');
        const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;

        const editShowClick = () => {
            setEditMode(true)
            setShowName(show.name)
            setVenueName(show.venue)
            setStreetAddress(show.address)
            setCity(show.city)
            setState(show.city)
            setDate(show.date)
            setWhereToView(show.where_to_view)
            setEditingShow(show)
            setShow([])
            setCurrentShow([])
        }

        function onShowDelete(id) {
            const updatedUpcomingShows = upcomingShows.filter((show) => show.id !== id);
            setUpcomingShows(updatedUpcomingShows);
        }

        function deleteShowClick() {
            
            fetch(`/shows/${show.id}`, {
                method: 'DELETE',
            })
            onShowDelete(show.id)
            setShowName('')
            setVenueName('')
            setCity('')
            setState('')
            setDate('')
            setWhereToView('')
            setShow([])
        }

        function completeShow() {
            setShow([])
        }

        

        return (
            <Card style = {{width: "90%"}} >
                <Card.Content >

                    <Card.Header>{show.name}</Card.Header>
                    <Card.Description>{formattedDate}</Card.Description>
                    <Card.Description><strong>Location:</strong> {show.venue},  {show.address},  {show.city}, {show.state}</Card.Description>
                    <Card.Description><strong>Aired: </strong>{show.where_to_view}</Card.Description>
                    <br></br>
                    <Button basic color='black' onClick = {editShowClick}><strong>Edit Show</strong></Button>
                    <Button basic color='black' onClick = {deleteShowClick}><strong>Delete Show</strong></Button>
                    <Button basic color='black' onClick = {completeShow}><strong>Finish Building</strong></Button>
                    <br></br>
                    <br></br>
                    <Card.Header>Matches:</Card.Header>
                    {show.matches.map(match => {

                        const editMatch = () => {
                            setEditingMatch([match])
                            setShow([show])
                            setEditingMatchMode(true)
                            setMatchType(match.type)
                            setStoryline(match.storyline)
                            setSelectedWrestlers([])
                        }

                        function deleteMatchClick() {
                            
                            fetch(`/matches/${match.id}`, {
                                method: 'DELETE',
                            })
                            setEditingMatch(false)
                        }


                        return (
                            <Card style = {{width: "100%"}}>
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
                                    <Button basic color='black' onClick = {editMatch}><strong>Edit Match</strong></Button>
                                    <Button basic color='black' onClick = {deleteMatchClick}><strong>Delete Match</strong></Button>
                                </Card.Content>
                            </Card>
                        )
                    })}

                </Card.Content>

            </Card>
            
        )

    })



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
    , [matches, editingShow, editingMatch]);
        
        

    const sortedShows = upcomingShows.sort((a, b) => new Date(a.date) - new Date(b.date))

    const renderUpcomingShows = sortedShows.map(show => {

        const editShowClick = () => {
            setEditMode(true)
            setShowName(show.name)
            setVenueName(show.venue)
            setStreetAddress(show.address)
            setCity(show.city)
            setState(show.city)
            setDate(show.date)
            setWhereToView(show.where_to_view)
            setEditingShow(show)
            setShow([])
            setCurrentShow([])
        }

        

        function onShowDelete(id) {
            const updatedUpcomingShows = upcomingShows.filter((show) => show.id !== id);
            setUpcomingShows(updatedUpcomingShows);
        }

        function deleteShowClick() {
            
            fetch(`/shows/${show.id}`, {
                method: 'DELETE',
            })
            onShowDelete(show.id)
            setShowName('')
            setVenueName('')
            setCity('')
            setState('')
            setDate('')
            setWhereToView('')
            setEditMode(false)
        }

        function addMoreMatches(){
            setShow(show)
        }


        
        const dateParts = show.date.split('-');
        const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;

        return (
            <Card style = {{width: "90%"}}>
                <Card.Content>

                    <Card.Header>{show.name}</Card.Header>
                    <Card.Description><strong>Date:</strong> {formattedDate}</Card.Description>
                    <Card.Description><strong>Location:</strong> {show.venue},  {show.address},  {show.city}, {show.state}</Card.Description>
                    <Card.Description><strong>Aired: </strong>{show.where_to_view}</Card.Description>
                    <br></br>
                    <Button basic color='black' onClick = {editShowClick}><strong>Edit Show</strong></Button>
                    <Button basic color='black' onClick = {deleteShowClick}><strong>Delete Show</strong></Button>
                    <Button type="button" onClick = {addMoreMatches}> Add More Matches </Button>
                    <br></br>
                    <br></br>
                    <Card.Header>Match Lineup:</Card.Header>
                    {show.matches.map(match => {
                        console.log(match)

                    

                        const editMatch = () => {
                            setEditingMatch([match])
                            setShow([show])
                            setEditingMatchMode(true)
                            setMatchType(match.type)
                            setStoryline(match.storyline)
                            setSelectedWrestlers([])
                        }

                        function deleteMatchClick() {
                            
                            fetch(`/matches/${match.id}`, {
                                method: 'DELETE',
                            })
                            setEditingMatch(false)
                            setEditMode(false)
                        }
                
                        
                        return (
                            <Card style = {{marginTop: '5px', width: '100%', border: '3px double black'}}>
                                <Card.Content style = {{backgroundColor:'#f7b334', color: 'black'}}>
                                    <Card.Header>{match.type}</Card.Header>
                                    <Card.Description style = {{color: 'black'}}><strong>Storyline: </strong>{match.storyline}</Card.Description>
                                    <br></br>
                                    <Card.Description><strong>Wrestlers:</strong></Card.Description>
                                    {match.match_wrestlers.map(wrestler => {
                                        return (
                                        <Card.Description>{wrestler.user.name}</Card.Description>
                                        )
                                    })}
                                    <Button basic color='orange' onClick = {editMatch}><strong>Edit Match</strong></Button>
                                    <Button basic color='black' onClick = {deleteMatchClick}><strong>Delete Match</strong></Button>
                                </Card.Content>
                            </Card>
                        )
                    })}

                </Card.Content>

            </Card>
            
        )

        })
        
// --------------------------------------------------------------------------------
// Submit edited show information 

    function submitShowEdit(event) {
        event.preventDefault();

        const editedShow = {
            name: showName,
            venue: venueName,
            address: streetAddress,
            city: city,
            state: state,
            date: date,
            where_to_view: whereToView,
        };

        fetch(`/shows/${editingShow.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedShow),
        })
        .then((r) => {
            if (r.status === 200) {
                return r.json().then(() => {
                // console.log(show)
                resetShowForm();
                setEditingShow()
                setEditMode(false)
                });
            }
        });

        const resetShowForm = () => {
            setShowName("");
            setVenueName("");
            setStreetAddress("");
            setCity("");
            setState("");
            setDate("");
            setWhereToView("");
        };
        
    }

// ---------------------------------------
    console.log(selectedWrestlers)
    console.log(editingMatch)
    
    function submitMatchEdit(event) {
        event.preventDefault();

        const wrestlersArr = selectedWrestlers.map((wrestler) => {
            return {
                user_id: wrestler.id
            }
        })

        const editedMatch = {
            match : {
                type: matchType,
                storyline: storyLine,
            },
        
            wrestlers: wrestlersArr
        }

        fetch(`/matches/${editingMatch[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedMatch),
        })
        .then((r) => {
            if (r.status === 200) {
                return r.json().then(() => {
                    setMatchType("");
                    setStoryline("");
                    setSelectedWrestlers([])
                    resetMatchForm();
                    setEditingMatch([])
                    setEditingMatchMode(false)
                    setShow([])
                });
            }
        });
    }

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

            <br></br>
            <Form.Field 
                control = {Input}
                placeholder="Venue Street Address" 
                label = "Venue Street Address"
                value = {streetAddress}
                onChange = {(e) => setStreetAddress(e.target.value)}
            />
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder="City" 
                label = "City"
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
            />
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "ex: NY"
                label = "State" 
                value = {state}
                onChange = {(e) => setState(e.target.value)}
                style = {{width: '80px'}}
            />

            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "Enter as YYYY-M-D"  
                label = "Date"
                value = {date}
                onChange = {(e) => setDate(e.target.value)}
            />
            
            <br></br>

            <Form.Field 
                control = {Input}
                placeholder= "Where to View" 
                label = "Where to View" 
                value = {whereToView}
                onChange = {(e) => setWhereToView(e.target.value)}
            />

            <br></br>
            {!editMode ? (
                <Button type="button">Build Show!</Button>
                ): (<Button type="button" onClick = {submitShowEdit} >Finish Editing Show</Button>)}
            </Form.Group>
        </Form> 
    </div>
    
    ) : (null)

}
{/* && editingMatch.length === 0  */}
    {show.length === 0 ? (null) : (
        <div>
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

            <br></br>

        <Form.Field 
            control = {Input}
            placeholder= "Storyline"
            label = "Storyline"
            value = {storyLine}
            onChange = {(e) => setStoryline(e.target.value)}
            style={{ width: '500px', height: '80px', }}
        />
    
        <br></br>

        {editingMatchMode ? (
                <button type="button" onClick = {submitMatchEdit} style = {{height: "25px"}}>Finish Editing Match</button>): 
                <button style={{width: '80px', height: '40x',}} type="submit"> Build Match </button>}
        

        </Form.Group>
    </Form>
    
    </div>
    
    )}

    {show.length === 0 ? (null): ([wrestlerLine])}

    { currentShow.length === 0 ? (null) :( <h1>Current Show</h1> ) }
    {renderCurrentShow}
    
    <h1>Upcoming Shows</h1>

        {renderUpcomingShows}

    </div>
)}

export default MatchBuilder;
