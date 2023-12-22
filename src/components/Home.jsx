import { useContext, useState } from 'react';

import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/common-utils';
import { getData } from '../service/api';

//components
import Form from "./Form";
import SelectTab from './SelectTab';
import SnackBar from './SnackBar';
import Header from './Header';
import Tests from '../testComponents/Tests';
import ResponseTab from './ResponseTab';

const useStyles = makeStyles({
    component: {
        width: '70%',
        margin: '20px auto 0 auto'
    },
    sidebar: {
        background: ['#FFFFFF', '!important'],
        border: '1px solid rgba(224, 224, 224, 1)',
    },
})


const Home = () => {
    const classes = useStyles();
    
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({})
    const [status, setStatus] = useState(null);

    const { formData, jsonText, paramData, headerData } = useContext(DataContext);
    

    const onSendClick = async () => {

        setStatus(null);

        if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
            setStatus(422);
            setError(true);
            return false;
        }

        let response = await getData(formData, jsonText, paramData, headerData);
        //console.log(response.status);

        if (response === 'error') {
            setErrorResponse(true);
            setStatus(404);
            return;
        }
        setApiResponse(response.data);
        setStatus(response.status);
    }


    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh' }}>
            <Grid container spacing={2}>
                {/* Main Postman clone */}
                <Grid item xs={12} md={8}>
                <Box className={classes.component}>
                    <Form onSendClick={onSendClick} />
                    <SelectTab />
                    <ResponseTab status={status} data={apiResponse} errorResponse={errorResponse} />
                    
                </Box>
                </Grid>

                {/* Sidebar Tests */}
                <Grid className={classes.sidebar} item xs={12} md={4}>
                    <Tests />
                </Grid>
            </Grid>
            </Box>
            
            { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} />}
        </>
    )
}

export default Home;