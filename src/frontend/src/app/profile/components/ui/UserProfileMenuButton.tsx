import { Button, Typography } from '@mui/material';

interface UserProfileMenuButtonProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
    activeColor?: string;
    inactiveColor?: string;
}

const UserProfileMenuButton: React.FC<UserProfileMenuButtonProps> = ({
    text,
    isActive,
    onClick,
    activeColor = '#f57f17', // Màu active mặc định
    inactiveColor = 'black', // Màu inactive mặc định
}) => {
    return (
        <Button
            sx={{
                px: 2,
                py: 1,
                bgcolor: isActive ? activeColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textTransform: 'none',
                borderRadius: 0,
            }}
            onClick={onClick}
        >
            <Typography variant="body1" sx={{ color: isActive ? 'white' : inactiveColor }}>
                {text}
            </Typography>
        </Button>
    );
};

export default UserProfileMenuButton;
