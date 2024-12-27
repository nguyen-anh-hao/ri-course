import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Container } from '@mui/material';
import CourseInfo from '@/app/(learner)/all-courses/components/CourseInfo'

const CourseDetail: React.FC = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const courseData = {
        courseName: "Khóa học ABC",
        mentor1: "A",
        mentor2: "B",
        description: "Đây là một khóa học tuyệt vời.",
    };

    const chapters = [
        {
            title: "Chương 1: Lorem Ipsum",
            lessons: [
                "Bài giảng lý thuyết",
                "Bài tập 1: Lorem Ipsum",
                "Bài tập 2: Lorem Ipsum",
            ],
        },
        {
            title: "Chương 2: Lorem Ipsum",
            lessons: [
                "Bài giảng lý thuyết",
                "Bài tập 1: Lorem Ipsum",
                "Bài tập 2: Lorem Ipsum",
            ],
        },
    ];

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteCourse = () => {
        console.log("Khóa học đã bị xóa");
        setOpenDeleteDialog(false);
        // API xóa khóa học
    };

    return (
        <Container maxWidth="lg">
            <CourseInfo
                courseName={courseData.courseName}
                mentor1={courseData.mentor1}
                mentor2={courseData.mentor2}
                description={courseData.description}
            />

            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" color="primary">
                    Chỉnh sửa khóa học
                </Button>
                <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>
                    Xóa khóa học
                </Button>
            </Box>

            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Danh sách chương
                </Typography>
                {chapters.map((chapter, index) => (
                    <Box key={index} p={2} border="1px solid #ddd" borderRadius="8px" mb={2}>
                        <Typography variant="h6">{chapter.title}</Typography>
                        <Box mt={1}>
                            {chapter.lessons.map((lesson, idx) => (
                                <Typography key={idx} variant="body1" sx={{ pl: 2 }}>
                                    - {lesson}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="confirm-delete-dialog-title"
                aria-describedby="confirm-delete-dialog-description"
            >
                <DialogTitle id="confirm-delete-dialog-title">Xác nhận xóa khóa học</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteCourse} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CourseDetail;
