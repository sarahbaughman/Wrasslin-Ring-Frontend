import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import WrestlerSignup from './WrestlerSignup'
import PromotorSignup from './PromotorSignup';

function SwitchLabel() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

return (
    <div>
    <h2>Are you signing up as a....</h2>
    <FormGroup>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>Wrestler</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
      <Typography>Promotor</Typography>
    </Stack>
  </FormGroup>
  {!checked ? <WrestlerSignup/> : <PromotorSignup/>}
 
  </div>
  );
}
export default SwitchLabel

