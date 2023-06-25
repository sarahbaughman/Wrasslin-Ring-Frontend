import React, {useState, useEffect, useContext} from 'react'
import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from './../context/UserContext';
import { Card } from 'semantic-ui-react'


function SubmitStoryline(){
    const [subMatchType, setSubMatchType] = useState("")
    const [subStoryline, setSubStoryline] = useState("")
    // Grabbing all wrestlers so they show up in the wrestler selection
    const [wrestlers, setWrestlers] = useState([])
    //Wrestlers that are selected
    const [selectedWrestlers, setSelectedWrestlers] = useState([]);

    const [matchData, setMatchData] = useState([])

    const { user } = useContext(UserContext);

    const renderMatchCard = matchData.map(match => {   

    return <Card
            header={match.type}
            meta={match.storyline}
            description = "Hello"
            extra = {match.proposed_match_wrestlers.map(wrestler => <li>{wrestler.user.name}</li>)}
            // description = {match.proposed_match_wrestlers.map(wrestler => {wrestler.name}</li> )}
        />
        }
        )


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
        console.log("Match Data")
        console.log(matchData)
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
            // .then(propMatchData => console.log(propMatchData));
            }
        })

    }



    return (
        <div>

            <h1> Hello from the Storyline</h1>

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

        </div>
    )
}

export default SubmitStoryline