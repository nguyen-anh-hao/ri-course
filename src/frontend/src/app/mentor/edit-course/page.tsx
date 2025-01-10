'use client'

import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import CourseDetail from '../courses/components/CourseDetail';
import EditCourseForm from '../courses/components/EditCourseForm';

const CoursePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container maxWidth="lg">
            {isEditing ? (
                <Box>
                    <EditCourseForm />
                    <Box mt={4} display="flex" justifyContent="center">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleEditToggle}
                        >
                            Quay lại
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <CourseDetail courseId={0} />
                    <Box mt={4} display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditToggle}
                        >
                            Chỉnh sửa khóa học
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default CoursePage;