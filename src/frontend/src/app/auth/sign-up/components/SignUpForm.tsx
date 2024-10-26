'use client';

// React and Next.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Material-UI components
import { Alert, Box, Button, Container, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Config
import config from "@/config/config";

// CryptoJS
import CryptoJS from 'crypto-js';

// Axios
import axios from 'axios';
import { errorMessages } from '@/config/errorMessages';

const SignUpForm: React.FC<{ userAgent: string }> = ({ userAgent }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const token = (expirationTime: number, userAgent: string, secret: string) => {
        const hashedUserAgent = CryptoJS.MD5(userAgent).toString();
        const hashCombo = `${new Date().getTime() + expirationTime}-${hashedUserAgent}_${secret}`;
        const hashedHashCombo = CryptoJS.MD5(hashCombo).toString();
        return `${new Date().getTime() + expirationTime}-${hashedUserAgent}-${hashedHashCombo}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            setMessage('Mật khẩu và xác nhận mật khẩu không trùng khớp!');
            return;
        }
        setPasswordMismatch(false);
        const signupToken = token(5000, userAgent, config.SIGN_UP_SECRET);
        try {
            const response = await axios.post(`${config.API_BASE_URL}/auth/signup`, { username, password }, {
                headers: { "Sign-Up-Token": signupToken },
            });
            setMessage('Đăng ký thành công!');
            router.push('/auth/sign-in');
        } catch (error: any) {
            console.log(error.status);
            const errorMessage = error.response?.data.message ?
                errorMessages[error.status] || 'Đăng ký không thành công!'
                : 'Đã xảy ra lỗi!';
            setMessage(errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', padding: 3, borderRadius: 2 }}>
                <Typography component="h1" variant="h5">Đăng ký</Typography>

                {message && (
                    <Alert severity={message === 'Đăng ký thành công!' ? 'success' : 'error'} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}

                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Xác nhận mật khẩu"
                        type={showConfirmPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                        <Button type="submit" color="inherit" sx={{ color: 'white', backgroundColor: 'black' }}>Đăng ký tài khoản</Button>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="caption">hoặc</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body2">
                            Đã có tài khoản? <Button onClick={() => router.push('/auth/sign-in')} color="primary" sx={{ padding: 0, borderRadius: 1 }}>Đăng nhập</Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUpForm;
