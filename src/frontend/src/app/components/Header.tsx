import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Header: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <img src="/Logo.png" alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                        <Typography variant="h6" component="div" style={{ color: 'black' }}>
                            RiCourse
                        </Typography>
                        <Button color="inherit" style={{ marginLeft: '20px', color: 'black', textTransform: 'none' }}>Khóa học</Button>
                        <Button color="inherit" style={{ color: 'black', textTransform: 'none' }}>Kỳ thi</Button>
                        <Button color="inherit" style={{ color: 'black', textTransform: 'none' }}>Diễn đàn</Button>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Button color="inherit" style={{ color: 'black', textTransform: 'none', marginRight: '10px', borderRadius: '20px', padding: '8px 24px' }}>Đăng nhập</Button>
                        <Button color="inherit" style={{ color: 'white', backgroundColor: 'black', textTransform: 'none', borderRadius: '20px', padding: '8px 24px' }}>Đăng ký</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;