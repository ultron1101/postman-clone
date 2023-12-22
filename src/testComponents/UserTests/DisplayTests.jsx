import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

 const DisplayTests = ({ tests, onDelete }) => {

    return(
        <>
        <Box>
        <Typography variant="h6">Tests</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>                       
                        <TableCell style={{ width: '20%' }}>ID</TableCell>
                        <TableCell style={{ width: '20%' }}>Type</TableCell>
                        <TableCell style={{ width: '50%' }}>Message</TableCell>
                        <TableCell style={{ width: '10%' }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        tests.map((test, index) => (
                            <TableRow>
                                <TableCell>{index}</TableCell>
                                <TableCell>Status</TableCell>
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