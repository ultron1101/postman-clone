
const checkValidJson = (text) => {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
    }else{
        return false;
    }
}

export const checkParams = (formData, jsonText, paramData, headerData, setErrorMsg) => {

    //Checks if URL is Empty
    if(!formData.url) {
        setErrorMsg('Request URL is empty!');
        return false;
    }

    //Checks for valid JSON
    if(!checkValidJson(jsonText)) {
        setErrorMsg('Text is not valid json');
        return false;
    }

    return true;
}

export const getHeadersAndParams = (objArr) => {
    let obj = {};
    
    //Converts objArr to a Json Object
    objArr.forEach(data => {
        if (data.hasOwnProperty('check') && data.check) {
            obj = { ...obj, [data.key]: data.value };
        }
    })

    return obj;
}