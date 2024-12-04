import React from 'react';
import { MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, patch } from '@mui/material';
import { User } from '../interfaces/user.interfaces';
import { useState } from 'react';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';

const toISO8601 = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

const isValidEmail = (email: string): boolean => {
    if (!email) return true;
    return /\S+@\S+\.\S+/.test(email);
}

const isValidDate = (dateString: string): boolean => {
    if (!dateString) return true;
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

interface NewUserFormProps {
    open: boolean;
    onClose: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ open, onClose }) => {
    const [fullname, setFullname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [dob, setDob] = useState<string>('');

    const { setRefresh } = useRefresh();

    async function newUser(data: { fullname: string; username: string; email: string; dob: string; password: string; }) {
        try {
            const newUser = {
                ...data,
                roles: [roleMap.find(r => r.value === role)?.value ?? 'Learner'],
            };

            await axios.post(`${appConfig.API_BASE_URL}/users`, newUser);

            alert('Thêm tài khoản thành công');
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error creating new user:', error);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Thêm tài khoản mới</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Tên đăng nhập'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                // error={!isValidUsername(username)}
                // helperText={!isValidUsername(username) ? 'Tên đăng nhập đã tồn tại' : ''}
                />
                <TextField
                    margin='dense'
                    label='Họ và tên'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='Email'
                    type='email'
                    fullWidth
                    variant='outlined'
                    value={email}
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
                    defaultValue='Quản trị viên'
                    value={role}
                    select
                    onChange={(e) => setRole(e.target.value)}
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
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    error={!isValidDate(dob)}
                    helperText={!isValidDate(dob) ? 'Ngày sinh không hợp lệ' : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={async () => {
                    if (fullname && username && role && dob && isValidDate(dob)) {
                        await newUser({ fullname, username, email, dob: toISO8601(dob), password: '123456' });
                        onClose();
                    } else {
                        alert('Vui lòng điền đầy đủ thông tin');
                    }
                }} color='primary'>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewUserForm;
