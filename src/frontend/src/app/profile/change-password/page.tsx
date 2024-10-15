import { Grid, Button, TextField, Box } from '@mui/material';

const ChangePassword = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Box>
                    <Button variant="text" color="primary">Hồ sơ cá nhân</Button>
                    <Button variant="text" color="inherit">Thay đổi mật khẩu</Button>
                    <Button variant="text" color="error">Đăng xuất</Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Box component="form" sx={{ mt: 1 }}>
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
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Cập nhật mật khẩu
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
