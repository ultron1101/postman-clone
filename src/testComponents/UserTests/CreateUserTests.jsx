import { Snackbar, Box, Container, Tab, Tabs, TextField, Typography, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
    tab: {
        textTransform: ['none', '!important'],
        '&::active': {
            border: '1px solid #fff'
        }
    }
})

const CreateUserTests = ({ onSubmit }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        console.log('Form submitted!');
    };

    //<---------Check status code Form----------->
    const [statusFormData, setStatusFormData] = useState({
      code: null,
      message: '',
    });

    const statusFormHandleChange = (e) => {
      setStatusFormData({ ...statusFormData, [e.target.name]: e.target.value });
    };

    const statusHandleSubmit = (e) => {
      e.preventDefault();
  
      // Check if both code and message fields are filled
      if (statusFormData.code === null || statusFormData.message.trim() === '') {
        alert('Please fill in all fields');
        return;
      }
      
      onSubmit(statusFormData);
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
        
              <TextField label="Key" fullWidth margin="normal" />
              <TextField label="Value" fullWidth margin="normal" />

              <Button 
                variant="contained" 
                size="small" 
                style={{ backgroundColor: "#F26B3A", marginTop: '10px' }} 
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Box>
      </Container>
    )

}

export default CreateUserTests;