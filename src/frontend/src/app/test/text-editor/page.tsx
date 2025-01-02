'use client'

import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useTheme } from '@mui/material/styles';
import 'react-quill/dist/quill.bubble.css';
import { Container, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function MyComponent() {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const quillRef = useRef<ReactQuill>(null);

    // Mở/đóng Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Kiểm tra chỉ khi Dialog mở
        if (open) {
            const quillEditor = document.querySelector('.ql-editor') as HTMLElement;
            if (quillEditor) {
                quillEditor.style.color = isDarkMode ? '#fff' : '#000';
                quillEditor.style.fontSize = '16px';
                quillEditor.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
            }
        }
    }, [isDarkMode, open]); // Chạy lại khi chế độ Dark/Light thay đổi hoặc Dialog mở/đóng

    const handleGetDelta = () => {
        if (!quillRef.current) return;
        const delta = quillRef.current.getEditor().getContents();
        console.log(delta);
        console.log("===========");
        console.log(JSON.stringify(delta));
        console.log("===========");
        console.log(value);
    };

    return (
        <Container maxWidth='lg'>
            <Box mt={4}>
                <Button variant="contained" onClick={handleClickOpen}>
                    Open Dialog with Quill
                </Button>
            </Box>

            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editor</DialogTitle>
                <DialogContent>
                    <ReactQuill
                        theme="bubble"
                        value={value}
                        onChange={setValue}
                        ref={quillRef}
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
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                    <Button onClick={handleGetDelta} color="primary">Get Delta</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default MyComponent;
