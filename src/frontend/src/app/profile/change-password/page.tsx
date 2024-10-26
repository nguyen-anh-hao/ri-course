import { Grid, Button, TextField, Box } from '@mui/material';
import UserProfileMenu from '../components/layout/UserProfileMenu';
import ChangePasswordForm from '../components/layout/ChangePasswordForm';

const ChangePassword = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <UserProfileMenu activeButton="password" />
            </Grid>
            <Grid item xs={9}>
                <ChangePasswordForm />
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
