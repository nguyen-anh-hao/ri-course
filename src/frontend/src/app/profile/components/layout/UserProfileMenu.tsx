'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Paper, Typography, Button } from '@mui/material';
import UserProfileMenuButton from '../ui/UserProfileMenuButton';

interface UserProfileMenuProps {
    activeButton: string;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ activeButton }) => {
    const router = useRouter();

    const handleProfileButtonClick = () => { router.push('/profile'); }
    const handleChangePasswordButtonClick = () => { router.push('/profile/change-password'); }
    const handleLogoutButtonClick = () => { }

    return (
        <Paper elevation={3} sx={{ py: 2, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{ px: 2, display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight="medium">
                    Thông tin tài khoản
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
                <UserProfileMenuButton
                    onClick={() => handleProfileButtonClick()}
                    text="Hồ sơ cá nhân"
                    isActive={activeButton === 'profile'}
                />
                <UserProfileMenuButton
                    onClick={() => handleChangePasswordButtonClick()}
                    text="Thay đổi mật khẩu"
                    isActive={activeButton === 'password'}
                    inactiveColor="black"
                />
                <UserProfileMenuButton
                    onClick={() => handleLogoutButtonClick()}
                    text="Đăng xuất"
                    isActive={activeButton === 'logout'}
                    inactiveColor="#d32f2f"
                />
            </Box>
        </Paper>
    );
};

export default UserProfileMenu;
