'use client'

import React from 'react';
import { Paper, Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import config from '@/config/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const ChangePasswordForm: React.FC = () => {
    const route = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
            setIsError(true);
            return;
        }

        try {
            await axios.patch(`${config.API_BASE_URL}/auth/change-password`, {
                oldPassword,
                newPassword
            });
            setMessage('Cập nhật mật khẩu thành công');
            setIsError(false);
            route.push('/profile');
        } catch (error) {
            setMessage('Mật khẩu cũ không chính xác');
            setIsError(true);
        }
    };

    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Typography variant='h5' fontWeight='medium'>Thay đổi mật khẩu</Typography>
            <Box component='form' sx={{ gap: 2 }} onSubmit={handleSubmit}>
                {message && (
                    <Alert severity={message === 'Cập nhật mật khẩu thành công' ? 'success' : 'error'} sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}
                <TextField
                    margin='normal'
                    fullWidth
                    name='oldPassword'
                    label='Mật khẩu cũ'
                    type='password'
                />
                <TextField
                    margin='normal'
                    fullWidth
                    name='newPassword'
                    label='Mật khẩu'
                    type='password'
                />
                <TextField
                    margin='normal'
                    fullWidth
                    name='confirmPassword'
                    label='Xác nhận mật khẩu'
                    type='password'
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ mt: 2 }} type='submit'>
                        Cập nhật mật khẩu
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ChangePasswordForm;