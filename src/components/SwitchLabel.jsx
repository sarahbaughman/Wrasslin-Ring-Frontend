import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import WrestlerSignup from './WrestlerSignup'
import PromotorSignup from './PromotorSignup';
import './switchlabel.css'


function SwitchLabel() {


    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

return (
    <div className = 'switch-label-div'>

      <h2>Are you signing up as a....</h2>
      <div className = 'switch'>
      <FormGroup className = 'formgroup'sx={{flexDirection: 'column',
            alignItems: 'center'}}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Wrestler</Typography>
          <Switch
            defaultChecked color="primary"
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            className = 'switch'
            />
          <Typography>Promotor</Typography>
        </Stack>
      </FormGroup>
      

      {!checked ? <WrestlerSignup /> : <PromotorSignup />}
      </div>

    </div>
  );
}
export default SwitchLabel

