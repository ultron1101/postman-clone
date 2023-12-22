import { Box, Container, Typography, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import CreateUserTests from "./UserTests/CreateUserTests";
import DisplayTests from "./UserTests/DisplayTests";
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import { useState } from "react";

const styles = {
    contain: {
        border: '1px solid rgba(224, 224, 224, 1)',
        marginTop: '20px',
        padding: '20px 0px',
        width: '95%',
        borderRadius: '8px',
    },
    font: {
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.15)',
    }
}

const Tests = () => {

    const [tests, setTests] = useState([]);

    const handleFormSubmit = (formData) => {
        // Add the form data to the tests array
        setTests([...tests, formData]);
      };

    const handleDelete = (index) => {
        // Create a copy of the tests array
        const updatedTests = [...tests];
        
        // Remove the element at the specified index
        updatedTests.splice(index, 1);

        // Update the state with the modified array
        setTests(updatedTests);
    };

    return (
        <>
            <Grid container alignItems="center" spacing={1}>
                <Grid item style={styles.font}><ScienceRoundedIcon /></Grid>
                <Grid item><Typography variant="h6" style={styles.font}>Create Tests:</Typography></Grid>
            </Grid>
            <Container component={Paper} maxWidth="sm" style={styles.contain}>
                <CreateUserTests onSubmit={handleFormSubmit} />
            </Container>
            <Container component={Paper} maxWidth="sm" style={styles.contain}>
                <DisplayTests tests={tests} onDelete={handleDelete} />
            </Container>
        </>
    )

}

export default Tests;