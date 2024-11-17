import React, { use } from 'react';
import { Card, Paper, Typography, LinearProgress, Skeleton, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import generateSlug from '@/utils/generateSlug';


interface CourseCardProps {
    name: string;
    mentor?: string;
    progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, mentor, progress }) => {
    const router = useRouter();
    const pathname = usePathname();
    const slug = generateSlug(name);

    const handleClick = () => {
        router.push(`${pathname}/${slug}`);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
                cursor: 'pointer'
            }}
            onClick={() => handleClick()}
        >
            <Box
                sx={{
                    width: '100%',
                    paddingTop: '54%',
                    position: 'relative',
                    backgroundColor: 'transparent',
                }}
            >
                <Skeleton
                    variant='rectangular'
                    width='100%'
                    height='100%'
                    sx={{ position: 'absolute', top: 0, left: 0 }}
                />
            </Box>
            <Box sx={{ px: 2, py: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Typography variant='h6' component='h2'>
                    {name}
                </Typography>
                {mentor !== undefined ? (
                    <Typography variant='body2' component='p'>
                        Giáo viên: {mentor}
                    </Typography>
                ) : (
                    <Skeleton>
                        <Typography variant='body2' component='p'>
                            Giáo viên: Nguyễn Văn An
                        </Typography>
                    </Skeleton>
                )}
            </Box>
            {progress !== undefined && (
                <LinearProgress variant='determinate' value={progress} sx={{ height: 12 }} />
            )}
        </Paper>
    );
}

export default CourseCard;