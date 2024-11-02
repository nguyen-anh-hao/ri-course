'use client';

import { ThemeOptions } from '@mui/material/styles';
import colors from './colors';

const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: colors.light.primary,
        secondary: colors.light.secondary,
        background: colors.light.background,
        text: {
            primary: colors.light.text.primary,
            secondary: colors.light.text.secondary,
        },
        common: {
            white: colors.light.common.white,
            black: colors.light.common.black,
        },
        error: {
            main: colors.light.error.main,
        },
        success: {
            main: colors.light.success.main,
        },
        warning: {
            main: colors.light.warning.main,
        },
        info: {
            main: colors.light.info.main,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    boxShadow: 'none'
                },
                contained: {
                    backgroundColor: colors.light.secondary.main,
                    color: colors.light.common.white,
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: colors.light.background.paper,
                },
            },
        },
    },
};

const darkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: colors.dark.primary,
        secondary: colors.dark.secondary,
        background: colors.dark.background,
        text: {
            primary: colors.dark.text.primary,
            secondary: colors.dark.text.secondary,
        },
        common: {
            white: colors.dark.common.white,
            black: colors.dark.common.black,
        },
        error: {
            main: colors.dark.error.main,
        },
        success: {
            main: colors.dark.success.main,
        },
        warning: {
            main: colors.dark.warning.main,
        },
        info: {
            main: colors.dark.info.main,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    boxShadow: 'none'
                },
                contained: {
                    backgroundColor: colors.dark.secondary.main,
                    color: colors.dark.common.white,
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: colors.dark.background.paper,
                },
            },
        },
    },
};

export { lightTheme, darkTheme };
