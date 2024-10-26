import React from 'react';
import { Paper, Box, TextField, Button, Typography } from '@mui/material';

const ChangePasswordForm: React.FC = () => {
    return (
        <Paper elevation={3} sx={{ px: 4, py: 3, gap: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="medium">Thay đổi mật khẩu</Typography>
            <Box component="form" sx={{ gap: 2 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    name="oldPassword"
                    label="Mật khẩu cũ"
                    type="password"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="newPassword"
                    label="Mật khẩu"
                    type="password"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    type="password"
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button color="inherit" sx={{ color: 'white', backgroundColor: 'black', mt: 2 }}>
                        Cập nhật mật khẩu
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ChangePasswordForm;