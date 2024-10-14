'use client';

// React and Next.js
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";

// Material-UI components
import { Container, Box, Paper, Typography, TextField, Button, IconButton, InputAdornment, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Axios
import axios from 'axios';

// Config
import { API_BASE_URL } from "@/config/apiConfig";
import { errorMessages } from "@/config/errorMessages";

// Context
import { useAuth } from '@/context/AuthContext';

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    const { login } = useAuth();
    const router = useRouter();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            setMessage('Đăng nhập thành công!');
            setToken(response.data.access_token);

            login(username); // Save user information to context
            localStorage.setItem('token', response.data.access_token); // Save token to local storage
            router.push('/'); // Redirect to home page

        } catch (error: any) {
            const errorMessage = error.response?.data.message ?
                errorMessages[error.response.data.message] || 'Đăng nhập không thành công!'
                : 'Đã xảy ra lỗi!';
            setMessage(errorMessage);
            console.log(errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 3,
                    borderRadius: 2,
                }}
            >
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                {message && (
                    <Alert severity={message === 'Đăng nhập thành công!' ? 'success' : 'error'} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate method="POST" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        InputLabelProps={{ required: false }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
                                        onClick={handleTogglePasswordVisibility}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{ required: false }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="text"
                        sx={{ padding: 0, borderRadius: 1 }}
                    >
                        Quên mật khẩu?
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                        <Button
                            onClick={() => router.push('/auth/sign-up')}
                            color="inherit"
                            sx={{ color: 'black' }}
                        >
                            Tạo tài khoản
                        </Button>
                        <Button
                            type="submit"
                            color="inherit"
                            sx={{ color: 'white', backgroundColor: 'black' }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
