import { AppBar, Box, Container, Tab, Tabs, TextField, Typography, Button } from "@mui/material";
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

const CreateUserTests = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        // Add your form submission logic here
        console.log('Form submitted!');
    };

    return(
        <Container maxWidth="sm">
            <Tabs value={value} onChange={handleChange}
                TabIndicatorProps={{ sx: {  backgroundColor: "#F26B3A", height: 4, bottom: 2} }}  //Change Tab color to orange
                textColor="none">
                <Tab label="Check Status" className={classes.tab} />
                <Tab label="Key-value" className={classes.tab} />
            </Tabs>

            <Box 
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                aria-labelledby={`simple-tab-${0}`}
            >
              <Typography style={{ marginTop: '20px' }}>Check Status</Typography>

              <TextField label="Status Code" fullWidth margin="normal" />

              <Button 
                variant="contained" 
                size="small" 
                style={{ backgroundColor: "#F26B3A", marginTop: '10px' }} 
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Box>
  
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