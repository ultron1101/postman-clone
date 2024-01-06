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
      },[]);

    const fetchTests = async () => {
        try {
          const testsArr = await axios.get('http://localhost:8080/api/customTests');
          setCustomTests(testsArr.data);
        
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
    }

    const Equals = (attributeValue, ExpectedValue) => {
        if(attributeValue === ExpectedValue) return 'Pass';
        return 'Fail';
    }

    const isValidEmail = (attributeValue) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(attributeValue) ? 'Pass' : 'Fail';
    }

    const lengthEquals = (attributeValue, ExpectedValue) => {
        if((Array.isArray(attributeValue) || typeof attributeValue === 'string') 
            && attributeValue.length === ExpectedValue) return 'Pass';
        return 'Fail';
    }

    const lessThanOrEquals = (comparator, attributeValue, ExpectedValue) => {
        if(comparator === '<='){
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
    }

    const greaterThanOrEquals = (comparator, attributeValue, ExpectedValue) => {
        if(comparator === '>='){
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
    }

    const getResult = (test) => {
        let result = null;

        if (test.type === 'status') {
          result = test.code === status ? 'Pass' : 'Fail';
        } else if (test.type === 'key-val') {
          // Check if the attribute exists in the data props
          if(data.hasOwnProperty(test.attribute)) {
            
            const attributeValue = data[test.attribute];
            if(test.comparator === '==') 
                result = Equals(attributeValue, test.expected_value);
            else if(test.comparator === 'email')
                result = isValidEmail(attributeValue);
            else if(test.comparator === 'Length Equals')
                result = lengthEquals(attributeValue, test.expected_value);
            else if(test.comparator === '<=' || test.comparator === '<')
                result = lessThanOrEquals(test.comparator, attributeValue, test.expected_value);
            else if(test.comparator === '>=' || test.comparator === '>')
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
                                    {test.type} {test.code}: {result} : {result==='Pass' 
                                    ? (<span>{test.message}</span>) 
                                    : (<></>)}</Typography>)
                             : (<Typography style={{ padding: '8px' }}>{test.attribute} {test.comparator} {test.expected_value}: {result} : </Typography>)}
                          </>
                          ) 
                        : (<Typography style={{ padding: '8px' }}>{test.attribute} Attribute not found</Typography>)
                        }
                    </div>
                );
            })
        }
        </>
    );
}

export default CustomTests;