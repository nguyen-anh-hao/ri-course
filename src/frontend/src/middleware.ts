import { NextResponse, NextRequest } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function middleware(req: NextRequest) {
    const token = await getToken();

    if (!token) {
        return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/my-courses', '/profile', '/profile/update-information']
}