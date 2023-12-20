import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import CreateUserTests from "./UserTests/CreateUserTests";
import DisplayTests from "./UserTests/DisplayTests";
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';

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

    return (
        <>
            <Grid container alignItems="center" spacing={1}>
                <Grid item style={styles.font}><ScienceRoundedIcon /></Grid>
                <Grid item><Typography variant="h6" style={styles.font}>Create Tests:</Typography></Grid>
            </Grid>
            <Container maxWidth="sm" style={styles.contain}>
                <CreateUserTests />
            </Container>
            <Container maxWidth="sm" style={styles.contain}>
                <DisplayTests />
            </Container>
        </>
    )

}

export default Tests;