import React from 'react';
import { Card, Paper, Typography, LinearProgress, Skeleton, Box } from '@mui/material';

interface CourseCardProps {
    name: string;
    mentor: string;
    progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, mentor, progress }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    paddingTop: '54%', // Tạo chiều cao 54% chiều rộng
                    position: 'relative',
                    backgroundColor: 'transparent', // Nền trong suốt
                }}
            >
                <Skeleton
                    variant='rectangular'
                    width='100%'
                    height='100%' // Chiều cao sẽ bằng 54% chiều rộng nhờ padding-top
                    sx={{ position: 'absolute', top: 0, left: 0 }} // Đặt Skeleton ở vị trí chính xác
                />
            </Box>
            <Box sx={{ px: 2, py: 1 }}>
                <Typography variant='h6' component='h2'>
                    {name}
                </Typography>
                <Typography variant='body2' component='p'>
                    Giáo viên: {mentor}
                </Typography>
            </Box>
            {progress !== undefined && (
                <LinearProgress variant='determinate' value={progress} />
            )}
        </Paper>
    );
}

export default CourseCard;