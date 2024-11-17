'use client'

import React from 'react';
import { Paper, Box, TextField, Button, Typography, Grid, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/user.interface';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '@/config/config';
import { getCookie } from 'cookies-next';

const UpdateProfileForm: React.FC = () => {
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [fullname, setFullname] = useState<string>('');
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(`${config.API_BASE_URL}/users/me`);
                setUser(response.data);
                setFullname(response.data.fullname ?? response.data.username ?? '');
                setDay(new Date(response.data.dob).getDate());
                setMonth(new Date(response.data.dob).getMonth() + 1);
                setYear(new Date(response.data.dob).getFullYear());
                setEmail(response.data.email ?? '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user === null)
            fetchUser();
    }, [user]);

    const handleBackButtonClick = () => { router.push('/profile'); }

    const handleUpdateProfile = async () => {
        try {
            const dob = new Date(
                (year !== null ? year : 2000),
                (month !== null ? month - 1 : 0),
                (day !== null ? day : 1),
                7, 0, 0
            );
            const response = await axios.patch(`${config.API_BASE_URL}/users/me`, { fullname, dob, email });
            router.push('/profile');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box component='form' onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h5' fontWeight='medium'>Cập nhật hồ sơ</Typography>
                    <Button variant='outlined' sx={{ alignSelf: 'flex-end' }} onClick={handleBackButtonClick}>Quay lại</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 128, height: 128 }} />
                </Box>
                <TextField
                    margin='normal'
                    fullWidth
                    id='name'
                    label='Họ và tên'
                    name='name'
                    value={fullname ? fullname : ''}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label='Ngày'
                            name='day'
                            value={day ? day : ''}
                            onChange={(e) => setDay(parseInt(e.target.value))}
                            type='number'
                            inputProps={{ min: 1, max: 31 }}
                            error={day !== null && (day < 1 || day > 31)}
                            helperText={day !== null && (day < 1 || day > 31) ? 'Ngày không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label='Tháng'
                            name='month'
                            value={month ? month : ''}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                            type='number'
                            inputProps={{ min: 1, max: 12 }}
                            error={month !== null && (month < 1 || month > 12)}
                            helperText={month !== null && (month < 1 || month > 12) ? 'Tháng không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label='Năm'
                            name='year'
                            value={year ? year : ''}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            type='number'
                            inputProps={{ min: 1900, max: new Date().getFullYear() }}
                            error={year !== null && (year < 1900 || year > new Date().getFullYear())}
                            helperText={year !== null && (year < 1900 || year > new Date().getFullYear()) ? 'Năm không hợp lệ' : ''}
                        />
                    </Grid>
                </Grid>
                <TextField
                    margin='normal'
                    fullWidth
                    name='email'
                    label='Email'
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)}
                    helperText={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? 'Email không hợp lệ' : ''}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ mt: 2 }} type='submit'>
                        Cập nhật hồ sơ
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default UpdateProfileForm;