import { Avatar, Button, Grid, Typography, TextField, Box } from '@mui/material';

import ProfileCard from './components/layout/ProfileCard';
import UserProfileMenu from './components/layout/UserProfileMenu';

const ProfileInfo = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <UserProfileMenu activeButton='profile' />
            </Grid>
            <Grid item xs={12} md={9}>
                <ProfileCard />
            </Grid>
        </Grid>
    );
};

export default ProfileInfo;
