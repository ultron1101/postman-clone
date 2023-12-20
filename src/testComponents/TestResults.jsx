import { Container } from "@mui/material";
import { useEffect, useState } from "react";

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


//Checking for empty or null values
const checkAttributesNotEmpty = (jsonObj) => {
    for(const key in jsonObj) {
        if(jsonObj.hasOwnProperty(key)) {
            const value = jsonObj[key];
            if(value === null || (typeof value === 'string' && value.trim() === '')) {
                return true;
            }
        }
    }
return false;
};

const TestResults = ({status, data}) => {

    //Creating Default test cases:
    const [validRequest, setValidRequest] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [TestResultsArr, setTestResultsArr] = useState([]);
    const [html, setHtml] = useState(null);

    useEffect(() => {

        if(status <= 299) setValidRequest(true);
        setTestResultsArr([]);

        //Default Test case: 0
        if(validRequest){
            setHtml(<p>Default Test case 0: <span style={styles.pass}>Pass</span> : Valid Request Sent</p>);
        } else {
            setHtml(<p>Default Test case 0: <span style={styles.fail}>Failed</span> : Invalid Request Sent</p>);
        }

        // Use a callback function when updating state based on the current state
        setTestResultsArr((prevResults) => [...prevResults, html]);

        const allAttributesNotEmpty = checkAttributesNotEmpty(data);
        setEmpty(allAttributesNotEmpty);

        //Default Test case: 1
        if(empty){
            setHtml(<p>Default Test case 1: <span style={styles.fail}>Fail</span> : Empty or null value found</p>);
        } else {
            setHtml(<p>Default Test case 1: <span style={styles.pass}>Pass</span> : No Empty or null value found</p>);
        }

        setTestResultsArr((prevResults) => [...prevResults, html]);
    }, [status, data]);

    console.log(TestResultsArr);

    return (
        <>
        <p>Test Results: </p>
        <Container maxWidth="lg" style={{ border: '1px solid rgba(224, 224, 224, 1)'}}>
            {TestResultsArr.map((html) => html)}
            {TestResultsArr.length}
        </Container>
        </>
    )
}

export default TestResults;