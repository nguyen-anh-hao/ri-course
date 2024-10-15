import { Box, Paper, Typography, Button } from '@mui/material';

const UserProfileMenu = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '254px',
                py: 2,
                gap: 2,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    px: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="medium"
                >
                    Thông tin tài khoản
                </Typography>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        bgcolor: '#f57f17',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ color: 'white' }}
                    >
                        Hồ sơ cá nhân
                    </Typography>
                </Box>

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ color: 'black' }}
                    >
                        Thay đổi mật khẩu
                    </Typography>
                </Box>

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ color: '#d32f2f' }}
                    >
                        Đăng xuất
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserProfileMenu;
