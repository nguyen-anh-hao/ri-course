'use client'

import React from 'react';
import { Paper, Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

const UpdateProfileForm: React.FC = () => {
    const router = useRouter();
    const handleBackButtonClick = () => { router.push('/profile'); }

    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' fontWeight='medium'>Cập nhật hồ sơ</Typography>
                <Button variant='outlined' sx={{ alignSelf: 'flex-end' }} onClick={handleBackButtonClick}>Quay lại</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box
                    component='img'
                    sx={{ width: 144, height: 144, borderRadius: '50%' }}
                    src='https://ui-avatars.com/api/?background=random'
                    alt='Avatar'
                />
            </Box>
            <TextField
                margin='normal'
                fullWidth
                id='name'
                label='Họ và tên'
                name='name'
            />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField fullWidth label='Ngày' name='day' />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth label='Tháng' name='month' />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth label='Năm' name='year' />
                </Grid>
            </Grid>
            <TextField
                margin='normal'
                fullWidth
                name='email'
                label='Email'
                type='email'
                id='email'
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant='contained' sx={{ mt: 2 }}>
                    Cập nhật hồ sơ
                </Button>
            </Box>
        </Paper>
    )
}

export default UpdateProfileForm;