'use client';

import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/ui/GenericTable';
import { MenuItem, Button, Box, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserForm from './UserForm'; // Giả định rằng các component này tồn tại
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { User } from '@/interfaces/user.interfaces';
import { useRefresh } from '@/context/RefreshContext';

interface UserAccountsTableProps {
    users: User[];
}

const UserAccountsTable: React.FC<UserAccountsTableProps> = ({ users }) => {
    const { setRefresh } = useRefresh();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleDelete = async (user: User) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${user.username}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`${appConfig.API_BASE_URL}/users/${user.id}`);
                alert(`Tài khoản ${user.username} đã bị xóa.`);
                setRefresh(prev => !prev);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const columns: { id: keyof User; label: string; sortable?: boolean; render?: (value: any) => any }[] = [
        { id: 'id', label: 'ID', sortable: true },
        { id: 'fullname', label: 'Họ và tên', sortable: true },
        { id: 'username', label: 'Tên đăng nhập', sortable: true },
        { id: 'email', label: 'Email', sortable: true },
        {
            id: 'roles',
            label: 'Vai trò',
            sortable: true,
            render: (value: User['roles']) => (
                <>
                    {value.map(role => {
                        let label = '';
                        let color: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' = 'default';
                        switch (role) {
                            case 'Admin':
                                label = 'Quản trị viên';
                                color = 'error';
                                break;
                            case 'Learner':
                                label = 'Học viên';
                                color = 'success';
                                break;
                            case 'Mentor':
                                label = 'Giáo viên';
                                color = 'info';
                                break;
                            default:
                                label = role;
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
                </>
            )
        },
        {
            id: 'createAt',
            label: 'Ngày tạo tài khoản',
            sortable: true,
            render: (value: User['createAt']) => new Date(value).toLocaleDateString('en-GB')
        },
        {
            id: 'lastSignIn',
            label: 'Lần đăng nhập cuối',
            sortable: true,
            render: (value: User['lastSignIn']) => {
                const now = new Date();
                const lastSignInDate = value ? new Date(value) : new Date();
                const diffTime = Math.abs(now.getTime() - lastSignInDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays > 1) {
                    return `${diffDays} ngày trước`;
                } else {
                    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
                    if (diffHours > 1) {
                        return `${diffHours} giờ trước`;
                    } else {
                        const diffMinutes = Math.ceil(diffTime / (1000 * 60));
                        return `${diffMinutes} phút trước`;
                    }
                }
            }
        },
    ];

    const actions = (user: User) => ([
        <MenuItem key="edit" onClick={() => handleEdit(user)}>Chỉnh sửa</MenuItem>,
        <MenuItem key="delete" onClick={() => handleDelete(user)}>Xóa</MenuItem>,
    ]);

    return (
        <>
            {open && selectedUser && <UserForm open={open} onClose={() => setOpen(false)} user={selectedUser} />}

            <GenericTable
                columns={columns}
                data={users}
                actions={actions}
                searchPlaceholder="Tìm kiếm người dùng"
            />
        </>
    );
};

export default UserAccountsTable;