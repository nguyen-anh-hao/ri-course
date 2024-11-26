import React from 'react';
import UserAccountsTable from './components/UserAccountsTable';
import { Container } from '@mui/material';

export default function UserAccountsPage() {
    return <Container component='main' maxWidth='lg'>
        <UserAccountsTable users={mockUsers} />
    </Container>;
}

// Example usage with mock data
const mockUsers = [
    {
        id: 1,
        fullName: 'Nguyen Van A',
        username: 'nguyenvana',
        email: 'nguyenvana@example.com',
        role: 'Admin',
        createdAt: '2023-01-01',
        lastSignin: '2023-10-01',
    },
    {
        id: 2,
        fullName: 'Tran Thi B',
        username: 'tranthib',
        email: 'tranthib@example.com',
        role: 'User',
        createdAt: '2023-02-01',
        lastSignin: '2023-10-02',
    },
    {
        id: 3,
        fullName: 'Le Van C',
        username: 'levanc',
        email: 'levanc@example.com',
        role: 'User',
        createdAt: '2023-03-01',
        lastSignin: '2023-10-03',
    },
    {
        id: 4,
        fullName: 'Pham Thi D',
        username: 'phamthid',
        email: 'phamthid@example.com',
        role: 'Admin',
        createdAt: '2023-04-01',
        lastSignin: '2023-10-04',
    },
    {
        id: 5,
        fullName: 'Hoang Van E',
        username: 'hoangvane',
        email: 'hoangvane@example.com',
        role: 'User',
        createdAt: '2023-05-01',
        lastSignin: '2023-10-05',
    },
    {
        id: 6,
        fullName: 'Vu Thi F',
        username: 'vuthif',
        email: 'vuthif@example.com',
        role: 'User',
        createdAt: '2023-06-01',
        lastSignin: '2023-10-06',
    },
    {
        id: 7,
        fullName: 'Do Van G',
        username: 'dovang',
        email: 'dovang@example.com',
        role: 'Admin',
        createdAt: '2023-07-01',
        lastSignin: '2023-10-07',
    },
    {
        id: 8,
        fullName: 'Bui Thi H',
        username: 'buithih',
        email: 'buithih@example.com',
        role: 'User',
        createdAt: '2023-08-01',
        lastSignin: '2023-10-08',
    },
    {
        id: 9,
        fullName: 'Nguyen Van I',
        username: 'nguyenvani',
        email: 'nguyenvani@example.com',
        role: 'User',
        createdAt: '2023-09-01',
        lastSignin: '2023-10-09',
    },
    {
        id: 10,
        fullName: 'Tran Thi J',
        username: 'tranthij',
        email: 'tranthij@example.com',
        role: 'Admin',
        createdAt: '2023-10-01',
        lastSignin: '2023-10-10',
    },
    {
        id: 11,
        fullName: 'Le Van K',
        username: 'levank',
        email: 'levank@example.com',
        role: 'User',
        createdAt: '2023-11-01',
        lastSignin: '2023-10-11',
    },
    {
        id: 12,
        fullName: 'Pham Thi L',
        username: 'phamthil',
        email: 'phamthil@example.com',
        role: 'User',
        createdAt: '2023-12-01',
        lastSignin: '2023-10-12',
    }
];