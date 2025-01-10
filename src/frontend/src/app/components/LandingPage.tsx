'use client'

import { Typography, Container, Box, Button, Card, CardContent } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const LandingPage = () => {
    const theme = useTheme().theme;
    const { user } = useAuth();

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Welcome Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    p: 4,
                    borderRadius: 2,
                    mb: 4,
                }}
            >
                <Typography component="h1" variant="h3" gutterBottom>
                    {user ? `Xin chào, ${user}` : 'Chào mừng đến với Hệ thống Quản lý Học tập!'}
                </Typography>
                <Typography variant="h6">
                    {user
                        ? 'Khám phá các khóa học và hoạt động học tập của bạn ngay bây giờ.'
                        : 'Đăng nhập để trải nghiệm tất cả các tính năng tuyệt vời.'}
                </Typography>
            </Box>

            {/* User-Specific Content */}
            {user ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Personalized Card */}
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Hành trình học tập của bạn
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Xem danh sách khóa học của bạn và tiếp tục học tập!
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => window.location.href = '/learner/my-courses'}
                            >
                                Khóa học của tôi
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Liên kết nhanh
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                                <Button variant="outlined" href="/learner/all-courses">Tìm kiếm khóa học</Button>
                                <Button variant="outlined" href="/learner/exams">Đăng ký thi</Button>
                                <Button variant="outlined" href="/profile">Hồ sơ cá nhân</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                // Call to Action for Guests
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Bạn chưa có tài khoản? Hãy tham gia ngay hôm nay!
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ mr: 2 }}
                            href="/auth/sign-in"
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="outlined"
                            href="/auth/sign-up"
                        >
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default LandingPage;
