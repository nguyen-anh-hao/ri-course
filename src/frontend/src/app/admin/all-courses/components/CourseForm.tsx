'use client';

import React, { use } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Autocomplete
} from '@mui/material';
import { Course } from '@/interfaces/course.interfaces'; // Đảm bảo đường dẫn đúng
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';

const formatDateTime = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()} ${date.getHours()
            .toString()
            .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// Interface cho props
interface CourseFormProps {
    open: boolean;
    onClose: () => void;
    course: Course;
}

// Component CourseForm
const CourseForm: React.FC<CourseFormProps> = ({ open, onClose, course }) => {
    const [title, setTitle] = useState<string>(course.title);
    const [description, setDescription] = useState<string>(course.description);
    const [mentor, setMentor] = useState<{ id: number; fullname: string }[]>([]);
    const [top20Mentor, setTop20Mentor] = useState<{ id: number; fullname: string }[]>([]);
    const [oldMentor, setOldMentor] = useState<{ id: number; fullname: string }[]>([]);

    const { setRefresh } = useRefresh();

    // Hàm kiểm tra hợp lệ các trường
    const isValidTitle = (title: string) => title.trim() !== '';
    const isValidDescription = (desc: string) => desc.trim() !== '';

    // Lấy danh sách mentor
    useEffect(() => {
        const fetchAllMentor = async () => {
            try {
                const response = await axios.get(`${appConfig.API_BASE_URL}/users`);
                const mentorList = response.data.filter((user: { roles: string[] }) => user.roles.includes('Mentor'));
                setTop20Mentor(mentorList);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách mentor:', error);
            }
        };

        const fetchMentor = async (
            data: { id: number }
        ) => {
            try {
                const response = await axios.get(`${appConfig.API_BASE_URL}/courses`);
                const mentors = response.data.filter((course: { id: number }) => course.id === data.id)[0].mentors;
                console.log(mentors);
                setMentor(mentors);
                setOldMentor(mentors);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách mentor của khóa học:', error);
            }
        }

        fetchAllMentor();
        fetchMentor({ id: course.id });
    }, [course]);

    // Hàm để cập nhật khóa học
    const patchCourse = async (
        courseId: string,
        data: { title: string; description: string }
    ) => {
        try {
            await axios.patch(`${appConfig.API_BASE_URL}/courses/${courseId}`, data);
            for (const m of oldMentor) {
                await axios.delete(`${appConfig.API_BASE_URL}/courses/${courseId}/mentors/${m.id}`);
            }
            for (const m of mentor) {
                await axios.post(`${appConfig.API_BASE_URL}/courses/${courseId}/mentors/`, { mentorId: m.id });
            }
            alert('Cập nhật khóa học thành công');
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Lỗi khi cập nhật khóa học:', error);
            alert('Có lỗi xảy ra khi cập nhật khóa học');
        }
    };

    // Hàm xử lý lưu thông tin
    const handleSave = async () => {
        if (
            isValidTitle(title) &&
            isValidDescription(description)
        ) {
            await patchCourse(course.id.toString(), { title, description });
            onClose();
        } else {
            alert('Vui lòng điền đầy đủ thông tin hợp lệ');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Chỉnh sửa thông tin khóa học</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='ID'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={course?.id}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Tên khóa học'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!isValidTitle(title)}
                    helperText={!isValidTitle(title) ? 'Tên khóa học không được để trống' : ''}
                />
                <TextField
                    margin='dense'
                    label='Mô tả'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!isValidDescription(description)}
                    helperText={!isValidDescription(description) ? 'Mô tả không được để trống' : ''}
                    multiline
                    rows={4}
                />
                <Autocomplete
                    multiple
                    options={top20Mentor}
                    value={mentor}
                    onChange={(e, newValue) => setMentor(newValue)}
                    getOptionLabel={(option) => (option as { id: number; fullname: string }).fullname}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant='outlined'
                            label='Mentor'
                            fullWidth
                            sx={{ my: 1 }}
                        />
                    )}
                />
                <TextField
                    margin='dense'
                    label='Ngày tạo'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={formatDateTime(new Date(course?.createAt))}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Cập nhật lần cuối'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={formatDateTime(new Date(course?.updatedAt))}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={handleSave} color='primary'>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseForm;