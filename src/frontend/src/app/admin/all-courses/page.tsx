'use client'

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Button, Box } from '@mui/material';
import CourseManagementTable from './components/CourseManagementTable';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { getToken } from '@/utils/getToken';
import CourseForm from './components/CourseForm';
import { useRefresh } from '@/context/RefreshContext';
import NewCourseForm from './components/NewCourseForm';
import { Course } from '@/interfaces/course.interfaces';

const CoursePage: React.FC = () => {
    const { refresh } = useRefresh();
    const [openCourseForm, setOpenCourseForm] = useState(false);
    const [openNewCourseForm, setOpenNewCourseForm] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${appConfig.API_BASE_URL}/courses`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }

        const fetchMentor = async () => {
            try {
                for (const course of courses) {
                    const response = await axios.get(`${appConfig.API_BASE_URL}/courses/${course.id}/mentors`);
                    course.mentor = response.data;
                }
            } catch (error) {
                console.error('Error fetching mentor:', error);
            }
        }

        fetchCourses();
    }, [refresh, courses]);

    const deleteCourse = async (courseId: number) => {
        try {
            await axios.delete(`${appConfig.API_BASE_URL}/courses/${courseId}`);
            setCourses(courses.filter(c => c.id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }

    const handleEdit = (course: Course) => {
        // Implement edit functionality
        setOpenCourseForm(true);
        setSelectedCourse(course);
    };

    const handleDelete = (course: Course) => {
        // Implement delete functionality
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa khóa học ${course.title}?`);
        if (!confirm) return;
        deleteCourse(course.id);
        setCourses(courses.filter(c => c.id !== course.id));
    };

    const handleCreate = () => {
        // Implement create functionality
        setOpenNewCourseForm(true);
    }

    return (
        <>
            {openCourseForm && <CourseForm open={openCourseForm} onClose={() => setOpenCourseForm(false)} course={selectedCourse} />}
            {openNewCourseForm && <NewCourseForm open={openNewCourseForm} onClose={() => setOpenNewCourseForm(false)} />}
            < Container component='main' maxWidth='xl' >
                <Typography variant='h4' mb={4}>Quản lý khóa học</Typography>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Thêm khóa học
                    </Button>
                </Box>
                <CourseManagementTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
            </Container >
        </>
    );
};

export default CoursePage;