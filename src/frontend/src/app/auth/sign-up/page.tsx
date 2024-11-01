import React from 'react';
import { headers } from 'next/headers';
import SignUpForm from './components/SignUpForm';

const SignUpPage = () => {
    const userAgent = headers().get('user-agent') || 'unknown';

    return <SignUpForm userAgent={userAgent} />;
};

export default SignUpPage;