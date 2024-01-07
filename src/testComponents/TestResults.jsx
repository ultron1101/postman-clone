import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CustomTests from "./CustomTests";

const styles = {
    pass: {
        display: 'inline-block',
        padding: '1px',
        backgroundColor: '#9ADE7B',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
    },

    fail: {
        display: 'inline-block',
        padding: '1px',
        backgroundColor: '#D83A56',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
    }
}


// Checking for empty or null values
const checkAttributesNotEmpty = (jsonObj) => {
    //console.log('Checking attributes:', jsonObj);
 
    // Check if the object is empty
    if (Object.keys(jsonObj).length === 0) {
        //console.log('Empty object');
        return false;
    }
 
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            const value = jsonObj[key];
            //console.log(`${key}: ${value}`);
            if (value === null || (typeof value === 'string' && value.trim() === '')) {
                return false;
            }
        }
    }
    return true;
};

const TestResults = ({status, data}) => {

    //Creating Default test cases:
    const [validRequest, setValidRequest] = useState(false);
    const [TestResultsArr, setTestResultsArr] = useState([]);

    useEffect(() => {

        setValidRequest(status <= 400);
        setTestResultsArr([]); // Clear the array

        //Default Test case: 0
        const defaultTestCase0 = validRequest
            ? <Typography style={{ padding: '8px' }} key={0}>Default Test case 1: <span style={styles.pass}>Pass</span> : Valid Request Sent</Typography>
            : <Typography style={{ padding: '8px' }} key={0}>Default Test case 1: <span style={styles.fail}>Failed</span> : Invalid Request Sent</Typography>;

        //Default Test case: 1
        const allAttributesNotEmpty = checkAttributesNotEmpty(data);
        console.log('allAttributesNotEmpty:', allAttributesNotEmpty);
       
        const defaultTestCase1 = allAttributesNotEmpty
            ? <Typography style={{ padding: '8px' }} key={1}>Default Test case 2: <span style={styles.pass}>Pass</span> : No Empty or null value found</Typography>
            : <Typography style={{ padding: '8px' }} key={1}>Default Test case 2: <span style={styles.fail}>Failed</span> : Empty or null value found</Typography>;

        
            // Use a callback function when updating state based on the current state
        setTestResultsArr(prevResults => [...prevResults, defaultTestCase0, defaultTestCase1]);
        console.log(TestResultsArr);
    }, [status, data]);


    return (
        <>
        <p>Test Results: </p>
        <Container maxWidth="lg" style={{ border: '1px solid rgba(224, 224, 224, 1)'}}>
            {TestResultsArr.map((html) => html)}
            <CustomTests status={status} data={data}/>
        </Container>
        </>
    )
}

export default TestResults;