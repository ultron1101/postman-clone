import { Box, Container, Tab, Tabs, TextField, Typography, Button, MenuItem } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState } from "react";

const useStyles = makeStyles({
    tab: {
        textTransform: ['none', '!important'],
        '&::active': {
            border: '1px solid #fff'
        }
    }
})

const TestsValue = [
  {
    value: 'Greater Than',
    label: 'Length or Value Greater Than (>)',
  },
  {
    value: 'Less Than',
    label: 'Length or Value Less Than (<)',
  },
  {
    value: '>=',
    label: 'Length or Value Greater Than equals to (>=)',
  },
  {
    value: '<=',
    label: 'Length or Value Less Than equal to (<=)',
  },
  {
    value: '==',
    label: 'Equals to (==)'
  },
  {
    value: 'Length Equals',
    label: 'Length Equals'
  },
  {
    value: 'email',
    label: 'Is Valid Email'
  },
  {
    value: 'type',
    label: 'Type Check'
  }
]

const CreateUserTests = ({ onSubmit }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //<---------Check status code Form----------->
    const [statusFormData, setStatusFormData] = useState({
      type: 'status',
      code: null,
      message: '',
    });

    const statusFormHandleChange = (e) => {
      setStatusFormData({ ...statusFormData, [e.target.name]: e.target.value });
    };

    const statusFormClear = () => {
      setStatusFormData({type: 'status', code: '', message: ''});
    }

    const statusHandleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if both code and message fields are filled
      if (statusFormData.code === null && statusFormData.code <= 200 && statusFormData.code >= 599) {
        alert('Invalid Status code Entered');
        return;
      }

      const statusResponse = await fetch('http://localhost:8080/api/customTests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: statusFormData.type,
          code: statusFormData.code,
          message: statusFormData.message,
          comparator: '',
          attribute: '',
          expected_value: '',
        }),
      });

      onSubmit(statusFormData);
      statusFormClear();
    };


    //<---------Check key-value Form----------->
    const [KeyValFormData, setKeyValFormData] = useState({
      type: 'key-value',
      key: '',
      comparator: '',
      value: '',
      message: '',
    });

    const KeyValFormHandleChange = (e) => {
      setKeyValFormData({ ...KeyValFormData, [e.target.name]: e.target.value });
    };

    const KeyValFormClear = () => {
      setKeyValFormData({type: 'key-value', key: '', comparator: '', value: '', message: ''});
    }

    const KeyValHandleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if both code and message fields are filled
      if (KeyValFormData.key === '' || KeyValFormData.comparator === '') {
        alert('Please fill in Attribute and Test Scenario');
        return;
      }

      const statusResponse = await fetch('http://localhost:8080/api/customTests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: KeyValFormData.type,
          code: '',
          message: KeyValFormData.message,
          comparator: KeyValFormData.comparator,
          attribute: KeyValFormData.key,
          expected_value: KeyValFormData.value,
        }),
      });

      onSubmit(KeyValFormData);
      KeyValFormClear();
    };

    return(
        <Container maxWidth="sm">
            <Tabs value={value} onChange={handleChange}
                TabIndicatorProps={{ sx: {  backgroundColor: "#F26B3A", height: 4, bottom: 2} }}  //Change Tab color to orange
                textColor="none">
                <Tab label="Check Status" className={classes.tab} />
                <Tab label="Key-value" className={classes.tab} />
            </Tabs>

            {/*------Checking Status tab Form-----------*/}
            <Box 
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                aria-labelledby={`simple-tab-${0}`}
            >
              <Typography style={{ marginTop: '20px' }}>Check Status</Typography>

              <TextField 
                  label="Status Code" 
                  name="code"
                  value={statusFormData.code}
                  onChange={statusFormHandleChange}
                  fullWidth margin="normal" />
              <TextField 
                  label="Enter Message" 
                  name="message"
                  value={statusFormData.message}
                  onChange={statusFormHandleChange}
                  fullWidth margin="normal" />

              <Button 
                variant="contained" 
                size="small" 
                style={{ backgroundColor: "#F26B3A", marginTop: '10px' }} 
                onClick={statusHandleSubmit}
              >
                Create
              </Button>
            </Box>

            {/*------Checking by Key Value pair Form-----------*/}
            <Box 
                role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-${1}`}
                aria-labelledby={`simple-tab-${1}`}
            >
              <Typography style={{ marginTop: '20px' }}>Check by key value</Typography>
        
              <TextField 
                name="key"
                value={KeyValFormData.key}
                onChange={KeyValFormHandleChange}
                sx={{"& .MuiInputBase-root": {height: 50}}} 
                label="Attribute" 
                fullWidth margin="normal" />

              <TextField
                sx={{"& .MuiInputBase-root": {height: 50}}}
                name='comparator'
                select
                label="Select"
                value={KeyValFormData.comparator}
                helperText="Select your Test Scenario"
                fullWidth margin="normal"
                onChange={KeyValFormHandleChange}
              >
              {TestsValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>

              <TextField 
                name="value"
                value={KeyValFormData.value}
                onChange={KeyValFormHandleChange}
                sx={{"& .MuiInputBase-root": {height: 50}}}
                label="Expected Value" 
                fullWidth margin="normal" />

              <TextField
                name="message"
                value={KeyValFormData.message}
                onChange={KeyValFormHandleChange}
                sx={{"& .MuiInputBase-root": {height: 50}}}
                label="Message" 
                fullWidth margin="normal" />

              <Button 
                variant="contained" 
                size="small" 
                style={{ backgroundColor: "#F26B3A", marginTop: '10px' }} 
                onClick={KeyValHandleSubmit}
              >
                Create
              </Button>
            </Box>
      </Container>
    )

}

export default CreateUserTests;