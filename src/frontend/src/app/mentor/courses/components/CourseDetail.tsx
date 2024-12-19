'use client'

import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Container, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import ReactMarkdownEditorLite from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import FileUpload from '@/components/ui/FileUpload';

const CourseDetail: React.FC = () => {
    const mdParser = new MarkdownIt();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const chapters = [
        {
            title: 'Biến và các kiểu dữ liệu',
            lessons: [
                'Bài giảng lý thuyết',
                'Bài tập 1: Lorem Ipsum',
                'Bài tập 2: Lorem Ipsum',
            ],
        },
        {
            title: 'Các toán tử đầu vào',
            lessons: [
                'Bài giảng lý thuyết',
                'Bài tập 1: Lorem Ipsum',
                'Bài tập 2: Lorem Ipsum',
            ],
        },
    ];

    const [openTopicDialog, setOpenTopicDialog] = useState(false);
    const [newTopic, setNewTopic] = useState('');

    const [openLessonDialog, setOpenLessonDialog] = useState(false);
    const [newLesson, setNewLesson] = useState('');
    const [lessonContent, setLessonContent] = useState('');

    const [openExerciseDialog, setOpenExerciseDialog] = useState(false);
    const [newExercise, setNewExercise] = useState('');

    const handleSaveTopic = () => {
        console.log(newTopic);
        setOpenTopicDialog(false);
    };

    const handleSaveLesson = () => {
        console.log(newLesson);
        setOpenLessonDialog(false);
    }

    const handleSaveExercise = () => {
        console.log(newExercise);
        setOpenExerciseDialog(false);
    }

    return (
        <>
            {/* Topic dialog */}
            <Dialog open={openTopicDialog} onClose={() => setOpenTopicDialog(false)}>
                <DialogTitle>Thêm chủ đề</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Tên chủ đề"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewTopic(e.target.value)}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={() => setOpenTopicDialog(false)}>Thoát</Button>
                    <Button onClick={handleSaveTopic}>Lưu</Button>
                </DialogActions>
            </Dialog>

            {/* Lesson dialog  */}
            <Dialog open={openLessonDialog} onClose={() => setOpenLessonDialog(false)} maxWidth='lg' fullWidth={true} sx={{ height: '100vh' }}>
                <DialogTitle>Thêm bài học</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
                    <TextField
                        autoFocus
                        label="Tên bài học"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewLesson(e.target.value)}
                        autoComplete="off"
                    />

                    {/* Markdown Editor */}
                    <div style={{ marginTop: '20px', flexGrow: 1 }}>
                        <ReactMarkdownEditorLite
                            value={lessonContent}
                            onChange={({ text }) => setLessonContent(text)}
                            renderHTML={(text) => mdParser.render(text)}
                            style={{
                                height: '500px'
                            }}
                        />
                    </div>

                    <FileUpload />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={() => setOpenLessonDialog(false)}>Thoát</Button>
                    <Button onClick={handleSaveLesson}>Lưu</Button>
                </DialogActions>
            </Dialog>

            {/* Exercise dialog */}
            <Dialog open={openExerciseDialog} onClose={() => setOpenExerciseDialog(false)}>
                <DialogTitle>Thêm bài tập</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Tên bài tập"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewExercise(e.target.value)}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={() => setOpenExerciseDialog(false)}>Thoát</Button>
                    <Button onClick={handleSaveExercise}>Lưu</Button>
                </DialogActions>
            </Dialog>

            <Container maxWidth='lg' sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                <Box position='fixed' bottom={32} zIndex={999}>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ width: '56px', height: '56px' }}
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        sx={{ mt: -1 }}
                    >
                        <MenuItem onClick={() => setOpenTopicDialog(true)}>Chủ đề</MenuItem>
                        <MenuItem onClick={() => setOpenLessonDialog(true)}>Bài giảng</MenuItem>
                        <MenuItem onClick={() => setOpenExerciseDialog(true)}>Bài tập</MenuItem>
                    </Menu>
                </Box>
            </Container>
            <Container maxWidth='lg'>
                <Box mt={4}>
                    {chapters.map((chapter, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant='h4' mb={2} mt={4}>{chapter.title}</Typography>
                            {chapter.lessons.map((lesson, idx) => (
                                <Link key={idx} href='#' passHref style={{ textDecoration: 'none' }}>
                                    <Box key={idx} mt={1} padding={2} border='0.5px solid #ddd' borderRadius='8px'>
                                        <Typography variant='body1' sx={{ pl: 2 }}>
                                            {lesson}
                                        </Typography>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Container>
        </>
    );
};

export default CourseDetail;

// tính năng AI
// tải bài tập lên