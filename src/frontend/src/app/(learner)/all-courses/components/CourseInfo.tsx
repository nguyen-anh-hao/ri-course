'use client';

import { Box, Typography, Container, Button, Grid, Skeleton } from '@mui/material';
import React from 'react';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { getCookie } from 'cookies-next';

interface CourseInfoProps {
    courseName: string;
    mentor: string;
    description: string;
    courseId: number;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courseName, mentor, description, courseId }) => {
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleEnroll = () => {
        axios.post(`${appConfig.API_BASE_URL}/courses/${courseId}/learners`);
        window.alert('Đăng ký khóa học thành công!');
    };

    function convertToEncodedUrl(text: string) {
        return encodeURIComponent(text.trim().replace(/\s+/g, ' '));
    }

    const imageGenerator = (name: string) => {
        // https://dummyimage.com/854x480/FF5733/FFFFFF&text=L%E1%BA%ADp+tr%C3%ACnh+Web+Full+Stack
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        name = convertToEncodedUrl(name);
        return `https://dummyimage.com/854x480/${randomColor}/FFFFFF&text=${name}`;
    }

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
                <Grid item sm={12} md={6} sx={{ order: { xs: 1, md: 2 }, display: { xs: 'none', sm: 'block' } }}>
                    {/* <Skeleton variant='rectangular' width='100%' height='300px' /> */}
                    <Box position='relative' width='100%' height='300px'>
                        <img
                            src={imageGenerator(courseName)}
                            alt={courseName}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CourseInfo;
