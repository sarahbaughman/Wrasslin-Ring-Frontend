import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserContext } from '../context/UserContext';
// import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ShowCard from './ShowCard'

function MatchBuilder() {
  const { user } = useContext(UserContext);
  const [wrestlers, setWrestlers] = useState([]);
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);



    useEffect(() => {
    fetch('/users')
        .then((r) => r.json())
        .then((user) => setWrestlers(user));
    }, []);

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

const wrestlerLine = wrestlers.map((wrestler) => (
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
));

// choose wrestlers stuff 
  // __________________________________
// match builder stuff
    const [matchType, setMatchType] = useState('')
    const [storyLine, setStoryline] = useState('')
    const [matches, setMatches] = useState([])
    const [show, setShow] = useState([])

    
    const resetMatchForm = () => {
        setMatchType("")
        setStoryline("")
    }

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

    function submitMatch(event) {
        event.preventDefault();
    
        const newMatch = {
            type: matchType,
            storyline: storyLine,
            show_id: show.id,
        };

        fetch('/matches', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newMatch),
        })
            .then((r) => {
                if (r.status === 201) {
                
                return r.json().then((newMatchData) => {
                    setMatches(newMatchData);
                    resetMatchForm();

                selectedWrestlers.map((wrestler) => {
                    fetch('/matchwrestlers', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: wrestler.id,
                        match_id: newMatchData.id,
                    }),
                })
                    .then((r) => {
                        if (r.status === 201) {
                        return r.json().then((newMatchWrestler) =>
                            console.log(newMatchWrestler)
                        );
                        }
                    })
                    .catch((error) => {
                        console.error("Error creating match wrestler:", error);
                    });
                });

                setSelectedWrestlers([]);
            });
            }
            })
            .catch((error) => {
                console.error("Error creating match:", error);
        });
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

        console.log("show")
        console.log(show)

        const resetShowForm = () => {
            setShowName("")
            setVenueName("")
            setStreetAddress("")
            setCity("")
            setState("")
            setDate("")
            setWhereToView("")
        }
        





// _____________________________
    // if (!user){
    //     return <Redirect to='/'/>
    // }

return (
    <div>

    
    {show.length === 0 ? (
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
   </div>
    
    ) : (null)

}

    <h1>{show.name}</h1>
        
        



    

    {show.length === 0 ? (null) : (
    <div>
    <h1>Match Builder</h1>
    <ShowCard show = {show}/>
   
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
    
    </div>
    
   )}

   {show.length === 0 ? (null): ([wrestlerLine])}

    </div>
)  
}

export default MatchBuilder;
