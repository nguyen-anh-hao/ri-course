'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Menu, MenuItem, TablePagination, TextField, TableSortLabel } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserAccountsTable = ({ users }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('fullName');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const sortedUsers = filteredUsers.sort((a, b) => {
        if (orderBy === 'createdAt' || orderBy === 'lastSignin') {
            return order === 'asc' ? new Date(a[orderBy]) - new Date(b[orderBy]) : new Date(b[orderBy]) - new Date(a[orderBy]);
        }
        return order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
    });

    const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearchChange}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox />
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'fullName'}
                                direction={orderBy === 'fullName' ? order : 'asc'}
                                onClick={() => handleRequestSort('fullName')}
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
                                Username
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
                                active={orderBy === 'role'}
                                direction={orderBy === 'role' ? order : 'asc'}
                                onClick={() => handleRequestSort('role')}
                            >
                                Role
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'createdAt'}
                                direction={orderBy === 'createdAt' ? order : 'asc'}
                                onClick={() => handleRequestSort('createdAt')}
                            >
                                Ngày tạo tài khoản
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'lastSignin'}
                                direction={orderBy === 'lastSignin' ? order : 'asc'}
                                onClick={() => handleRequestSort('lastSignin')}
                            >
                                Last signin
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell>{user.lastSignin}</TableCell>
                            <TableCell>
                                <IconButton onClick={handleMenuClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>Chỉnh sửa</MenuItem>
                                    <MenuItem onClick={handleMenuClose}>Xóa</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </TableContainer>
    );
};

export default UserAccountsTable;