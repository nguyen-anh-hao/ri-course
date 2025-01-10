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

    type Course = {
        id: number;
        createdAt: string;
        updatedAt: string;
        title: string;
        mentors: User[];
        description: string;
    };

    const [thisMentor, setThisMentor] = useState<User | null>(null);
    const [courses, setCourses] = useState<{ [key: number]: Course }>({});
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const mentorCoursesMap: { [key: number]: Course[] } = {};

    // Fetch this mentor data
    useEffect(() => {
        axios.get(`${appConfig.API_BASE_URL}/users/me`)
            .then(response => {
                setThisMentor(response.data);
            })
            .catch(error => {
                console.error('Error fetching mentor data:', error);
            });
    }, []);

    // Fetch all courses
    useEffect(() => {
        function fetchAllCoursesIds() {
            var courses: Course[] = [];
            axios.get(`${appConfig.API_BASE_URL}/courses`)
                .then(response => {
                    setAllCourses(response.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }

        fetchAllCoursesIds();
    }, []);

    // Fetch courses list for each mentor
    useEffect(() => {
        const fetchPermittedCourses = async () => {
            const response = await axios.get(`${appConfig.API_BASE_URL}/users/me/permitted-courses`);
            console.log(response.data);
            setCourses(response.data);
        };

        fetchPermittedCourses();
    }, []);

    return (
        <Container component='main' maxWidth='lg'>
            <Typography variant='h4' sx={{ my: 4 }}>Quản lý khóa học</Typography>
            <Grid container spacing={2} justifyContent='left'>
                {Object.keys(courses).map((key) => {
                    const courseKey = Number(key);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={courseKey}>
                            <CourseCard
                                name={courses[courseKey].title}
                                mentor={courses[courseKey].mentors.map((m) => m.fullname).join(', ')}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container >
    );
}