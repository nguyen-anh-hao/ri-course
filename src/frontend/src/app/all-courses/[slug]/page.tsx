import React from 'react';
import CourseInfo from '../components/CourseInfo';
import { notFound } from 'next/navigation';
import axios from 'axios';
import config from '@/config/config';
import generateSlug from '@/utils/generateSlug';

export const generateStaticParams = async () => {
    // const token = sessionStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaGhhbzIwMDQiLCJpZCI6MTEsInJvbGVzIjpbIkxlYXJuZXIiXSwiaWF0IjoxNzMxODMwNjM3LCJleHAiOjE3MzE4MzQyMzd9.iHxoJI3D2mOh1vE_I9ZoECR8Xn6vb6EvVjd2bNSEdvw";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${config.API_BASE_URL}/courses/`);
    const courses = response.data;

    return courses.map((course: { title: string; }) => ({
        slug: generateSlug(course.title),
    }));
};

const fetchCourseData = async (slug: string) => {
    // const token = sessionStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaGhhbzIwMDQiLCJpZCI6MTEsInJvbGVzIjpbIkxlYXJuZXIiXSwiaWF0IjoxNzMxODMwNjM3LCJleHAiOjE3MzE4MzQyMzd9.iHxoJI3D2mOh1vE_I9ZoECR8Xn6vb6EvVjd2bNSEdvw";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${config.API_BASE_URL}/courses/`);
    const courses = response.data;

    return courses.find((course: { title: string }) => generateSlug(course.title) === slug);
};

const CoursePage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const courseData = await fetchCourseData(slug);

    if (!courseData) {
        return notFound();
    }

    return <CourseInfo
        courseName={courseData.title}
        mentor1='Mentor 1'
        mentor2='Mentor 2'
        description={courseData.description}
    />;
};

export default CoursePage;
