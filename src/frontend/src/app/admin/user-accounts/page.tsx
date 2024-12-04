'use client'

import React, { useEffect } from 'react';
import UserAccountsTable from './components/UserAccountsTable';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useState } from 'react';
import { User } from './interfaces/user.interfaces';
import { useRefresh } from '@/context/RefreshContext';
import { getToken } from '@/utils/getToken';

export default function UserAccountsPage() {
    const [userAccounts, setUserAccounts] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { refresh } = useRefresh();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${appConfig.API_BASE_URL}/users/all`);
                setUserAccounts(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [refresh]);

    if (loading) return <></>;

    return (
        <Container component='main' maxWidth='xl'>
            <Typography variant='h4' mb={4}>Quản lý tài khoản</Typography>
            <UserAccountsTable users={userAccounts} />
        </Container>
    );
}