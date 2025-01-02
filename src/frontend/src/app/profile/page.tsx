'use client';

import { Grid } from '@mui/material';

import ProfileCard from './components/layout/ProfileCard';
import UserProfileMenu from './components/layout/UserProfileMenu';
import { User } from '@/interfaces/user.interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import appConfig from '@/config/appConfig';
import { getCookie } from 'cookies-next';

const ProfileInfo = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = getCookie('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get<User>(`${appConfig.API_BASE_URL}/users/me`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [user]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <UserProfileMenu activeButton='profile' />
            </Grid>
            <Grid item xs={12} md={9}>
                <ProfileCard user={user} />
            </Grid>
        </Grid>
    );
};

export default ProfileInfo;
