import React from 'react';
import { Container } from '@mui/material';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <Container maxWidth='lg'>
            {children}
        </Container>
    );
};

export default ProfileLayout;