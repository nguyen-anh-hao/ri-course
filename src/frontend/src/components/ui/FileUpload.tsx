import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography, LinearProgress, IconButton, Snackbar, Avatar, Chip } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FiFile, FiImage } from 'react-icons/fi'; // Các icon cho từng loại file
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho file
interface FileData {
    name: string;
    size: number;
    type: string;
}

const FileUpload: React.FC = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    // Xử lý khi người dùng thả file vào drop zone
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
        }));
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': ['image/jpeg', 'image/png'],
            'application/pdf': ['application/pdf'],
            'application/msword': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        }, // Các loại file hỗ trợ
    });

    // Xử lý tải lên các file
    const handleUpload = async (): Promise<void> => {
        if (files.length === 0) {
            alert('Vui lòng chọn ít nhất một tệp!');
            return;
        }

        setUploading(true);
        setProgress([]);

        // Tạo FormData để gửi lên backend
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file as any));

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                    setProgress((prevProgress) => prevProgress.map((p, index) => (index === 0 ? percent : p)));
                },
            });

            setSnackbarMessage('Tải lên thành công!');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Đã xảy ra lỗi khi tải lên!');
            setOpenSnackbar(true);
        } finally {
            setUploading(false);
        }
    };

    // Xóa một file đã chọn
    const handleDeleteFile = (fileName: string): void => {
        setFiles(files.filter((file) => file.name !== fileName));
    };

    // Xác định loại icon cho từng loại file
    const getFileIcon = (file: FileData): JSX.Element => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'png') return <FiImage />;
        if (fileExtension === 'docx' || fileExtension === 'doc') return <FiFile />;
        return <FiFile />;
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Tải lên nhiều tệp
            </Typography>

            {/* Dropzone */}
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed #3f51b5',
                    padding: 4,
                    borderRadius: 2,
                    cursor: 'pointer',
                    marginBottom: 2,
                    textAlign: 'center',
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="body1" color="textSecondary">
                    Kéo và thả các tệp vào đây hoặc nhấn để chọn
                </Typography>
                <CloudUploadIcon sx={{ fontSize: 40, marginTop: 2 }} />
            </Box>

            {/* Hiển thị các file đã chọn */}
            <Box sx={{ marginBottom: 2 }}>
                {files.length > 0 && (
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            {files.length} tệp đã chọn
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                            {files.map((file, index) => (
                                <Box key={file.name} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                    <Avatar sx={{ marginRight: 2 }}>
                                        {getFileIcon(file)}
                                    </Avatar>
                                    <Chip label={file.name} variant="outlined" sx={{ marginRight: 2 }} />
                                    {uploading ? (
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress[index] || 0}
                                            sx={{ flexGrow: 1, marginRight: 2 }}
                                        />
                                    ) : (
                                        <IconButton onClick={() => handleDeleteFile(file.name)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Nút tải lên */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
            >
                {uploading ? 'Đang tải lên...' : 'Tải lên'}
            </Button>

            {/* Snackbar thông báo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default FileUpload;
