import { Button, Typography } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';

interface UserProfileMenuButtonProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
    inactiveColor?: string;
}


const UserProfileMenuButton: React.FC<UserProfileMenuButtonProps> = ({ text, isActive, onClick, inactiveColor }) => {
    const theme = useTheme().theme;

    if (!inactiveColor) {
        inactiveColor = theme.palette.text.primary;
    }

    return (
        <Button
            sx={{
                px: 2,
                py: 1,
                bgcolor: isActive ? theme.palette.primary.main : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textTransform: 'none',
                borderRadius: 0,
            }}
            onClick={onClick}
        >
            <Typography variant='body1' sx={{ color: isActive ? theme.palette.common.black : inactiveColor }}>
                {text}
            </Typography>
        </Button>
    );
};

export default UserProfileMenuButton;
