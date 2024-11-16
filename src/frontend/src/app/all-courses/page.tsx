'use client'

import CourseCard from '@/components/ui/CourseCard';
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '@/config/config';

export default function AllCourses() {
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    type Course = {
        id: number;
        createdAt: string;
        updatedAt: string;
        title: string;
        mentor: string;
        description: string;
    };

    const [courses, setCourses] = useState<{ [key: number]: Course }>({});

    useEffect(() => {
        axios.get(`${config.API_BASE_URL}/courses`)
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
            <Grid container spacing={2} justifyContent='left'>
                {Object.keys(courses).map((key) => {
                    const courseKey = Number(key);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={courseKey}>
                            <CourseCard
                                name={courses[courseKey].title}
                                mentor={courses[courseKey].mentor}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container >
    );
}