import React from 'react';
import Button from '@mui/material/Button';

interface NavItemProps {
    text: string;
    isActive?: boolean;
    style?: React.CSSProperties;
}

const NavItem: React.FC<NavItemProps> = ({ text, isActive, style }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block', ...style }}>
            <Button
                style={{
                    borderRadius: '4px',
                    padding: '6px 12px',
                    color: 'black',
                    ...style
                }}
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
                        backgroundColor: '#ff9800',
                        borderRadius: '4px'
                    }}
                />
            )}
        </div>
    );
};

export default NavItem;