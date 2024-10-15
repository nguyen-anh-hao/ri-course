'use client'

// React and Next.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Material-UI components
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';

// Custom components
import NavItem from '@/components/ui/NavItem';

// Context
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
    const router = useRouter()
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow={1} gap="8px">
                        <Link href='/' passHref style={{ textDecoration: 'none' }}>
                            <Box display="flex" alignItems="center" gap="16px" sx={{ padding: '0px  12px 0px 0px' }}>
                                <img src="/Logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
                                <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                                    RiCourse
                                </Typography>
                            </Box>
                        </Link>
                        <NavItem text="Khóa học" />
                        <NavItem text="Kỳ thi" />
                        <NavItem text="Diễn đàn" />
                    </Box>
                    {user ? ( // If user is logged in show logout button
                        <Button color="inherit" sx={{ color: 'black' }} onClick={logout}>Đăng xuất</Button>
                    ) : ( // If user is not logged in show login and register button
                        <Box display="flex" alignItems="center" gap="16px">
                            <Button color="inherit" sx={{ color: 'black' }} onClick={() => router.push('/auth/sign-in')}>Đăng nhập</Button>
                            <Button color="inherit" sx={{ color: 'white', backgroundColor: 'black' }} onClick={() => router.push('/auth/sign-up')}>Đăng ký</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;