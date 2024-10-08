import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import NavItem from './NavItem';

const Header: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow={1} gap="8px">
                        <Box display="flex" alignItems="center" gap="16px" sx={{ padding: '0px  12px 0px 0px', textDecoration: 'none' }} component='a' href='/'>
                            <img src="/Logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
                            <Typography variant="h6" component="div" style={{ color: 'black' }}>
                                RiCourse
                            </Typography>
                        </Box>
                        <NavItem text="Khóa học" />
                        <NavItem text="Kỳ thi" />
                        <NavItem text="Diễn đàn" />
                    </Box>
                    <Box display="flex" alignItems="center" gap="16px">
                        <Button color="inherit" sx={{ color: 'black' }} href='/auth/sign-in'>Đăng nhập</Button>
                        <Button color="inherit" sx={{ color: 'white', backgroundColor: 'black' }} href='/auth/sign-up'>Đăng ký</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;