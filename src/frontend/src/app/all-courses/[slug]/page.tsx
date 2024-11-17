import React from 'react';
import CourseInfo from '../components/CourseInfo';
import { notFound } from 'next/navigation';
import axios from 'axios';
import config from '@/config/config';
import generateSlug from '@/utils/generateSlug';
import { getCookie } from 'cookies-next';

export const generateStaticParams = async () => {
    // need fix: token is not being set
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWQiOjIsInJvbGVzIjpbIkxlYXJuZXIiXSwiaWF0IjoxNzMxODM4NDQ0LCJleHAiOjE3MzE4NDIwNDR9.uALgBm5yawCirpOzDoq0ncO9715hkKU16VR-aUFHUj0"
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${config.API_BASE_URL}/courses/`);
    const courses = response.data;

    return courses.map((course: { title: string; }) => ({
        slug: generateSlug(course.title),
    }));
};

const fetchCourseData = async (slug: string) => {
    // need fix: token is not being set
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWQiOjIsInJvbGVzIjpbIkxlYXJuZXIiXSwiaWF0IjoxNzMxODM4NDQ0LCJleHAiOjE3MzE4NDIwNDR9.uALgBm5yawCirpOzDoq0ncO9715hkKU16VR-aUFHUj0";
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
