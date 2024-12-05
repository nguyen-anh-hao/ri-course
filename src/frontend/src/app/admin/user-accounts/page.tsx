'use client'

import React, { useEffect } from 'react';
import UserAccountsTable from './components/UserAccountsTable';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useState } from 'react';
import { User } from '@/interfaces/user.interfaces';
import { useRefresh } from '@/context/RefreshContext';
import { getToken } from '@/utils/getToken';
import NewUserForm from './components/NewUserForm';

export default function UserAccountsPage() {
    const { refresh } = useRefresh();
    const [userAccounts, setUserAccounts] = useState<User[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${appConfig.API_BASE_URL}/users`);
                setUserAccounts(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, [refresh]);

    return (
        <>
            {open && <NewUserForm open={open} onClose={() => setOpen(false)} />}
            <Container component='main' maxWidth='xl'>
                <Typography variant='h4' mb={4}>Quản lý tài khoản</Typography>
                <Box display='flex' justifyContent='flex-end' width='100%' mb={2}>
                    <Button variant='contained' onClick={() => { setOpen(true); }}>
                        Tạo tài khoản
                    </Button>
                </Box>
                <UserAccountsTable users={userAccounts} />
            </Container>
        </>
    );
}