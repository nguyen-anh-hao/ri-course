import React, { useState } from 'react';
import { MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { useRefresh } from '@/context/RefreshContext';
import { Exam } from '@/interfaces/exam.interfaces';

const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

const formatDateTime = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

const isValidDate = (dateString: string): boolean => {
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

interface ExamFormProps {
    open: boolean;
    onClose: () => void;
    exam: Exam;
}

const ExamForm: React.FC<ExamFormProps> = ({ open, onClose, exam }) => {
    const [title, setTitle] = useState<string>(exam.name);
    const [description, setDescription] = useState<string>(exam.description);
    const [date, setDate] = useState<string>(formatDate(new Date(exam.date)));
    const [duration, setDuration] = useState<number>(exam.duration);

    const { setRefresh } = useRefresh();

    const patchExam = async (examId: string, data: { title: string, description: string, date: string, duration: number }) => {
        try {
            await axios.patch(`${appConfig.API_BASE_URL}/exams/${examId}`, data);
            alert('Cập nhật kỳ thi thành công');
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Chỉnh sửa thông tin kỳ thi</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='ID'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={exam?.id}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin='dense'
                    label='Tiêu đề'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!title}
                    helperText={!title ? 'Tiêu đề không được để trống' : ''}
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
                    error={!date || !isValidDate(date)}
                    helperText={!date ? 'Ngày thi không được để trống' : !isValidDate(date) ? 'Ngày thi không hợp lệ' : ''}
                />
                <TextField
                    margin='dense'
                    label='Thời lượng (phút)'
                    type='number'
                    fullWidth
                    variant='outlined'
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    error={!duration}
                    helperText={!duration ? 'Thời lượng không được để trống' : ''}
                />
                <TextField
                    margin='dense'
                    label='Ngày tạo'
                    type='text'
                    fullWidth
                    variant='outlined'
                    value={formatDateTime(new Date(exam?.createdAt))}
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
                    value={exam?.updatedAt ? formatDateTime(new Date(exam.updatedAt)) : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Hủy
                </Button>
                <Button onClick={async () => {
                    if (title && date && duration) {
                        await patchExam(exam.id.toString(), { title, description, date: toISO8601(date), duration });
                        onClose();
                    } else {
                        alert('Vui lòng điền đầy đủ thông tin hợp lệ');
                    }
                }} color='primary'>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExamForm;