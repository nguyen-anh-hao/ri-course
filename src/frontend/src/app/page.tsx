'use client';

import { Container, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user, logout } = useAuth();
    console.log(user);

    return (
        <Container maxWidth="lg">
            <Typography variant="h5">{user ? `Hello, ${user}` : "Guest"}</Typography>
        </Container>
    );
}
