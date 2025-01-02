'use client'

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Button, Box } from '@mui/material';
import ExamManagementTable from './components/ExamManagementTable';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { getToken } from '@/utils/getToken';
import ExamForm from './components/ExamForm';
import { useRefresh } from '@/context/RefreshContext';
import NewExamForm from './components/NewExamForm';
import { Exam } from '@/interfaces/exam.interfaces';

const ExamPage: React.FC = () => {
    const { refresh } = useRefresh();
    const [openExamForm, setOpenExamForm] = useState(false);
    const [openNewExamForm, setOpenNewExamForm] = useState(false);
    const [exams, setExams] = useState<Exam[]>([]);
    const [selectedExam, setSelectedExam] = useState<Exam>(exams[0]);

    useEffect(() => {
        const fetchExams = async () => {
            // try {
            //     const token = await getToken();
            //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //     const response = await axios.get(`${appConfig.API_BASE_URL}/exams`);
            //     setExams(response.data);
            // } catch (error) {
            //     console.error('Error fetching exams:', error);
            // }

            // Mockup
            setExams([
                {
                    id: 1,
                    name: 'Kỳ thi 1',
                    description: 'Mô tả kỳ thi 1',
                    date: new Date().toISOString(),
                    duration: 60,
                    status: 'active',
                    totalMarks: 100,
                    passingMarks: 50,
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    name: 'Kỳ thi 2',
                    description: 'Mô tả kỳ thi 2',
                    date: new Date().toISOString(),
                    duration: 90,
                    status: 'finished',
                    totalMarks: 100,
                    passingMarks: 50,
                    createdAt: new Date().toISOString(),
                },
            ]);
        }

        fetchExams();
    }, [refresh]);

    const deleteExam = async (examId: number) => {
        try {
            await axios.delete(`${appConfig.API_BASE_URL}/exams/${examId}`);
            setExams(exams.filter(e => e.id !== examId));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    }

    const handleEdit = (exam: Exam) => {
        setOpenExamForm(true);
        setSelectedExam(exam);
    };

    const handleDelete = (exam: Exam) => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa kỳ thi ${exam.name}?`);
        if (!confirm) return;
        deleteExam(exam.id);
        setExams(exams.filter(e => e.id !== exam.id));
    };

    const handleCreate = () => {
        setOpenNewExamForm(true);
    }

    return (
        <>
            {openExamForm && <ExamForm open={openExamForm} onClose={() => setOpenExamForm(false)} exam={selectedExam} />}
            {openNewExamForm && <NewExamForm open={openNewExamForm} onClose={() => setOpenNewExamForm(false)} />}
            <Container component='main' maxWidth='xl'>
                <Typography variant='h4' mb={4}>Quản lý kỳ thi</Typography>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Thêm kỳ thi
                    </Button>
                </Box>
                <ExamManagementTable exams={exams} onEdit={handleEdit} onDelete={handleDelete} />
            </Container>
        </>
    );
};

export default ExamPage;