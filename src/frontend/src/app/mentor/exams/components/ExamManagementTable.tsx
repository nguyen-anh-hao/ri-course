'use client';

import React, { useState } from 'react';
import GenericTable from '@/components/ui/GenericTable';
import { MenuItem, Button, Box, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExamForm from './ExamForm'; // Giả định rằng các component này tồn tại
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { Exam } from '@/interfaces/exam.interfaces';
import { useRefresh } from '@/context/RefreshContext';

interface ExamManagementTableProps {
    exams: Exam[];
    onEdit: (exam: Exam) => void;
    onDelete: (exam: Exam) => void;
}

const ExamManagementTable: React.FC<ExamManagementTableProps> = ({ exams }) => {
    const { setRefresh } = useRefresh();
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

    const handleEdit = (exam: Exam) => {
        setSelectedExam(exam);
        setOpen(true);
    };

    const handleDelete = async (exam: Exam) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa kỳ thi ${exam.name}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`${appConfig.API_BASE_URL}/exams/${exam.id}`);
                alert(`Kỳ thi ${exam.name} đã bị xóa.`);
                setRefresh(prev => !prev);
            } catch (error) {
                console.error('Error deleting exam:', error);
            }
        }
    };

    const columns: { id: keyof Exam; label: string; sortable?: boolean; render?: (value: any) => any }[] = [
        { id: 'id', label: 'ID', sortable: true },
        { id: 'name', label: 'Tên kỳ thi', sortable: true },
        { id: 'description', label: 'Mô tả', sortable: true },
        { id: 'date', label: 'Ngày thi', sortable: true, render: (value: Exam['date']) => new Date(value).toLocaleDateString('en-GB') },
        { id: 'duration', label: 'Thời lượng (phút)', sortable: true },
        {
            id: 'status',
            label: 'Trạng thái',
            sortable: true,
            render: (value: Exam['status']) => (
                <Chip
                    label={value === 'active' ? 'Đang diễn ra' : 'Đã kết thúc'}
                    color={value === 'active' ? 'success' : 'default'}
                />
            )
        },
    ];

    const actions = (exam: Exam) => ([
        <MenuItem key="view" onClick={() => { }}>Xem</MenuItem>,
        <MenuItem key="edit" onClick={() => handleEdit(exam)}>Chỉnh sửa</MenuItem>,
        <MenuItem key="delete" onClick={() => handleDelete(exam)}>Xóa</MenuItem>,
    ]);

    return (
        <>
            {open && selectedExam && <ExamForm open={open} onClose={() => setOpen(false)} exam={selectedExam} />}

            <GenericTable
                columns={columns}
                data={exams}
                actions={actions}
                searchPlaceholder="Tìm kiếm kỳ thi"
            />
        </>
    );
};

export default ExamManagementTable;