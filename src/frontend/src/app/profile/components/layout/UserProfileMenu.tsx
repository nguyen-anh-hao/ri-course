'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Paper, Typography, Button } from '@mui/material';
import UserProfileMenuButton from '../ui/UserProfileMenuButton';
import theme from '@/styles/theme';
import { useAuth } from '@/context/AuthContext';

interface UserProfileMenuProps {
    activeButton: string;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ activeButton }) => {
    const router = useRouter();
    const { user, signout } = useAuth();

    const handleProfileButtonClick = () => { router.push('/profile'); }
    const handleChangePasswordButtonClick = () => { router.push('/profile/change-password'); }
    const handleLogoutButtonClick = () => { signout(); router.push('/'); }

    return (
        <Paper elevation={3} sx={{ py: 2, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{ px: 2, display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 1 }}>
                <Typography variant='h6' fontWeight='medium'>
                    Thông tin tài khoản
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
                <UserProfileMenuButton
                    onClick={() => handleProfileButtonClick()}
                    text='Hồ sơ cá nhân'
                    isActive={activeButton === 'profile'}
                />
                <UserProfileMenuButton
                    onClick={() => handleChangePasswordButtonClick()}
                    text='Thay đổi mật khẩu'
                    isActive={activeButton === 'password'}
                />
                <UserProfileMenuButton
                    onClick={() => handleLogoutButtonClick()}
                    text='Đăng xuất'
                    isActive={activeButton === 'logout'}
                    inactiveColor={theme.palette.error.main}
                />
            </Box>
        </Paper>
    );
};

export default UserProfileMenu;
