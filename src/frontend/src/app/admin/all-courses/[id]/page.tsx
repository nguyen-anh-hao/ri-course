'use client'

import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import CourseDetail from '../components/CourseDetail';
import EditCourseForm from '../components/EditCourseForm';

interface Params {
    id: string;
}

export default function CourseDetails({ params }: { params: Params }) {
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
                    <CourseDetail />
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