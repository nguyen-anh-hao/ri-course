import React from 'react';
import { MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';

const isValidDate = (dateString: string): boolean => {
    if (!dateString) return true;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

const toISO8601 = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

interface NewExamFormProps {
    open: boolean;
    onClose: () => void;
}

const NewExamForm: React.FC<NewExamFormProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);

    const { setRefresh } = useRefresh();

    async function newExam(data: { title: string; description: string; date: string; duration: number; }) {
        try {
            const newExam = {
                ...data,
                date: toISO8601(data.date),
            };

            await axios.post(`${appConfig.API_BASE_URL}/exams`, newExam);

            alert('Thêm kỳ thi thành công');
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error creating new exam:', error);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Thêm kỳ thi mới</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Tiêu đề'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='Mô tả'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='Ngày thi'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    error={!isValidDate(date)}
                    helperText={!isValidDate(date) ? 'Ngày thi không hợp lệ' : ''}
                />
                <TextField
                    margin='dense'
                    label='Thời gian (phút)'
                    type='number'
                    fullWidth
                    variant='outlined'
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={async () => {
                    if (title && description && date && isValidDate(date) && duration > 0) {
                        await newExam({ title, description, date, duration });
                        onClose();
                    } else {
                        alert('Vui lòng điền đầy đủ thông tin');
                    }
                }}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewExamForm;