// components/NewCourseForm.tsx
'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';

// Interface cho props
interface NewCourseFormProps {
    open: boolean;
    onClose: () => void;
}

// Component NewCourseForm
const NewCourseForm: React.FC<NewCourseFormProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { setRefresh } = useRefresh();

    // Hàm kiểm tra hợp lệ các trường
    const isValidTitle = (title: string) => title.trim() !== '';
    const isValidDescription = (desc: string) => desc.trim() !== '';

    // Hàm để tạo mới khóa học
    const createCourse = async (data: { title: string; description: string }) => {
        try {
            await axios.post(`${appConfig.API_BASE_URL}/courses`, data);
            alert('Tạo khóa học thành công');
            setRefresh(prev => !prev);
            onClose();
        } catch (error) {
            console.error('Lỗi khi tạo khóa học:', error);
            alert('Có lỗi xảy ra khi tạo khóa học');
        }
    };

    // Hàm xử lý lưu thông tin
    const handleCreate = async () => {
        if (
            isValidTitle(title) &&
            isValidDescription(description)
        ) {
            await createCourse({ title, description });
        } else {
            alert('Vui lòng điền đầy đủ thông tin hợp lệ');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Tạo khóa học mới</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Tên khóa học'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                // error={!isValidTitle(title)}
                // helperText={!isValidTitle(title) ? 'Tên khóa học không được để trống' : ''}
                />
                <TextField
                    margin='dense'
                    label='Mô tả'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // error={!isValidDescription(description)}
                    // helperText={!isValidDescription(description) ? 'Mô tả không được để trống' : ''}
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={handleCreate} color='primary'>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewCourseForm;