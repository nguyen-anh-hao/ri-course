import React, { useState } from 'react';
import {
    Box, Button, Container, Grid, TextField, Typography,
    Dialog, DialogActions, DialogContent, DialogTitle, 
    IconButton, List, ListItem, ListItemText, ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const EditCourseForm: React.FC = () => {
    const [courseName, setCourseName] = useState('');
    const [mentors, setMentors] = useState<string[]>([]);
    const [newMentor, setNewMentor] = useState('');
    const [isMentorDialogOpen, setIsMentorDialogOpen] = useState(false);

    const handleAddMentor = () => {
        if (newMentor.trim() !== '') {
            setMentors((prev) => [...prev, newMentor.trim()]);
            setNewMentor('');
            setIsMentorDialogOpen(false);
        }
    };

    const handleRemoveMentor = (index: number) => {
        setMentors((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSaveCourse = () => {
        console.log('Tên khóa học:', courseName);
        console.log('Danh sách mentors:', mentors);
        // Gửi thông tin khóa học lên server
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                {courseName ? `Chỉnh sửa: ${courseName}` : 'Tạo khóa học'}
            </Typography>
            <Box mb={4}>
                <TextField
                    fullWidth
                    label="Tên khóa học"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                    Danh sách mentor
                </Typography>
                <Box
                    border="1px solid #ccc"
                    borderRadius="8px"
                    p={2}
                    sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    {mentors.length > 0 ? (
                        <List>
                            {mentors.map((mentor, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={mentor} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => handleRemoveMentor(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography color="textSecondary">Chưa có mentor nào.</Typography>
                    )}
                </Box>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => setIsMentorDialogOpen(true)}
                    sx={{ mt: 2 }}
                >
                    Thêm mentor
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => console.log('Thoát')}
                    >
                        Thoát
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSaveCourse}>
                        Lưu
                    </Button>
                </Grid>
            </Grid>

            {/* Dialog thêm mentor */}
            <Dialog
                open={isMentorDialogOpen}
                onClose={() => setIsMentorDialogOpen(false)}
                aria-labelledby="add-mentor-dialog-title"
            >
                <DialogTitle id="add-mentor-dialog-title">Thêm mentor</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Tên mentor"
                        value={newMentor}
                        onChange={(e) => setNewMentor(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsMentorDialogOpen(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddMentor} color="primary" variant="contained">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EditCourseForm;
