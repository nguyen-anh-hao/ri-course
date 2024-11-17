import React from 'react';
import { headers } from 'next/headers';

import SignUpForm from './components/SignUpForm';
import config from '@/config/config';

const SignUpPage = async () => {
    const userAgent = (await headers()).get('user-agent') || 'unknown';
    const secret = config.SIGN_UP_SECRET;

    return <SignUpForm userAgent={userAgent} secret={secret} />;
};

export default SignUpPage;