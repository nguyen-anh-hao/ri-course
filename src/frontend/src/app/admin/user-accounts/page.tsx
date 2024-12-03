'use client'

import React, { useEffect } from 'react';
import UserAccountsTable from './components/UserAccountsTable';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { User } from './interfaces/user.interfaces';

export default function UserAccountsPage() {
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [userAccounts, setUserAccounts] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${appConfig.API_BASE_URL}/users/all`);
                setUserAccounts(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <></>;

    return (
        <Container component='main' maxWidth='xl'>
            <Typography variant='h4' mb={4}>Quản lý tài khoản</Typography>
            <UserAccountsTable users={userAccounts} />
        </Container>
    );
}