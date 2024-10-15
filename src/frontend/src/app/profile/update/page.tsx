import { Avatar, Button, Grid, TextField, Box } from '@mui/material';

const UpdateProfile = () => {
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
                <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#9c27b0', width: 56, height: 56 }}>AH</Avatar>
                </Box>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Họ và tên"
                        name="name"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Ngày" name="day" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Tháng" name="month" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Năm" name="year" />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Cập nhật hồ sơ
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default UpdateProfile;