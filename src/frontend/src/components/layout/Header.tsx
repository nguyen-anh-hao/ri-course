'use client'

// React and Next.js
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

// Material-UI components
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

// Custom components
import NavItem from '@/components/ui/NavItem';

// Context
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const theme = useTheme().theme;
    const isDarkMode = useTheme().isDarkMode;
    const toggleDarkMode = useTheme().toggleDarkMode;

    const { user, signout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const _token = getCookie('token');
        const _user = sessionStorage.getItem('user');
        if (!_token || !_user)
            signout();
    });

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
        window.location.href = '/';
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const learnerNavItems = [
        { key: 1, text: 'Học tập', path: '/my-courses', icon: <SchoolIcon /> },
        { key: 2, text: 'Khóa học', path: '/all-courses', icon: <BookIcon /> },
        { key: 3, text: 'Kỳ thi', path: '/exams', icon: <AssignmentIcon /> },
    ];

    const mentorNavItems = [
        { key: 1, text: 'Quản lý khóa học', path: '/mentor/courses', icon: <BookIcon /> },
        { key: 3, text: 'Quản lý kỳ thi', path: '/mentor/exams', icon: <AssignmentIcon /> },
    ];

    const adminNavItems = [
        { key: 1, text: 'Quản lý người dùng', path: '/admin/user-accounts', icon: <PeopleIcon /> },
        { key: 2, text: 'Quản lý khóa học', path: '/admin/all-courses', icon: <BookIcon /> },
    ];

    const navItems = sessionStorage.getItem('role') === '"Mentor"' ? mentorNavItems :
        sessionStorage.getItem('role') === '"Admin"' ? adminNavItems : learnerNavItems;

    return (
        <AppBar>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            marginRight: 2,
                            width: 40,
                            height: 40,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                        PaperProps={{
                            sx: {
                                backdropFilter: 'blur(10px)',
                                width: 300,
                            },
                        }}
                    >
                        <List sx={{ padding: 0 }}>
                            <Box display='flex' alignItems='center' gap='16px' sx={{ width: '80%', padding: '8px 16px' }}>
                                {isDarkMode ? (
                                    <Image src='/logo-dark.png' alt='Logo' width={40} height={40} />
                                ) : (
                                    <Image src='/logo.png' alt='Logo' width={40} height={40} />
                                )}
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    RiCourse
                                </Typography>
                            </Box>
                            {navItems.map((item) => (
                                <ListItem key={item.key} disablePadding>
                                    <ListItemButton
                                        onClick={() => { router.push(item.path); handleDrawerToggle(); }}
                                        selected={pathname.includes(item.path)}
                                        sx={{
                                            backgroundColor: pathname.includes(item.path) ? theme.palette.action.selected : 'inherit',
                                            '&:hover': {
                                                backgroundColor: pathname.includes(item.path) ? theme.palette.action.selected : theme.palette.action.hover,
                                            }
                                        }}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <Box display='flex' alignItems='center' flexGrow={1} gap='8px' >
                        <Link href='/' passHref style={{ textDecoration: 'none' }}>
                            <Box display='flex' alignItems='center' gap='16px' sx={{ padding: '0px 12px 0px 0px' }}>
                                {isDarkMode ? (
                                    <Image src='/logo-dark.png' alt='Logo' width={40} height={40} />
                                ) : (
                                    <Image src='/logo.png' alt='Logo' width={40} height={40} />
                                )}
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{ color: theme.palette.text.primary, display: { xs: 'none', sm: 'block' } }}
                                >
                                    RiCourse
                                </Typography>
                            </Box>
                        </Link>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {navItems.map((item) => (
                                <NavItem key={item.key} text={item.text} isActive={pathname.includes(item.path)} onClick={() => router.push(item.path)} />
                            ))}
                        </Box>
                    </Box>
                    <IconButton sx={{ mx: 0.25, height: 40, width: 40 }} onClick={() => toggleDarkMode()} >
                        <Brightness2OutlinedIcon />
                    </IconButton>
                    {user ? (
                        <>
                            <IconButton sx={{ mx: 0.25, height: 40, width: 40 }}>
                                <NotificationsOutlinedIcon />
                            </IconButton>
                            <Avatar
                                sx={{ mx: 0.5 }}
                                onClick={handleMenuOpen}
                                alt='User Avatar'
                                style={{ cursor: 'pointer' }}
                            />

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
                        <>
                            <Box display='flex' alignItems='center'>
                                <Button
                                    variant='contained'
                                    onClick={() => router.push('/auth/sign-in')}
                                    sx={{
                                        color: theme.palette.text.primary,
                                        backgroundColor: 'transparent',
                                        display: { xs: 'none', sm: 'block' },
                                        mx: 1,
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => router.push('/auth/sign-up')}
                                    sx={{
                                        mx: 1,
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;