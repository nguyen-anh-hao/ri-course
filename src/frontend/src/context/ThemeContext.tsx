'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/styles/theme';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    theme: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const storedThemePreference = sessionStorage.getItem('isDarkMode');
        return storedThemePreference ? storedThemePreference === 'true' : false;
    });

    useEffect(() => {
        const storedThemePreference = sessionStorage.getItem('isDarkMode');
        if (storedThemePreference) {
            setIsDarkMode(storedThemePreference === 'true');
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('isDarkMode', isDarkMode.toString());
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = createTheme(isDarkMode ? darkTheme : lightTheme);

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ toggleDarkMode, isDarkMode, theme }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
