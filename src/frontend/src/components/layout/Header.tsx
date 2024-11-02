'use client'

// React and Next.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Material-UI components
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

// Custom components
import NavItem from '@/components/ui/NavItem';

// Context
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
    const router = useRouter();

    const theme = useTheme().theme;
    const isDarkMode = useTheme().isDarkMode;
    const toggleDarkMode = useTheme().toggleDarkMode;

    const { user, signout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileSelected = () => {
        handleMenuClose();
        router.push('/profile');
    };

    const handleLogout = () => {
        handleMenuClose();
        signout();
        router.push('/');
    };

    return (
        <AppBar>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Box display='flex' alignItems='center' flexGrow={1} gap='8px'>
                        <Link href='/' passHref style={{ textDecoration: 'none' }}>
                            <Box display='flex' alignItems='center' gap='16px' sx={{ padding: '0px 12px 0px 0px' }}>
                                {isDarkMode ? (
                                    <img src='/logo-dark.png' alt='Logo' style={{ width: '40px', height: '40px' }} />
                                ) : (
                                    <img src='/logo.png' alt='Logo' style={{ width: '40px', height: '40px' }} />
                                )}
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    RiCourse
                                </Typography>
                            </Box>
                        </Link>
                        <NavItem text='Khóa học' isActive={true} onClick={() => router.push('/all-courses')} />
                        <NavItem text='Kỳ thi' />
                        <NavItem text='Diễn đàn' />
                    </Box>
                    {user ? (
                        <>
                            <IconButton sx={{ mx: 0.25 }} onClick={() => toggleDarkMode()}>
                                <Brightness2OutlinedIcon />
                            </IconButton>
                            <IconButton sx={{ mx: 0.25 }}>
                                <NotificationsOutlinedIcon />
                            </IconButton>
                            <Avatar
                                sx={{ mx: 0.5 }}
                                onClick={handleMenuOpen}
                                alt='User Avatar'
                                style={{ cursor: 'pointer' }}
                            >
                                B
                            </Avatar>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: {
                                        marginTop: 16,
                                    },
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleProfileSelected}>Thông tin tài khoản</MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>Đăng xuất</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box display='flex' alignItems='center' gap='16px'>
                            <Button
                                variant='contained'
                                onClick={() => router.push('/auth/sign-in')}
                                sx={{
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'transparent',
                                }}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => router.push('/auth/sign-up')}
                            >
                                Đăng ký
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;