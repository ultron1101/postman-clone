import { useState } from 'react';
import { Box, Tabs, TextareaAutosize, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TestResults from '../testComponents/TestResults';
import ErrorScreen from './ErrorScreen';

const textareaStyle = { 
    width: '100%', 
    padding: 10,  
    background: `url(http://i.imgur.com/2cOaJ.png)`,
    backgroundAttachment: 'local',
    backgroundRepeat: 'no-repeat',
    paddingLeft: 35,
    paddingTop: 10,
    borderColor: '#ccc' 
}


const useStyles = makeStyles({
    component: {
        marginTop: 20,
    },
    tab: {
        textTransform: ['none', '!important'],
        '&::active': {
            border: '1px solid #fff'
        }
    },
    status: {
        marginTop: '15px',
        marginBottom: '20px'
    }
});

const ResponseTab = ({status, data, errorResponse}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    let obj = data;

    //Making the incoming response JSON as string to look
    //like a JSON object
    let readableobj = '{ \n';
    for(let key in obj) {
        readableobj += '\t'
        readableobj += (typeof obj[key] === "string")? `${key}: "${obj[key]}"` : `${key}: ${obj[key]}`; 
        if (Object.keys(obj).pop() !== key.toString()) {
            readableobj += ',\n'
        }
    }
    readableobj += '\n}';

    return (
        <Box className={classes.component}>
            <Tabs value={value} onChange={handleChange}
                TabIndicatorProps={{ sx: { backgroundColor: "#F26B3A", height: 4, bottom: 2} }}  //Change Tab color to orange
            textColor="none">
                <Tab label="Response" className={classes.tab} />
                <Tab label="Tests" className={classes.tab} />
            </Tabs>

            {/*Box to display Response*/}
            <Box
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                aria-labelledby={`simple-tab-${0}`}
            >
                <div className={classes.status}>
                    <Typography>Status: {status}</Typography>
                </div>
                {errorResponse ? <ErrorScreen /> : 
                    <>
                    <Box>
                        <TextareaAutosize 
                            minRows={3}
                            maxRows={5}
                            style={textareaStyle}
                            disabled="disabled"
                            value={readableobj}
                        />
                    </Box>
                    </>
                }
            </Box>

            {/*Box to display Test Results*/}
            <Box
                role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-${1}`}
                aria-labelledby={`simple-tab-${1}`}
            >
                <TestResults status={status} data={data}/>
            </Box>
            
        </Box>
    )
}

export default ResponseTab