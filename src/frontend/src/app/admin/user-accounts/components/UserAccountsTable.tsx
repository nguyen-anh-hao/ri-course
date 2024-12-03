'use client';

import React, { useState } from 'react';
import { Button, Chip, InputAdornment, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, TablePagination, TextField, TableSortLabel, Select, FormControl, InputLabel, MenuItem as SelectMenuItem, Box, SelectChangeEvent } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import UserForm from './UserForm';
import NewUserForm from './NewUserForm';
import { User } from '../interfaces/user.interfaces';
import axios from 'axios';
import appConfig from '@/config/appConfig';

interface UserAccountsTableProps {
    users: User[];
}

const UserAccountsTable: React.FC<UserAccountsTableProps> = ({ users }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof User>('id');
    const [roleFilter, setRoleFilter] = useState('');
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleRequestSort = (property: keyof User) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRoleFilterChange = (event: SelectChangeEvent<string>) => {
        setRoleFilter(event.target.value as string);
    };

    const handleDeleteAccount = () => {
        if (selectedUser) {
            const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${selectedUser.username}?`);
            if (confirmDelete) {
                try {
                    axios.delete(`${appConfig.API_BASE_URL}/users/${selectedUser.id}`);
                    setSelectedUser(null);
                    alert(`Tài khoản ${selectedUser.username} đã bị xóa.`);
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        }
    }

    const filteredUsers = users.filter(user =>
        (user.fullname.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase())) &&
        (roleFilter === '' || user.roles.includes(roleFilter))
    );

    const sortedUsers = filteredUsers.sort((a, b) => {
        if (orderBy === 'createAt' || orderBy === 'lastSignIn') {
            return order === 'asc' ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime() : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
        }
        if (orderBy === 'roles') {
            return order === 'asc' ? a.roles[0].localeCompare(b.roles[0]) : b.roles[0].localeCompare(a.roles[0]);
        }
        if (orderBy === 'id') {
            return order === 'asc' ? parseInt(a[orderBy]) - parseInt(b[orderBy]) : parseInt(b[orderBy]) - parseInt(a[orderBy]);
        }
        return order === 'asc' ? (a[orderBy] as string).localeCompare(b[orderBy] as string) : (b[orderBy] as string).localeCompare(a[orderBy] as string);
    });

    const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            {open && selectedUser && <UserForm open={open} onClose={() => setOpen(false)} user={selectedUser} />}
            {newUser && <NewUserForm open={newUser} onClose={() => setNewUser(false)} />}

            <Box display='flex' justifyContent='flex-end' width='100%'>
                <Button variant='contained' onClick={() => { setNewUser(true); }}>
                    Tạo tài khoản
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={8} md={9} lg={10}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        size='small'
                        value={search}
                        onChange={handleSearchChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: '32px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '32px',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={4} md={3} lg={2}>
                    <FormControl fullWidth variant='outlined' margin='normal' size='small' sx={{
                        borderRadius: '32px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '32px',
                        },
                    }}>
                        <InputLabel>Vai trò</InputLabel>
                        <Select
                            value={roleFilter}
                            onChange={handleRoleFilterChange}
                            label='Vai trò'
                        >
                            <SelectMenuItem value=''>Tất cả</SelectMenuItem>
                            <SelectMenuItem value='Admin'>Quản trị viên</SelectMenuItem>
                            <SelectMenuItem value='Learner'>Học viên</SelectMenuItem>
                            <SelectMenuItem value='Mentor'>Giáo viên</SelectMenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={() => handleRequestSort('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'fullname'}
                                    direction={orderBy === 'fullname' ? order : 'asc'}
                                    onClick={() => handleRequestSort('fullname')}
                                >
                                    Họ và tên
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'username'}
                                    direction={orderBy === 'username' ? order : 'asc'}
                                    onClick={() => handleRequestSort('username')}
                                >
                                    Tên đăng nhập
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleRequestSort('email')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'roles'}
                                    direction={orderBy === 'roles' ? order : 'asc'}
                                    onClick={() => handleRequestSort('roles')}
                                >
                                    Vai trò
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'createAt'}
                                    direction={orderBy === 'createAt' ? order : 'asc'}
                                    onClick={() => handleRequestSort('createAt')}
                                >
                                    Ngày tạo tài khoản
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'lastSignIn'}
                                    direction={orderBy === 'lastSignIn' ? order : 'asc'}
                                    onClick={() => handleRequestSort('lastSignIn')}
                                >
                                    Lần đăng nhập cuối
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.id} sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.fullname}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.roles.map(role => {
                                        let label;
                                        let color: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
                                        switch (role) {
                                            case 'Admin':
                                                label = 'Quản trị viên';
                                                color = 'error';
                                                break;
                                            case 'Learner':
                                                label = 'Học viên';
                                                color = 'info';
                                                break;
                                            case 'Mentor':
                                                label = 'Giáo viên';
                                                color = 'success';
                                                break;
                                            default:
                                                label = role;
                                                color = 'default';
                                        }
                                        return (
                                            <Chip
                                                key={role}
                                                label={label}
                                                color={color}
                                                sx={{ marginRight: 0.5 }}
                                            />
                                        );
                                    })}
                                </TableCell>
                                <TableCell>{new Date(user.createAt).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>
                                    {(() => {
                                        const now = new Date();
                                        const lastSignInDate = new Date(user.lastSignIn);
                                        const diffInSeconds = Math.floor((now.getTime() - lastSignInDate.getTime()) / 1000);

                                        if (diffInSeconds < 60) {
                                            return `${diffInSeconds} giây trước`;
                                        } else if (diffInSeconds < 3600) {
                                            return `${Math.floor(diffInSeconds / 60)} phút trước`;
                                        } else if (diffInSeconds < 86400) {
                                            return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
                                        } else {
                                            return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
                                        }
                                    })()}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => handleMenuClick(event, user)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => { setOpen(true); handleMenuClose(); }}>Chỉnh sửa</MenuItem>
                                        <MenuItem onClick={() => { handleDeleteAccount(); handleMenuClose(); }} sx={{ color: 'error.main' }}>Xóa</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </TableContainer>
        </>
    );
};

export default UserAccountsTable;
