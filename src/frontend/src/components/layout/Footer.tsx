import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <AppBar
            position="static"
            style={{
                backgroundColor: 'black',
                color: 'white',
                top: 'auto',
                bottom: 0,
                boxShadow: 'none',
            }}
        >
            <Container maxWidth={false} sx={{ width: '66.67%' }}>
                <Toolbar disableGutters>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        padding="32px 0"
                    >
                        {/* Logo và mô tả */}
                        <Box display="flex" flexDirection="column" maxWidth="300px">
                            <Box display="flex" alignItems="center" marginBottom="16px">
                                <img
                                    src="/Logo.png"
                                    alt="Logo"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        marginRight: '8px',
                                    }}
                                />
                                <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Roboto' }}>
                                    RiCourse
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'gray', fontFamily: 'Roboto' }}>
                                RiCourse là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, luyện tập và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'gray', marginTop: '16px', fontFamily: 'Roboto' }}
                            >
                                RICON 2024 | All rights reserved
                            </Typography>
                        </Box>

                        {/* Tính năng */}
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h6" sx={{ color: 'white', marginBottom: '16px', fontFamily: 'Roboto' }}>
                                Tính năng
                            </Typography>
                            <Link href="/courses" underline="none" sx={{ color: 'gray', marginBottom: '8px', fontFamily: 'Roboto' }}>
                                Khóa học
                            </Link>
                            <Link href="/exams" underline="none" sx={{ color: 'gray', marginBottom: '8px', fontFamily: 'Roboto' }}>
                                Kỳ thi
                            </Link>
                            <Link href="/forum" underline="none" sx={{ color: 'gray', fontFamily: 'Roboto' }}>
                                Diễn đàn
                            </Link>
                        </Box>

                        {/* Liên hệ */}
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h6" sx={{ color: 'white', marginBottom: '16px', fontFamily: 'Roboto' }}>
                                Liên hệ
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray', marginBottom: '8px', fontFamily: 'Roboto' }}>
                                Linh Trung, Thủ Đức, TP. HCM
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray', marginBottom: '8px', fontFamily: 'Roboto' }}>
                                0987 654 321
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray', fontFamily: 'Roboto' }}>
                                <Link href="mailto:anhthao012004@gmail.com" underline="none" sx={{ color: 'gray', fontFamily: 'Roboto' }}>
                                   random@gmail.com
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;