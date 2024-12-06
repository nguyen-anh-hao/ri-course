import React from 'react';
import { queryAllByText, render, screen } from '@testing-library/react';
import { expect } from '@storybook/test';
import { describe, it } from 'node:test';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Button } from '@mui/material';
import { lightTheme } from '@/styles/theme';

const hexToRgb = (hex: string) => {
    if (hex.length === 4) {
        const r = parseInt(hex.slice(1, 2), 16);
        const g = parseInt(hex.slice(2, 3), 16);
        const b = parseInt(hex.slice(3, 4), 16);
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }
};

describe('Button component', () => {
    test("renders MUI button", () => {
        render(
            <ThemeProvider>
                <Button>Click me</Button>
            </ThemeProvider>
        );

        const button = screen.getByText(/Click me/i);
        expect(button).toBeInTheDocument();
    });

    test("MUI button uses correct color with contained variant", () => {
        render(
            <ThemeProvider>
                <Button color="primary" variant="contained">Button</Button>
            </ThemeProvider>
        );

        // Check class
        const button = screen.getByRole("button", { name: /button/i });
        expect(button).toHaveClass("MuiButton-containedPrimary");

        // Check color
        const style = window.getComputedStyle(button);
        const expectedColor = lightTheme.palette?.common?.black as string;
        expect(style.backgroundColor).toBe(hexToRgb(expectedColor));
    });
});