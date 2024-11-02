import { Box, Typography, Container, Button } from '@mui/material';
import React from 'react';

interface CourseInfoProps {
    courseName: string;
    mentor1: string;
    mentor2: string;
    description: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courseName, mentor1, mentor2, description }) => {
    return (
        <Container component='section' maxWidth='md' sx={{ padding: '2rem 0' }}>
            <Box display='flex' flexDirection='column' alignItems='left' textAlign='left' gap={2}>
                <Typography variant='h4' component='h1' fontWeight='bold' gutterBottom>
                    {courseName}
                </Typography>
                <Box display='flex' flexDirection='column' gap={1}>
                    <Typography variant='body1'>
                        <strong>Giáo viên:</strong> <span style={{ color: 'orange' }}>{mentor1}</span>
                    </Typography>
                    <Typography variant='body1'>
                        <strong>Giáo viên:</strong> <span style={{ color: 'orange' }}>{mentor2}</span>
                    </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary' paragraph>
                    {description}
                </Typography>
                <Button variant='contained' color='primary' sx={{ width: 'fit-content' }}>
                    Đăng ký khóa học
                </Button>
            </Box>
        </Container>
    );
};

export default CourseInfo;
