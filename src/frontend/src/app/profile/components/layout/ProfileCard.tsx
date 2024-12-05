'use client'

import React from 'react';
import { Paper, Box, Avatar, Button, Typography, Skeleton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/user.interfaces';

interface ProfileCardProps {
    user?: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const router = useRouter();
    const handleUpdateProfileButtonClick = () => { router.push('/profile/update-information'); }

    const roleTranslations: { [key: string]: string } = {
        'Admin': 'Quản trị viên',
        'Learner': 'Học viên',
        'Mentor': 'Giáo viên',
    };

    const fullname = (user?.fullname != null) ? user?.fullname : user?.username;
    const roles = user?.roles.map((role) => roleTranslations[role]).join(', ');
    const dob = user?.dob.split('T')[0].split('-').reverse().join('/');
    const createAt = user?.createAt.split('T')[0].split('-').reverse().join('/');

    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' fontWeight='medium'>Hồ sơ cá nhân</Typography>
                <Button variant='outlined' sx={{ alignSelf: 'flex-end' }} onClick={handleUpdateProfileButtonClick}>Chỉnh sửa</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 8, alignItems: 'center', justifyItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 128, height: 128, borderRadius: '50%' }}>
                        <Avatar sx={{ width: '100%', height: '100%' }} />
                    </Box>
                    <Typography variant='body1'>
                        {user?.username != null ? user?.username : <Skeleton variant='text' width={100} />}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', width: '180px' }}>Họ và tên</Typography>
                        <Typography variant='body1'>
                            {fullname != null ? fullname : <Skeleton variant='text' width={100} />}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', width: '180px' }}>Ngày tháng năm sinh</Typography>
                        <Typography variant='body1'>
                            {dob != null ? dob : <Skeleton variant='text' width={100} />}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', width: '180px' }}>Email</Typography>
                        <Typography variant='body1'>
                            {user?.email != null ? user?.email : <Skeleton variant='text' width={100} />}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', width: '180px' }}>Vai trò</Typography>
                        <Typography variant='body1'>
                            {roles != null ? roles : <Skeleton variant='text' width={100} />}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold', width: '180px' }}>Ngày tạo tài khoản</Typography>
                        <Typography variant='body1'>
                            {createAt != null ? createAt : <Skeleton variant='text' width={100} />}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper >
    )
}

export default ProfileCard;