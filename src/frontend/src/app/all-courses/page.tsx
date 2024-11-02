import CourseCard from '@/components/ui/CourseCard';
import { Box, Container, Grid } from '@mui/material';

export default function AllCourses() {
    return (
        <Container component='main' maxWidth='lg'>
            <Grid container spacing={2} justifyContent='left'>
                {Array.from({ length: 14 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ minWidth: 260 }} key={index}>
                        <CourseCard
                            name={`Lập trình React ${index + 1}`}
                            mentor='Nguyễn Văn A'
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}