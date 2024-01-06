import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { DataContext } from '../context/DataProvider';

const RequestHistoryItem = ({ data, onDelete }) => {

    const textStyle = {
        fontWeight: 'bold',
        color: 'blue',
    };

    const { setFormData, formData } = useContext(DataContext);
    const handleDelete = async () => {
        try {
          
          await axios.delete(`http://localhost:8080/api/history/${data.id}`);
          onDelete(data.id);
        } catch (error) {
          console.error('Error deleting history item:', error);
        }
    };

    const handleClick = (url, method) => {
        setFormData({...formData, url, type:method})
    }

  return (
    <>
   <Box>
      <hr/>
      <Box display="flex" alignItems="center" style={{ cursor: "pointer" }}>
        <Box flexGrow={1} onClick={() => handleClick(data.url, data.method)}>
          <Typography variant="subtitle1" style={textStyle}>{data.method}</Typography>
          <Typography variant="subtitle1">URL: {data.url}</Typography>
          <Typography variant="subtitle1">Status: {data.statusCode}</Typography>
        </Box>
        <Box>
          <DeleteIcon size="lg" onClick={handleDelete} style={{ marginBottom: 5, cursor: 'pointer' }}/> 
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default RequestHistoryItem;
