// import { Avatar, Button, Grid, Typography, TextField, Box } from '@mui/material';

import UserProfileMenu from "./_components/UserProfileMenu";

const ProfileInfo = () => {
    return (
        <>
            <UserProfileMenu />
        </>
        // <Grid container spacing={2}>
        //     <Grid item xs={12} md={4}>
        //         <Box>
        //             <Typography variant="h6" color="textSecondary">
        //                 Thông tin tài khoản
        //             </Typography>
        //             <Button variant="text" color="primary">Hồ sơ cá nhân</Button>
        //             <Button variant="text" color="inherit">Thay đổi mật khẩu</Button>
        //             <Button variant="text" color="error">Đăng xuất</Button>
        //         </Box>
        //     </Grid>
        //     <Grid item xs={12} md={8}>
        //         <Box display="flex" justifyContent="center" mb={2}>
        //             <Avatar sx={{ bgcolor: '#9c27b0', width: 56, height: 56 }}>AH</Avatar>
        //         </Box>
        //         <Typography variant="h6" align="center">Thông tin cá nhân</Typography>
        //         <Typography variant="body1" align="center">Họ và tên: Nguyễn Anh Hào</Typography>
        //         <Typography variant="body1" align="center">Ngày tháng năm sinh: 15/01/2004</Typography>
        //         <Typography variant="body1" align="center">Email: anhhao012004@gmail.com</Typography>
        //         <Typography variant="body1" align="center">Vai trò: Người học</Typography>
        //         <Typography variant="body1" align="center">Ngày tạo tài khoản: 13/10/2024</Typography>
        //         <Box textAlign="center" mt={2}>
        //             <Button variant="outlined">Cập nhật</Button>
        //         </Box>
        //     </Grid>
        // </Grid>
    );
};

export default ProfileInfo;
