'use client'
import { Container, Box, Paper, Typography, TextField, Button, IconButton, InputAdornment, Divider } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                    Đăng ký
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        InputLabelProps={{ required: false }}
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
                        InputLabelProps={{ required: false }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Xác nhận mật khẩu"
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
                        InputLabelProps={{ required: false }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                        <Button
                            type="submit"
                            color="inherit"
                            sx={{
                                color: 'white',
                                backgroundColor: 'black'
                            }}
                        >
                            Đăng ký tài khoản
                        </Button>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="caption">hoặc</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body2">
                            Đã có tài khoản? <Button href="/auth/sign-in" color="primary" sx={{ padding: 0, borderRadius: 1 }}>Đăng nhập</Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}