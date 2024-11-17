'use client'

import { Typography, Container } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { getCookie } from 'cookies-next';

const LandingPage = () => {
    const theme = useTheme().theme;
    const { user } = useAuth();

    const token = getCookie('token');

    if (!token) {
        console.log('No token found in cookies');
    } else {
        console.log('Token:', token);
    }

    return (
        <Container maxWidth='lg'>
            <Typography component='h1' variant='h5' color={theme.palette.text.primary}>
                {user ? `Xin chào, ${user}` : 'Xin chào, khách'}
            </Typography>
        </Container>
    );
}

export default LandingPage;