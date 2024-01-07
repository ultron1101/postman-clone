
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    logo: {
        width: 100,
        padding: 5,
        marginBottom: '14px'
    },
    navbar: {
        background: ['#000', '!important'],
        position: ['static', '!important'],
        height: [50, '!important']
    }
})

const Header = () => {
    const classes = useStyles();
    const logo = '/header_logo2.jpg';

    return (
        <>
            <img src={logo} alt="logo" className={classes.logo} />    
        </>
    )
}

export default Header;