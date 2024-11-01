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

interface HeaderProps {
    style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ style }) => {
    const router = useRouter();
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
    };

    return (
        <AppBar style={style}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow={1} gap="8px">
                        <Link href='/' passHref style={{ textDecoration: 'none' }}>
                            <Box display="flex" alignItems="center" gap="16px" sx={{ padding: '0px 12px 0px 0px' }}>
                                <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
                                <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                                    RiCourse
                                </Typography>
                            </Box>
                        </Link>
                        <NavItem text="Khóa học" onClick={() => router.push('/all-courses')} />
                        <NavItem text="Kỳ thi" />
                        <NavItem text="Diễn đàn" />
                    </Box>
                    {user ? (
                        <>
                            <IconButton color="inherit">
                                <Brightness2OutlinedIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <NotificationsOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar alt="User Avatar" src="https://ui-avatars.com/api/?background=random" />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={handleProfileSelected}>Thông tin tài khoản</MenuItem>
                                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>Đăng xuất</MenuItem>
                            </Menu>
                        </>
                    ) : (
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