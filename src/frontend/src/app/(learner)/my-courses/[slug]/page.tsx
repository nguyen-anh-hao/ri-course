import axios from 'axios';
import { getToken } from '@/utils/getToken';
import { notFound } from 'next/navigation';
import CourseInfo from '../components/CourseInfo';
import CourseDetail from '../components/CourseDetail';
import appConfig from '@/config/appConfig';
import generateSlug from '@/utils/generateSlug';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const fetchCourseData = async (slug: string) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${appConfig.API_BASE_URL}/courses/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const courses = response.data;
        return courses.find((course: { title: string }) => generateSlug(course.title) === slug);
    } catch (error) {
        console.error('Error fetching course data:', error);
        return null;
    }
};

export default async function CoursePage({ params }: PageProps) {
    const { slug } = await params;

    const courseData = await fetchCourseData(slug);

    if (!courseData) {
        return notFound();
    }

    return (
        <>
            <CourseInfo
                courseName={courseData.title}
                mentor={courseData.mentors.map((mentor: { fullname: string }) => mentor.fullname).join(', ')}
                description={courseData.description}
            />
            <CourseDetail courseId={courseData.id} />
        </>
    );
}