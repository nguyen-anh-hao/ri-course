'use client'

import CourseCard from '@/components/ui/CourseCard';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import appConfig from '@/config/appConfig';
import { getCookie } from 'cookies-next';
import { User } from '@/interfaces/user.interfaces';

export default function AllCourses() {
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };


    type Course = {
        id: number;
        createdAt: string;
        updatedAt: string;
        title: string;
        mentors: User[];
        description: string;
    };

    const [courses, setCourses] = useState<{ [key: number]: Course }>({});

    useEffect(() => {
        axios.get(`${appConfig.API_BASE_URL}/users/me/courses`)
            .then(response => {
                const coursesData = response.data.reduce((acc: { [key: number]: Course }, course: Course) => {
                    acc[course.id] = course;
                    return acc;
                }, {});
                setCourses(coursesData);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    return (
        <Container component='main' maxWidth='lg'>
            <Typography variant='h4' sx={{ my: 4 }}>Khóa học của tôi</Typography>
            <Grid container spacing={2} justifyContent='left'>
                {Object.keys(courses).map((key) => {
                    const courseKey = Number(key);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={courseKey}>
                            <CourseCard
                                name={courses[courseKey].title}
                                mentor={courses[courseKey].mentors.map(m => m.fullname).join(', ')}
                                progress={randomInt(0, 100)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container >
    );
}