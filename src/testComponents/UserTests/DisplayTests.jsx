import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from "axios";

 const DisplayTests = ({tests1}) => {

    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchTests();
      },[tests1]);
    
      const fetchTests = async () => {
        try {
          const tests2 = await axios.get('http://localhost:8080/api/customTests');
          setTests(tests2.data);
        
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
          // Assuming there is an endpoint to delete a test by its ID
          await axios.delete(`http://localhost:8080/api/customTests/${id}`);
          // Remove the deleted test from the state
          const updatedTests = [...tests];
          updatedTests.splice(id, 1);
          setTests((prevTests) => prevTests.filter((test) => test.id !== id));
        } catch (error) {
          console.error('Error deleting test:', error);
        }

  };
    
    return(
        <>
        <Box>
        <Typography sx={{marginLeft: '20px'}} variant="h6">Tests</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>                       
                        <TableCell style={{ width: '20%' }}>Type</TableCell>
                        <TableCell style={{ width: '20%' }}>Attribute</TableCell>
                        <TableCell style={{ width: '20%' }}>Expected</TableCell>
                        <TableCell style={{ width: '30%' }}>Message</TableCell>
                        <TableCell style={{ width: '10%' }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        tests.map((test, index) => (
                            <TableRow>
                                <TableCell>{test.type}</TableCell>
                                <TableCell>{test.attribute}</TableCell>
                                <TableCell>{test && test.code !== 0 
                                        ? (<span>{test.code}</span>) 
                                        : (<span>{test.expected_value}</span>)}
                                </TableCell>
                                <TableCell>{test.message}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => handleDelete(test.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        </>
    )

 }

 export default DisplayTests;