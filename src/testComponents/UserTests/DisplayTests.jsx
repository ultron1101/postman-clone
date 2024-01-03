import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

 const DisplayTests = ({ tests, onDelete }) => {

    console.log(tests);
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
                                <TableCell>{test.key}</TableCell>
                                <TableCell>{test && test.code !== undefined 
                                        ? (<span>{test.code}</span>) 
                                        : (<span>{test.value}</span>)}
                                </TableCell>
                                <TableCell>{test.message}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => onDelete(index)}>
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