import React, {useState, useEffect, useContext} from 'react'
import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from './../context/UserContext';
import { Card, Button } from 'semantic-ui-react'


function SubmitStoryline(){
    const { user } = useContext(UserContext);
    //Form state 
    const [subMatchType, setSubMatchType] = useState("")
    const [subStoryline, setSubStoryline] = useState("")

    // Grabbing all wrestlers so they show up in the wrestler selection
    const [wrestlers, setWrestlers] = useState([])

    //Wrestlers that are selected
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);
    
    //Pulling proposed matches that have been suggested by this wrestler
    const [matchData, setMatchData] = useState([])


    // console.log("selected wrestlers")
    // console.log(selectedWrestlers)
    
    // console.log("MatchData")
    // console.log(matchData)
    

    //creating match card for each match in matchData
    const renderMatchCard = matchData.map(match => {   

        console.log(match.proposed_match_wrestlers)

        // const editPropMatchCard = () => {
        //     setSelectedWrestlers([])
        //     setSubMatchType(match.type)
        //     setSubStoryline(match.storyline)
        //     // setMychecked(!mychecked)
        //     {match.proposed_match_wrestlers.map(wrestler => setSelectedWrestlers(prevSelectedWrestlers => [...prevSelectedWrestlers, wrestler.id]))}
        //     // {match.proposed_match_wrestlers.map(wrestler => setSelectedWrestlers([...selectedWrestlers, wrestler]))}
        //     // console.log("After")
        //     // console.log(selectedWrestlers)
        // }

        return (

            <Card>
                <Card.Content>

                    <Card.Header>{match.type}</Card.Header>
                    <Card.Description>{match.storyline}</Card.Description>
                    <br></br>
                    <Card.Description> <strong> Wrestlers: </strong> </Card.Description>
                    <br></br>
                    <Card.Description>{match.proposed_match_wrestlers.map(wrestler => <li style = {{listStyleType: 'none'}}>{wrestler.user.name}</li>)}</Card.Description>
                    <br></br>
                    <Button basic color='orange'> Edit Match Idea </Button>
                    <br></br><br></br>
                    <Button basic color='black'> Delete Match Idea </Button>

                </Card.Content>
            </Card>
    )})


//Grabs all wrestler users
    useEffect(() => {
    fetch('/users')
        .then((r) => r.json())
        .then((data) => setWrestlers(data));
    }, []);

    useEffect(() => {
        fetch('/proposedmatchesbyuserid')
            .then((r) => r.json())
            .then((data) => setMatchData(data));
        }, [])
  

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

    // Creates list of wrestler names with the checked box
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

    //Clears form once proposed match is submitted
    const resetProposedMatchForm = () => {
        setSubMatchType("")
        setSubStoryline("")
    }

    //Posts match to ProposedMatch and ProposedMatchWrestler
    function submitProposedMatch (event) {
        event.preventDefault();

        const wrestlersArr = selectedWrestlers.map((wrestler) => {
            return {
                user_id: wrestler.id
            }
            })
        
        const matchPost = {
            match : {
                type: subMatchType,
                storyline: subStoryline,
                submitted_user_id : user.id,
                submitted_user_name : user.name,
            },
        
            wrestlers: wrestlersArr
        }

        fetch('/proposedmatches', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(matchPost),
        })
        .then((r) => {
            if (r.status === 201) {
                return r.json()
            .then(propMatchData => setMatchData([...matchData, propMatchData]));
        }
        })
        resetProposedMatchForm()
        setSelectedWrestlers([])
    }


    const [mychecked, setMychecked] = useState(false)
    return (
        <div>

            <h1> Storyline Ideas</h1>

            <form onSubmit = {submitProposedMatch}>
                <Form.Control 
                    as="textarea" 
                    placeholder="Match Type" 
                    value = {subMatchType}
                    onChange = {(e) => setSubMatchType(e.target.value)}
                    />

                <br></br>
    
                <Form.Control
                    as="textarea"
                    placeholder="Storyline"
                    value = {subStoryline}
                    onChange = {(e) => setSubStoryline(e.target.value)}
                    style={{ height: '100px' }}
                    />
            
                <br></br>
                {wrestlerLine}
                <button type="submit">Submit Match</button>
                
            </form>

            {renderMatchCard}

            <form>
                <input
                    label = "Label"
                    type="checkbox"
                    checked={mychecked}
                    onChange={e => setMychecked(e.target.checked)}
                />
            </form>
        </div>
    )
}

export default SubmitStoryline