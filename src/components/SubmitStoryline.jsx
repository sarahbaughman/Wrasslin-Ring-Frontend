import React, {useState, useEffect, useContext} from 'react'
// import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from './../context/UserContext';
import { Card, Button, Input, Form} from 'semantic-ui-react'



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
            <div>
            <Card className = 'card-div' style = {{backgroundColor: '#f7b334', margin: 'auto', display: 'inline-block', marginLeft: '10px', marginRight: '10px'}}>
                <Card.Content>

                    <Card.Header style = {{color : 'black'}}>{match.type}</Card.Header>
                    <Card.Description>{match.storyline}</Card.Description>
                    <br></br>
                    <Card.Description style = {{color : 'black'}}> <strong> Wrestlers: </strong> </Card.Description>
                    <br></br>
                    <Card.Description >{match.proposed_match_wrestlers.map(wrestler => <li style = {{listStyleType: 'none'}}>{wrestler.user.name}</li>)}</Card.Description>
                    {/* <br></br>
                    <Button basic color='orange'> Edit Match Idea </Button>
                    <br></br><br></br>
                    <Button basic color='black'> Delete Match Idea </Button> */}

                </Card.Content>
            </Card>
            </div>
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
        <li style = {{listStyleType: 'none', color: 'white'}}>
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
                    style = {{color: 'white'}}
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



    return (
        <div style = {{border :"solid 2px purple", display: 'inline-block', color: 'white'}}>

            <h1 className= 'custom-heading'> Storyline Ideas</h1>

            <Form onSubmit = {submitProposedMatch} style = {{margin: 'auto', justify: 'center', outline: 'blue 2px solid'}}>
            <Form.Group style = {{margin: 'auto', justify:}}>
                <Form.Field  
                    control = {Input}
                    placeholder = "Match Type" 
                    label = "Match Type" 
                    value = {subMatchType}
                    onChange = {(e) => setSubMatchType(e.target.value)}
                    style = {{width: '200px'}}
                    />

                <br></br>

    
                <Form.Field 
                    control = {Input}
                    placeholder="Storyline"
                    label = "Storyline"
                    value = {subStoryline}
                    onChange = {(e) => setSubStoryline(e.target.value)}
                    style={{width: '500px'}}
                    />
                <Button type = 'submit' style = {{backgroundColor: '#f7b334', color: 'black', marginTop: '24px', height: '29px', width: '130px'}}>Submit Match Idea!</Button>
            </Form.Group>
                <br></br>
                {wrestlerLine}
                
            </Form>
            <div style = {{display: 'flex', flexWrap: 'wrap', margin: 'auto'}}>
            {renderMatchCard}
            </div>
        </div>
    )
}

export default SubmitStoryline