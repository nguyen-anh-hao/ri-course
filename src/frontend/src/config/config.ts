const config = {
    JWT_SECRET: process.env.JWT_SECRET || '',
    SIGN_UP_SECRET: process.env.SIGN_UP_SECRET || '',
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
};

export default config;