import React from 'react';
import { queryAllByText, render, screen } from '@testing-library/react';
import { expect } from '@storybook/test';
import { describe, it } from 'node:test';
import Footer from './Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Button } from '@mui/material';
import { lightTheme } from '@/styles/theme';

describe('Footer component', () => {
    // test("renders MUI button", () => {
    //     render(
    //         <ThemeProvider>
    //             <Button>Click me</Button>
    //         </ThemeProvider>
    //     );

    //     const button = screen.getByText(/Click me/i);
    //     expect(button).toBeInTheDocument();
    // });

    test("render footer", () => {
        render(
            <ThemeProvider>
                <AuthProvider>
                    <Footer />
                </AuthProvider>
            </ThemeProvider>
        );
        const footer = screen.getByText(/RiCourse/i, { selector: 'h6.MuiTypography-h6' });
        expect(footer).toBeInTheDocument();
    });

    test("render footer links", () => {
        render(
            <ThemeProvider>
                <AuthProvider>
                    <Footer />
                </AuthProvider>
            </ThemeProvider>
        );
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4);
    });



    // test("MUI button uses correct class for primary color", () => {
    //     render(
    //         <ThemeProvider>
    //             <Button color="primary" variant="contained">Primary Button</Button>
    //         </ThemeProvider>
    //     );

    //     const button = screen.getByRole("button", { name: /primary button/i });

    //     // Kiểm tra class
    //     expect(button).toHaveClass("MuiButton-containedPrimary");

    //     // Kiểm tra màu sắc thông qua computed styles
    //     const style = window.getComputedStyle(button);
    //     const expectedColor = lightTheme.palette?.common?.black as string;

    //     const hexToRgb = (hex: string) => {
    //         if (hex.length === 4) {
    //             const r = parseInt(hex.slice(1, 2), 16);
    //             const g = parseInt(hex.slice(2, 3), 16);
    //             const b = parseInt(hex.slice(3, 4), 16);
    //             return `rgb(${r}, ${g}, ${b})`;
    //         } else {
    //             const r = parseInt(hex.slice(1, 3), 16);
    //             const g = parseInt(hex.slice(3, 5), 16);
    //             const b = parseInt(hex.slice(5, 7), 16);
    //             return `rgb(${r}, ${g}, ${b})`;
    //         }
    //     };

    //     expect(style.backgroundColor).toBe(hexToRgb(expectedColor));
    // });

});