const config = {
    JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET || '',
    SIGN_UP_SECRET: process.env.NEXT_PUBLIC_SIGN_UP_SECRET || '',
    API_BASE_URL: 'http://localhost:3123',
};

export default config;