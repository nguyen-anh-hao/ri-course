import React from 'react';
import { headers } from 'next/headers';

import SignUpForm from './components/SignUpForm';
import appConfig from '@/config/appConfig';

const SignUpPage = async () => {
    const userAgent = (await headers()).get('user-agent') || 'unknown';
    const secret = appConfig.SIGN_UP_SECRET;

    return <SignUpForm userAgent={userAgent} secret={secret} />;
};

export default SignUpPage;