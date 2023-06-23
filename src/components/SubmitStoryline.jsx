import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function SubmitStoryline(){
    const [subMatchType, setSubMatchType] = useState("")
    const [subStoryline, setSubStoryline] = useState("")
    // Grabbing all wrestlers so they show up in the wrestler selection
    const [wrestlers, setWrestlers] = useState([])
    //Wrestlers that are selected
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

// const wrestlerObj = selectedWrestlers.map(wrestler => {
//     user_id: wrestler.id;
//     match_id: newMatchData.id;
// }
// )

// const to_back = {
//                     match : {
//                         type: subMatchType,
//                         storyline: subStoryline,
//                     },

//                     match_wrestlers: [wrestlerObj]

// }
        
        console.log(selectedWrestlers)

    return (
        <div>

            <h1> Hello from the Storyline</h1>

            {/* <form onSubmit = {submitMatch}> */}
            <form>
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

        </div>
    )
}

export default SubmitStoryline