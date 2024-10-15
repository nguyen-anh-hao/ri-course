export default () => ({
    security: {
        jwtSecret: process.env.JWT_SECRET,
        signUpSecret: process.env.SIGN_UP_SECRET,
    },
});
