import { useContext, useState } from 'react';

import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Typography } from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/common-utils';
import { getData } from '../service/api';

//components
import Form from "./Form";
import SelectTab from './SelectTab';
import SnackBar from './SnackBar';
import Header from './Header';
import Response from './Response';
import ErrorScreen from './ErrorScreen';

const useStyles = makeStyles({
    component: {
        width: '60%',
        margin: '20px auto 0 auto'
    }
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
            setStatus(500);
            setError(true);
            return false;
        }

        let response = await getData(formData, jsonText, paramData, headerData);
        console.log(response.status);

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
            <Box className={classes.component}>
                <Form onSendClick={onSendClick} />
                <SelectTab />
                <Typography mt={3}>Response </Typography>
                <Typography mt={1} mb={2}>Status: {status}</Typography>
                { errorResponse ? <ErrorScreen /> : <Response status = {status} data={apiResponse} /> }
            </Box>
            { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} />}
        </>
    )
}

export default Home;