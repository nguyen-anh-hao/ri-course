import React from 'react';
import Button from '@mui/material/Button';
// import theme from '@/styles/theme';
import { useTheme } from '@/context/ThemeContext';

interface NavItemProps {
    text: string;
    isActive?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const NavItem: React.FC<NavItemProps> = ({ text, isActive, onClick, style }) => {
    const theme = useTheme().theme;

    return (
        <div style={{ position: 'relative', display: 'inline-block', ...style }}>
            <Button
                sx={{
                    borderRadius: '4px',
                    padding: '6px 12px',
                    color: theme.palette.text.secondary,
                    ...style
                }}
                onClick={onClick}
            >
                {text}
            </Button>
            {isActive && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: '10px',
                        right: '10px',
                        height: '3px',
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px'
                    }}
                />
            )}
        </div>
    );
};

export default NavItem;