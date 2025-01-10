'use client';

import { Container, Typography, Paper } from '@mui/material';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import React, { useEffect, useState, use } from 'react';
import Comment from './components/Comments';
import FileUpload from '@/components/ui/FileUpload';
import SubmissionsTable from './components/SubmissionsTable';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import appConfig from '@/config/appConfig';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
};

export default function Page({ params }: PageProps) {
    const token = getCookie('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const { id } = use(params); // Dùng React.use() để unwrap params

    const deltaJson = {
        "ops": [
            {
                "insert": "Quy hoạch động là một kỹ thuật tối ưu hóa được sử dụng trong lập trình và toán học để giải quyết các bài toán phức tạp bằng cách chia chúng thành các bài toán con đơn giản hơn. Kỹ thuật này được sử dụng rộng rãi trong các lĩnh vực như lý thuyết đồ thị, chuỗi, và các bài toán tối ưu hóa.\n\n"
            },
            {
                "attributes": { "bold": true },
                "insert": "Lưu ý: "
            },
            {
                "insert": "Quy hoạch động chỉ áp dụng được khi bài toán có hai tính chất quan trọng: "
            },
            {
                "attributes": { "italic": true },
                "insert": "con trỏ tối ưu con "
            },
            {
                "insert": "và "
            },
            {
                "attributes": { "italic": true },
                "insert": "con trỏ con lặp lại"
            },
            {
                "insert": ".\n\n"
            },
            {
                "insert": "Ví dụ về bài toán quy hoạch động:\n\n"
            },
            {
                "attributes": { "bold": true },
                "insert": "Bài toán xếp ba lô (Knapsack Problem):\n"
            },
            {
                "insert": "Cho một ba lô có trọng lượng tối đa W và một tập hợp các vật phẩm, mỗi vật phẩm có trọng lượng và giá trị riêng. Hãy tìm cách chọn các vật phẩm để tối đa hóa tổng giá trị mà không vượt quá trọng lượng tối đa của ba lô.\n\n"
            },
            {
                "insert": "Giải pháp quy hoạch động cho bài toán này bao gồm việc xây dựng một bảng để lưu trữ giá trị tối ưu của các vật phẩm cho từng trọng lượng từ 0 đến W. Sau đó, sử dụng bảng này để tìm ra giá trị tối ưu cho trọng lượng W.\n\n"
            },
            {
                "attributes": { "bold": true },
                "insert": "Lưu ý: "
            },
            {
                "insert": "Quy hoạch động yêu cầu phải lưu trữ kết quả của các bài toán con để tránh tính toán lại, do đó cần phải sử dụng bộ nhớ hiệu quả.\n"
            }
        ]
    };

    const [htmlContent, setHtmlContent] = useState('');
    const [obj, setObj] = useState({ ops: [] });
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${appConfig.API_BASE_URL}/lessons/${id}`);
            const result = await fetch(`https://res.cloudinary.com/dv7bzo2r7/raw/upload/v1735326452/${response.data.contentUrl}`);
            setTitle(response.data.title);
            setType(response.data.type);
            // const object = await result.json();
            setObj(await result.json());
        };
        fetchData();
        // Chuyển đổi Delta JSON thành HTML
        const converter = new QuillDeltaToHtmlConverter(obj.ops, {});
        const html = converter.convert();
        setHtmlContent(html); // Lưu HTML vào state
    }, [obj]);

    useEffect(() => {
        // Áp dụng font Roboto cho phần tử chứa HTML (ql-editor)
        const quillEditor = document.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            quillEditor.style.fontFamily = 'Roboto, sans-serif';
        }
    }, []);

    const submissions = [
        {
            id: 1,
            student: 'Nguyễn Văn A',
            status: 'Đã chấm, do Nguyễn Văn B chấm',
            score: 8,
            submissionDate: '2021-10-01',
        },
        {
            id: 3,
            student: 'Phạm Văn C',
            status: 'Chưa chấm',
            score: 10,
            submissionDate: '2021-10-03',
        },
    ];

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </Paper>

            {/* File Upload */}
            {/* <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Nộp bài
                </Typography>
                <FileUpload />
            </Paper> */}

            {/* comment */}
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Nhận xét
                </Typography>
                <Comment />
            </Paper>

            {/* Submissions Table */}
            {type === 'Lecture' || type === 'lecture' ? null : (
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Bài nộp
                    </Typography>
                    <SubmissionsTable submissions={submissions} />
                </Paper>
            )}
        </Container>
    );
}
