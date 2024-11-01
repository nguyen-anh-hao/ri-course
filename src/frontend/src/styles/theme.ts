'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import * as Colors from '@mui/material/colors';

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: Colors.yellow[900],
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: Colors.grey[100],
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
