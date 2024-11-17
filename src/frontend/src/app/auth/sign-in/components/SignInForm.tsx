'use client';

// React and Next.js
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

// Material-UI components
import { Container, Box, Paper, Typography, TextField, Button, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Axios
import axios from 'axios';

// Config
import config from '@/config/config';
import { errorMessages } from '@/config/errorMessages';

// Context
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const SignInForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const signin = useAuth().signin;
    const theme = useTheme().theme;

    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.API_BASE_URL}/auth/signin`, { username, password });
            setMessage('Đăng nhập thành công!');
            signin(username, response.data.access_token);
            router.push('/');

        } catch (error: any) {
            const errorMessage = error.response?.data.message ?
                errorMessages[error.status] || 'Đăng nhập không thành công!'
                : 'Đã xảy ra lỗi!';
            setMessage(errorMessage);
            console.log(errorMessage);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', padding: 3, borderRadius: 2 }}>
                <Typography component='h1' variant='h5'>Đăng nhập</Typography>

                {message && (
                    <Alert severity={message === 'Đăng nhập thành công!' ? 'success' : 'error'} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}

                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='Tên đăng nhập'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='Mật khẩu'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleTogglePasswordVisibility}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <Button variant='text' sx={{ padding: 0, borderRadius: 1 }}>Quên mật khẩu?</Button>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                        <Button
                            onClick={() => router.push('/auth/sign-up')}
                            variant='contained'
                            sx={{
                                color: theme.palette.text.primary,
                                backgroundColor: 'transparent',
                            }}
                        >
                            Tạo tài khoản
                        </Button>
                        <Button type='submit' variant='contained'>Đăng nhập</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignInForm;