'use client'

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid } from '@mui/material';
import { LocationOn as LocationOnIcon, Phone as PhoneIcon, Email as EmailIcon } from '@mui/icons-material';
import Link from 'next/link';
import colors from '@/styles/colors';

const Footer: React.FC = () => {
    return (
        <AppBar
            position='static'
            sx={{
                backgroundColor: colors.common.black,
                color: colors.common.white,
                top: 'auto',
                bottom: 0,
                boxShadow: 'none',
            }}
        >
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                    <Grid container spacing={4} px={0} py={4}>
                        <Grid item xs={12} sm={5}>
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' alignItems='center' mb={2}>
                                    <img
                                        src='/logo-dark.png'
                                        alt='Logo'
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            marginRight: '16px',
                                        }}
                                    />
                                    <Typography variant='h6' py={1}>
                                        RiCourse
                                    </Typography>
                                </Box>
                                <Typography variant='body2' sx={{ py: 0.25 }}>
                                    RiCourse là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, luyện tập và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.
                                </Typography>
                                <Typography variant='body2' sx={{ mt: 2 }}>
                                    © 2024 RiCon | All rights reserved
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='h6' sx={{ mb: 2 }} py={1}>
                                    Tính năng
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 2, py: 0.25 }}>
                                    <Link href='/auth/sign-up' passHref style={{ textDecoration: 'none' }}>
                                        <Typography
                                            variant='body2'
                                            sx={{ mb: 2, py: 0.25, color: colors.common.white }}
                                            component='span'
                                        >
                                            Khóa học
                                        </Typography>
                                    </Link>
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 2, py: 0.25 }}>
                                    <Link href='/auth/sign-up' passHref style={{ textDecoration: 'none' }}>
                                        <Typography
                                            variant='body2'
                                            sx={{ mb: 2, py: 0.25, color: colors.common.white }}
                                            component='span'
                                        >
                                            Kỳ thi
                                        </Typography>
                                    </Link>
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 2, py: 0.25 }}>
                                    <Link href='/auth/sign-up' passHref style={{ textDecoration: 'none' }}>
                                        <Typography
                                            variant='body2'
                                            sx={{ mb: 2, py: 0.25, color: colors.common.white }}
                                            component='span'
                                        >
                                            Diễn đàn
                                        </Typography>
                                    </Link>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='h6' sx={{ mb: 2 }} py={1}>
                                    Liên hệ
                                </Typography>
                                <Box display='flex' alignItems='center' sx={{ mb: 2 }}>
                                    <LocationOnIcon sx={{ mr: 1 }} />
                                    <Typography variant='body2'>
                                        Linh Trung, Thủ Đức, TP. HCM
                                    </Typography>
                                </Box>
                                <Box display='flex' alignItems='center' sx={{ mb: 2 }}>
                                    <PhoneIcon sx={{ mr: 1 }} />
                                    <Typography variant='body2'>
                                        0987 654 321
                                    </Typography>
                                </Box>
                                <Box display='flex' alignItems='center' sx={{ mb: 2 }}>
                                    <EmailIcon sx={{ mr: 1 }} />
                                    <Typography variant='body2'>
                                        <a href='mailto:random@gmail.com' style={{ color: 'inherit', textDecoration: 'none' }}>
                                            random@gmail.com
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;