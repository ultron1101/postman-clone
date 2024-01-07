import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestHistoryItem from './RequestHistoryItem'; 
import { Paper, Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RefreshIcon from '@mui/icons-material/Refresh';

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
  },[]);

  const handleRefresh = () => {
    fetchHistoryData();
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
          <h3>Request History</h3>
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </div>
        {historyData.map((historyItem) => (
            <RequestHistoryItem key={historyItem.id} data={historyItem} onDelete={handleDelete}/>
        ))}
        </div>
        </Paper>
        </Box>
    )
}

export default RequestHistory;