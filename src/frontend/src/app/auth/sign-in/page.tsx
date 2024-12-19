'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SignInForm from './components/SignInForm';

function SignInPage() {
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams);

    if (query.loginRequired) {
        return <SignInForm error='Bạn cần đăng nhập để tiếp tục!' />;
    } else if (query.sessionExpired) {
        return <SignInForm error='Phiên làm việc đã hết hạn!' />;
    }

    return <SignInForm />;
}

export default SignInPage;