'use client'

import React from 'react';
import { Paper, Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProfileCard: React.FC = () => {
    const router = useRouter();
    const handleUpdateProfileButtonClick = () => { router.push('/profile/update-information'); }

    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="medium">Hồ sơ cá nhân</Typography>
                <Button variant='outlined' sx={{ alignSelf: 'flex-end' }} onClick={handleUpdateProfileButtonClick}>Chỉnh sửa</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 8, alignItems: 'center', justifyItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        sx={{ width: 128, height: 128, borderRadius: '50%' }}
                        src="https://ui-avatars.com/api/?background=random"
                        alt="Avatar"
                    />
                    <Typography variant="body1">JohnDoe</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: '180px' }}>Họ và tên</Typography>
                        <Typography variant="body1">John Doe</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: '180px' }}>Ngày tháng năm sinh</Typography>
                        <Typography variant="body1">12/03/2004</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: '180px' }}>Email</Typography>
                        <Typography variant="body1">john.doe@example.com</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: '180px' }}>Vai trò</Typography>
                        <Typography variant="body1">Học viên</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: '180px' }}>Ngày tạo tài khoản</Typography>
                        <Typography variant="body1">22/10/2024</Typography>
                    </Box>
                </Box>
            </Box>
        </Paper >
    )
}

export default ProfileCard;