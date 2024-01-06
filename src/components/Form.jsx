import { useContext } from 'react';

import { Select, MenuItem, TextField, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { DataContext } from '../context/DataProvider';

const useStyles = makeStyles({
    component: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    select: {
        width: 150,
        height: 40,
        background: '#F6F6F6'
    },
    button: {
        width: 100,
        height: 40,
        marginLeft: [5, '!important']
    },
    textfield: {
        width: '100%',
        background: '#F6F6F6'
    }
})

const Form = ({ onSendClick }) => {
    const classes = useStyles();

    const { formData, setFormData } = useContext(DataContext);

    const onUrlChange = (e) => {
        //{...formData} is the old Form data replaced by
        //sets value for url: which takes url when changed
        setFormData({ ...formData, url: e.target.value });
    }

    const handleChange = (e) => {

        //{...formData} is the old Form data replaced by
        //sets value for type: which takes GET/POST method when changed
        setFormData({ ...formData, type: e.target.value });
    }

    return (
        <Box className={classes.component}>

            {/* Dropdown for Selecting Methods */}
            <Select 
                className={classes.select} 
                value={formData.type}                   //Binds which method(GET/POST) user has chosen 
                label="GET" 
                onChange={(e) => handleChange(e)}
            >
                <MenuItem value={'GET'}>GET</MenuItem>
                <MenuItem value={'POST'}>POST</MenuItem>
                <MenuItem value={'PUT'}>PUT</MenuItem>
                <MenuItem value={'DELETE'}>DELETE</MenuItem>
            </Select>

            {/* Search bar for Entering URL */}
            <TextField 
                size="small"
                value={formData.url} 
                className={classes.textfield} 
                onChange={(e) => onUrlChange(e)}
            />

            {/* Send Button */}
            <Button className={classes.button} variant="contained" onClick={() => onSendClick()}>Send</Button>
        </Box>
    )
}

export default Form;