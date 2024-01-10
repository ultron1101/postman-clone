import { useContext, useState } from 'react';

import { Box, Button, IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/common-utils';
import { getData } from '../service/api';
import SaveIcon from '@mui/icons-material/Save';

//components
import Form from "./Form";
import SelectTab from './SelectTab';
import SnackBar from './SnackBar';
import Header from './Header';
import Tests from '../testComponents/Tests';
import ResponseTab from './ResponseTab';
import RequestHistory from './RequestHistory';

const useStyles = makeStyles({
    component: {
        width: '70%',
        margin: '20px auto 0 auto'
    },
    sidebar: {
        background: ['#FFFFFF', '!important'],
        //border: '1px solid rgba(224, 224, 224, 1)',
    },
})


const Home = () => {
    const classes = useStyles();
    
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({})
    const [status, setStatus] = useState(null);
    const [time, setTime] = useState(0);
    const [size, setSize] = useState(0);

    const { formData, jsonText, paramData, headerData } = useContext(DataContext);
    

    const onSendClick = async () => {

        setStatus(null);

        if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
            setStatus(422);
            setError(true);
            return false;
        }

        const StartTime = Date.now();
        let response = await getData(formData, jsonText, paramData, headerData);
        const EndTime = Date.now();
        const responseSize = JSON.stringify(response).length;

        if (response.status >= 299) {
            setStatus(response.status);
            setErrorResponse(true);
            return;
        }
        setApiResponse(response.data);
        setTime(EndTime - StartTime);
        setSize(responseSize);
        setStatus(response.status);
    }

    const saveData = async () => {

      const paramJson = JSON.stringify(paramData);
      const headerJson = JSON.stringify(headerData);

      let response = await getData(formData, jsonText, paramData, headerData);

      if(formData.url === ''){
        alert("Please Enter url first");
        return;
      }
    
      const backendResponse = await fetch('http://localhost:8080/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responseData: JSON.stringify(response), // Include the API response in the request body
          method: formData.type,
          url: formData.url,
          queryParameters: paramJson,
          headers: headerJson,
          statusCode: status,
          responseSize: size,
          responseTime: time,
          defaultTestCase: '',
        }),
      });

      const backendData = await backendResponse.json();
      console.log('Data sent to backend:', backendData);
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
                    <IconButton style={{ margin: '10px' }} onClick={saveData}>
                        <SaveIcon color="secondary" fontSize="large" />
                    </IconButton>
                    <SelectTab />
                    <ResponseTab status={status} time={time} size={size} data={apiResponse} errorResponse={errorResponse} />
                    <RequestHistory />
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