import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

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

const CustomTests = ({status, data}) => {

    const [customTests, setCustomTests] = useState([]);

    useEffect(() => {
        fetchTests();
      },[status, data]);

    const fetchTests = async () => {
        try {
          const testsArr = await axios.get('http://localhost:8080/api/customTests');
          setCustomTests(testsArr.data);
        
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
    };

    const Equals = (attributeValue, ExpectedValue) => {
        console.log(attributeValue, ExpectedValue);

        // Convert ExpectedValue to the type of attributeValue
        if (typeof attributeValue === 'number') {
          ExpectedValue = parseFloat(ExpectedValue);
        } else if (typeof attributeValue === 'boolean' && typeof ExpectedValue === 'string') {
            console.log(attributeValue, ExpectedValue);
            if (ExpectedValue.toLowerCase() === 'true' )
             ExpectedValue = true;
            else if (ExpectedValue.toLowerCase() === 'false')
             ExpectedValue = false;
        } else if (Array.isArray(attributeValue)) {
            // Handle array conversion as needed
            ExpectedValue = JSON.parse(ExpectedValue);
        } else if (ExpectedValue.toLowerCase() === 'null') {
            ExpectedValue = null;
        }
      
        // Compare after conversion
        if (attributeValue === ExpectedValue) {
          return 'Pass';
        }
        return 'Fail';
    };

    const isValidEmail = (attributeValue) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(attributeValue) ? 'Pass' : 'Fail';
    };

    const typeOf = (attributeValue, ExpectedValue) => {
        if(Array.isArray(attributeValue)) {
            if(ExpectedValue.toLowerCase() == 'array') return 'Pass';
        } else if (ExpectedValue.toLowerCase() === 'boolean' || ExpectedValue.toLowerCase() === 'bool') {
            ExpectedValue = 'boolean';
        } else if (ExpectedValue.toLowerCase() === 'object' || ExpectedValue.toLowerCase() === 'obj') {
            if (!Array.isArray(attributeValue) && attributeValue !== null) ExpectedValue = 'object';
        } else if (ExpectedValue.toLowerCase() === 'String' || ExpectedValue.toLowerCase() === 'string') {
            ExpectedValue = 'string';
        } else if (ExpectedValue.toLowerCase() === 'null') {
            if (attributeValue === null) return 'Pass';
        } else if (ExpectedValue.toLowerCase() === 'number' || ExpectedValue.toLowerCase() === 'int' || ExpectedValue.toLowerCase() === 'integer' || ExpectedValue.toLowerCase() === 'num') {
            ExpectedValue = 'number';
        }

        if (typeof attributeValue === ExpectedValue) return 'Pass';
        return 'Fail';
    }

    const lengthEquals = (attributeValue, ExpectedValue) => {
        ExpectedValue = parseInt(ExpectedValue, 10);
        if (isNaN(ExpectedValue)){
            alert("Expected value needs to be a number.");
            return 'Fail';
        }
        else if ((Array.isArray(attributeValue) || typeof attributeValue === 'string') 
            && attributeValue.length === ExpectedValue) return 'Pass';
        else return 'Fail';
    };

    const lessThanOrEquals = (comparator, attributeValue, ExpectedValue) => {
        ExpectedValue = parseInt(ExpectedValue, 10);
        if(isNaN(ExpectedValue)){
            alert("Expected value needs to be a number.");
            return 'Fail';
        }
        else if(comparator === '<='){
            if((Array.isArray(attributeValue) || typeof attributeValue === 'string')
                && attributeValue.length <= ExpectedValue) return 'Pass'     //If Array or string
            else if(typeof attributeValue === 'number' && attributeValue <= ExpectedValue)
                return 'Pass'
            else return 'Fail';
        }
        else if(comparator === '<') {
            if((Array.isArray(attributeValue) || typeof attributeValue === 'string')
                && attributeValue.length < ExpectedValue) return 'Pass'     //If Array or string
            else if(typeof attributeValue === 'number' && attributeValue < ExpectedValue)
                return 'Pass';
            else return 'Fail';
        }
        else return 'Fail';
    };

    const greaterThanOrEquals = (comparator, attributeValue, ExpectedValue) => {
        ExpectedValue = parseInt(ExpectedValue, 10);
        if(isNaN(ExpectedValue)){
            alert("Expected value needs to be a number.");
            return 'Fail';
        }
        else if(comparator === '>='){
            if((Array.isArray(attributeValue) || typeof attributeValue === 'string')
                && attributeValue.length >= ExpectedValue) return 'Pass'     //If Array or string
            else if(typeof attributeValue === 'number' && attributeValue >= ExpectedValue)
                return 'Pass'
            else return 'Fail';
        }
        else if(comparator === '>') {
            if((Array.isArray(attributeValue) || typeof attributeValue === 'string')
                && attributeValue.length > ExpectedValue) return 'Pass'     //If Array or string
            else if(typeof attributeValue === 'number' && attributeValue > ExpectedValue)
                return 'Pass';
            else return 'Fail';
        }
        else return 'Fail';
    };

    const getResult = (test) => {
        let result = null;

        if (test.type === 'status') {
          result = test.code === status ? 'Pass' : 'Fail';
        } else {
          // Check if the attribute exists in the data props
          if(data.hasOwnProperty(test.attribute)) {
            
            const attributeValue = data[test.attribute];
            if (test.comparator === '==') 
                result = Equals(attributeValue, test.expected_value);
            else if (test.comparator === 'email')
                result = isValidEmail(attributeValue);
            else if (test.comparator === 'type')
                result = typeOf(attributeValue, test.expected_value);
            else if (test.comparator === 'Length Equals')
                result = lengthEquals(attributeValue, test.expected_value);
            else if (test.comparator === '<=' || test.comparator === '<')
                result = lessThanOrEquals(test.comparator, attributeValue, test.expected_value);
            else if (test.comparator === '>=' || test.comparator === '>')
                result = greaterThanOrEquals(test.comparator, attributeValue, test.expected_value);
          }
          else{
            result = null;
          };
        }

        return result;
      };

    return(
        <>
        {
            customTests.map((test) => {
                const result = getResult(test)
                return (
                    <div key={test.id}>
                        {result !== null 
                        ? (
                          <>
                            {test.type==='status'
                             ? (<Typography style={{ padding: '8px' }}>
                                    {test.type} {test.code}: {result==='Pass' 
                                    ? (<><span style={styles.pass}>{result}</span> : <span>{test.message}</span></>)    //Pass Message
                                    : (<><span style={styles.fail}>Failed</span></>)}</Typography>)                   //Fail Message
                             : (<Typography style={{ padding: '8px' }}>
                                    {test.attribute} {test.comparator} {test.expected_value}: {result=='Pass'
                                    ? (<><span style={styles.pass}>{result}</span> : <span>{test.message}</span></>)
                                    : (<><span style={styles.fail}>Failed</span></>)}</Typography>)}
                          </>
                          ) 
                        : (<Typography style={{ padding: '8px' }}>{test.attribute} Attribute not found : <span style={styles.fail}>Failed</span></Typography>)
                        }
                    </div>
                );
            })
        }
        </>
    );
}

export default CustomTests;