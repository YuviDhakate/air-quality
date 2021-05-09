import Header from '../Header/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    body: {
        width: '95%',
        margin: '15px auto'
    }
});
const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        < >
            <Header />
            <div className={classes.body}>
                {children}
            </div>
        </>
    );
};

export default Layout;