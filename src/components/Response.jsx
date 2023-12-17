
import { Box, TextareaAutosize } from "@mui/material"

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

const Response = ({ status, data }) => {
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
            <Box>
            <TextareaAutosize 
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                disabled="disabled"
                value={readableobj}
            />
            </Box>
    )
}

export default Response;