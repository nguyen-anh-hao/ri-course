'use client'

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Container, Dialog, DialogTitle, IconButton, TextField, DialogContent, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import FileUpload from '@/components/ui/FileUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useTheme } from '@mui/material/styles'
import { getToken } from '@/utils/getToken';
import axios from 'axios';
import appConfig from '@/config/appConfig';

interface CourseDetailProps {
    courseId: number;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId }) => {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [anchorAddEl, setAnchorAddEl] = useState<null | HTMLElement>(null);
    const [anchorMoreEl, setAnchorMoreEl] = useState<null | HTMLElement>(null);
    const openAddMenu = Boolean(anchorAddEl);
    // const openMoreMenu = Boolean(anchorMoreEl);

    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorAddEl(event.currentTarget);
    };

    const handleAddClose = () => {
        setAnchorAddEl(null);
    };

    const handleMoreClose = () => {
        setAnchorMoreEl(null);
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

    const [selectedChapter, setSelectedChapter] = useState('');

    const handleChange = (e: any) => {
        setSelectedChapter(e.target.value);
    }

    const handleSaveTopic = () => {
        // console.log(newTopic);
        axios.post(`${appConfig.API_BASE_URL}/courses/${courseId}/chapters}`, {
            title: newTopic,
            description: '',
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error creating new topic:', error);
            });
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

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    useEffect(() => {
        if (openLessonDialog) {
            setTimeout(() => {
                const quillEditor = document.querySelector('.ql-editor') as HTMLElement;
                if (quillEditor) {
                    quillEditor.style.color = isDarkMode ? '#fff' : '#000';
                    quillEditor.style.fontSize = '16px';
                    quillEditor.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
                }
            }, 0);
        }
    }, [openLessonDialog, isDarkMode]);

    return (
        <>
            {/* Topic dialog */}
            <Dialog open={openTopicDialog} onClose={() => setOpenTopicDialog(false)}>
                {/* <DialogTitle>Thêm chủ đề</DialogTitle> */}
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
            <Dialog open={openLessonDialog} onClose={() => setOpenLessonDialog(false)} maxWidth='md' fullWidth >
                {/* <DialogTitle>Thêm bài học</DialogTitle> */}
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                    <TextField
                        autoFocus
                        label="Tên bài học"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewLesson(e.target.value)}
                        autoComplete="off"
                    />
                    <FormControl variant="standard" sx={{ my: 2 }} fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Chủ đề</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Topic"
                            onChange={handleChange}
                            value={selectedChapter}
                        >
                            <MenuItem value={10}>Biến và các kiểu dữ liệu</MenuItem>
                            <MenuItem value={20}>Các toán tử đầu vào</MenuItem>
                            <MenuItem value={30}>Vòng lặp</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Markdown Editor */}
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto', textAlign: 'center', pb: 0 }}>
                            <Typography variant="h6" gutterBottom>
                                Nội dung bài học
                            </Typography>
                            <ReactQuill
                                theme="bubble"
                                value={lessonContent}
                                onChange={setLessonContent}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['code-block'],
                                    ],
                                }}
                                style={{
                                    height: "200px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    padding: "10px",
                                    maxWidth: '666px',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <FileUpload />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={() => setOpenLessonDialog(false)}>Thoát</Button>
                    <Button onClick={handleSaveLesson}>Lưu</Button>
                </DialogActions>
            </Dialog>

            {/* Exercise dialog */}
            <Dialog open={openExerciseDialog} onClose={() => setOpenExerciseDialog(false)} maxWidth='md' fullWidth>
                {/* <DialogTitle>Thêm bài tập</DialogTitle> */}
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Tên bài tập"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewExercise(e.target.value)}
                        autoComplete="off"
                    />
                    <FormControl variant="standard" sx={{ my: 2 }} fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Chủ đề</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Topic"
                            onChange={handleChange}
                            value={selectedChapter}
                        >
                            <MenuItem value={10}>Biến và các kiểu dữ liệu</MenuItem>
                            <MenuItem value={20}>Các toán tử đầu vào</MenuItem>
                            <MenuItem value={30}>Vòng lặp</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Markdown Editor */}
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto', textAlign: 'center', pb: 0 }}>
                            <Typography variant="h6" gutterBottom>
                                Nội dung bài tập
                            </Typography>
                            <ReactQuill
                                theme="bubble"
                                value={lessonContent}
                                onChange={setLessonContent}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['code-block'],
                                    ],
                                }}
                                style={{
                                    height: "200px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    padding: "10px",
                                    maxWidth: '666px',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <FileUpload />
                    </Box>
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
                        onClick={handleAddClick}
                    >
                        <AddIcon />
                    </Button>
                    <Menu
                        anchorEl={anchorAddEl}
                        open={openAddMenu}
                        onClose={handleAddClose}
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
                                <div key={idx}>
                                    <Box key={idx} mt={1} border='0.5px solid #ddd' borderRadius='8px' display='flex' justifyContent='space-between' alignItems='center'>
                                        <Box sx={{ width: '100%', height: '100%', marginLeft: 2.5 }}>
                                            <Link href={`${window.location.href}/1`} passHref style={{ textDecoration: 'none' }}>
                                                <Typography variant='body1' sx={{ pl: 2 }}>
                                                    {lesson}
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <IconButton
                                            aria-controls={`menu-${index}-${idx}`}
                                            aria-haspopup="true"
                                            onClick={(event) => {
                                                setAnchorMoreEl(event.currentTarget);
                                            }}
                                            sx={{ margin: 2.5 }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id={`menu-${index}-${idx}`}
                                            anchorEl={anchorMoreEl}
                                            open={Boolean(anchorMoreEl)}
                                            onClose={handleMoreClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuItem onClick={() => { setOpenLessonDialog(true) }}>Chỉnh sửa</MenuItem>
                                            <MenuItem onClick={() => { /* handle delete */ }}>Xóa</MenuItem>
                                        </Menu>
                                    </Box>
                                </div>
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