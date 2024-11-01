import { Avatar, Button, Grid, TextField, Box } from '@mui/material';
import UserProfileMenu from '../components/layout/UserProfileMenu';
import UpdateProfileForm from '../components/layout/UpdateProfileForm';

const UpdateProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <UserProfileMenu activeButton="profile" />
            </Grid>
            <Grid item xs={12} md={9}>
                <UpdateProfileForm />
            </Grid>
        </Grid>
    );
};

export default UpdateProfile;