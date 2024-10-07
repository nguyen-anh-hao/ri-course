'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#ff9800',
        },
        secondary: {
            main: '#f50057',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                },
            },
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;
