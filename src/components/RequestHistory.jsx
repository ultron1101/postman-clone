import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestHistoryItem from './RequestHistoryItem'; 
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const RequestHistory = () => {

  const [historyData, setHistoryData] = useState([]);

  const useStyles = makeStyles({
    component: {
      width: '100%',
      margin: '50px auto 20px auto',
    },
  });

  const handleDelete = (itemId) => {
    setHistoryData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    fetchHistoryData();
  },[setHistoryData]);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/history');
      const responseData = response.data;
      setHistoryData(responseData);
    
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  const classes = useStyles();

    return (
        <Box className={classes.component} >
        <Paper  elevation={1} style={{ marginTop: 20, overflow: 'hidden', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 8 }}>
        <div style={{ marginLeft: 10, marginRight: 10 }}>
        <h3>Request History</h3>
        {historyData.map((historyItem) => (
            <RequestHistoryItem key={historyItem.id} data={historyItem} onDelete={handleDelete}/>
        ))}
        </div>
        </Paper>
        </Box>
    )
}

export default RequestHistory;