'use client';

import { Box, Typography, Container, Button, Grid, Skeleton } from '@mui/material';
import React from 'react';

interface CourseInfoProps {
    courseName: string;
    mentor: string;
    description: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courseName, mentor, description }) => {
    const handleEnroll = () => {
        console.log('Enroll button clicked');
    };

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={3}>
                <Grid item sm={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                    <Box padding={2} display='flex' flexDirection='column' gap={4}>
                        <Typography variant='h3'>
                            {courseName}
                        </Typography>
                        <Box display='flex' flexDirection='column' gap={1}>
                            <Typography variant='body1'>
                                <strong>Giáo viên: </strong>
                                <span>{mentor}</span>
                            </Typography>
                        </Box>
                        <Typography variant='body1' color='textSecondary' paragraph>
                            {description}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Button variant='contained' sx={{ width: 'fit-content' }} onClick={() => { handleEnroll() }}>
                                Đăng ký khóa học
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                    <Skeleton variant='rectangular' width='100%' height='300px' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CourseInfo;
