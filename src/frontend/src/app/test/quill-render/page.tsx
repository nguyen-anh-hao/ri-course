'use client'

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const MyComponent = () => {
    // Đây là đầu vào Delta JSON của Quill
    const deltaJson = {
        "ops": [
            { "insert": "bèo " },
            { "attributes": { "italic": true }, "insert": "dạt" },
            { "insert": " " },
            { "attributes": { "italic": true, "bold": true }, "insert": "mây " },
            { "attributes": { "bold": true }, "insert": "trôi" },
            { "insert": "\n\n chốn xa xôi" },
            { "attributes": { "code-block": true }, "insert": "\n" }
        ]
    };

    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        // Chuyển đổi Delta JSON thành HTML
        const converter = new QuillDeltaToHtmlConverter(deltaJson.ops, {});
        const html = converter.convert();
        setHtmlContent(html); // Lưu HTML vào state
    }, []);

    useEffect(() => {
        // Áp dụng font Roboto cho phần tử chứa HTML (ql-editor)
        const quillEditor = document.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            quillEditor.style.fontFamily = 'Roboto, sans-serif';
        }
    }, []);

    return (
        <Container maxWidth="md" sx={{ padding: '20px' }}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Nội dung HTML từ Delta JSON:
                </Typography>

                {/* Render nội dung HTML */}
                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </Box>
        </Container>
    );
};

export default MyComponent;
