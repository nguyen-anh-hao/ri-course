import axios from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import CourseInfo from '../components/CourseInfo';
import appConfig from '@/config/appConfig';
import generateSlug from '@/utils/generateSlug';

const fetchCourseData = async (slug: string, token: string) => {
    try {
        const response = await axios.get(`${appConfig.API_BASE_URL}/courses/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const courses = response.data;
        return courses.find((course: { title: string }) => generateSlug(course.title) === slug);
    } catch (error) {
        console.error('Error fetching course data:', error);
        return null;
    }
};

export default async function CoursePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        return notFound();
    }

    const courseData = await fetchCourseData(slug, token);

    if (!courseData) {
        return notFound();
    }

    return (
        <CourseInfo
            courseName={courseData.title}
            mentor1="Mentor 1"
            mentor2="Mentor 2"
            description={courseData.description}
        />
    );
}
