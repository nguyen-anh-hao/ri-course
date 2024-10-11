export default () => ({
    security: {
        jwt_secret: process.env.JWT_SECRET,
    },
});
