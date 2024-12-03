'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFoundPage: React.FC = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: 'primary.main' }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', marginBottom: 3 }}>
                Xin lỗi, trang bạn tìm kiếm không tồn tại!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{
                    textTransform: 'none',
                }}
            >
                Quay về trang chủ
            </Button>
        </Container>
    );
};

export default NotFoundPage;
