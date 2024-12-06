import React from 'react';
import { MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, patch } from '@mui/material';
import { User } from '@/interfaces/user.interfaces';
import { useState } from 'react';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';

const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

const formatDateTime = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

const isValidEmail = (email: string): boolean => {
    if (!email) return true;
    return /\S+@\S+\.\S+/.test(email);
}

const toISO8601 = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

const roleMap = [
    {
        value: 'Learner',
        label: 'Học viên',
    },
    {
        value: 'Mentor',
        label: 'Giáo viên',
    },
    {
        value: 'Admin',
        label: 'Quản trị viên',
    },
]

interface UserFormProps {
    open: boolean;
    onClose: () => void;
    user: User;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, user }) => {
    const [fullname, setFullname] = useState<string>(user.fullname);
    const [username, setUsername] = useState<string>(user.username);
    const [email, setEmail] = useState<string>(user.email ?? '');
    const [role, setRole] = useState<string>(roleMap.find(role => role.value === user.roles[0])?.value ?? '');
    const [dob, setDob] = useState<string>(formatDate(new Date(user.dob)));

    const { setRefresh } = useRefresh();

    const patchUser = async (userId: string, data: { fullname: string, username: string, email?: string, roles: string[], dob: string }) => {
        try {
            await axios.patch(`${appConfig.API_BASE_URL}/users/${userId}`, data);
            alert('Cập nhật tài khoản thành công');
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Chỉnh sửa thông tin tài khoản</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='ID'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={user?.id}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Tên đăng nhập'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={username}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Họ và tên'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    error={!fullname}
                    helperText={!fullname ? 'Họ và tên không được để trống' : ''}
                />
                <TextField
                    margin='dense'
                    label='Email'
                    type='email'
                    fullWidth
                    variant='outlined'
                    value={email ? email : ''}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!isValidEmail(email)}
                    helperText={!isValidEmail(email) ? 'Email không hợp lệ' : ''}
                />
                <TextField
                    margin='dense'
                    label='Vai trò'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={role}
                    select
                    onChange={(e) => setRole(e.target.value)}
                    error={!role}
                    helperText={!role ? 'Vai trò không được để trống' : ''}
                >
                    {roleMap.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                            {role.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin='dense'
                    label='Ngày sinh'
                    type='text'
                    fullWidth
                    variant='outlined'
                    defaultValue={formatDate(new Date(user?.dob))}
                    onChange={(e) => setDob(e.target.value)}
                    error={!dob || !isValidDate(dob)}
                    helperText={!dob ? 'Ngày sinh không được để trống' : !isValidDate(dob) ? 'Ngày sinh không hợp lệ' : ''}
                />
                <TextField
                    margin='dense'
                    label='Ngày tạo'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={formatDateTime(new Date(user?.createAt))}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Cập nhật lần cuối'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={user?.updatedAt ? formatDateTime(new Date(user.updatedAt)) : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Lần đăng nhập cuối'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={user?.lastSignIn ? formatDateTime(new Date(user.lastSignIn)) : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={async () => {
                    if (fullname && username && role && dob) {
                        await patchUser(user.id.toString(), { fullname, username, email, roles: [role], dob: toISO8601(dob) });
                        onClose();
                    } else {
                        alert('Vui lòng điền đầy đủ thông tin hợp lệ');
                    }
                }} color='primary'>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
