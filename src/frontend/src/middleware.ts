import { NextResponse, NextRequest } from 'next/server';
import { getToken } from '@/utils/getToken';
import { User } from './interfaces/user.interfaces';
import axios from 'axios';
import appConfig from '@/config/appConfig';
import { cookies } from 'next/headers';

const getRole = async (token: string | null): Promise<string[] | null> => {
    if (!token) return null;

    try {
        const response = await axios.get<User>(`${appConfig.API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('response: ', response.data);
        return response.data.roles;
    } catch (error) {
        return null;
    }
};

const routePermissions = [
    { url: '/admin', roles: ['Admin'], redirect: '/404' },
    { url: '/mentor', roles: ['Mentor'], redirect: '/404' },
    { url: '/profile', roles: ['Admin', 'Mentor', 'Learner'], redirect: '/auth/sign-in?loginRequired=true' },
    { url: '/my-courses', roles: ['Learner'], redirect: '/auth/sign-in?loginRequired=true' },
    { url: '/lectures', roles: ['Learner'], redirect: '/auth/sign-in?loginRequired=true' },
    { url: '/assignments', roles: ['Learner'], redirect: '/auth/sign-in?loginRequired=true' },
    { url: '/exams', roles: ['Learner'], redirect: '/auth/sign-in?loginRequired=true' },
];

export async function middleware(req: NextRequest) {
    const token = await getToken() ?? null;

    if (token && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const permission = routePermissions.find(route => req.nextUrl.pathname.startsWith(route.url));
    const userRoles = await getRole(token);

    if (permission) {
        if (permission.roles && !permission.roles.some(role => userRoles?.includes(role))) {
            if (typeof permission.redirect === 'string') {
                if (permission.redirect === '/404') {
                    return NextResponse.rewrite(new URL('/404', req.url), { status: 404 });
                } else {
                    return NextResponse.redirect(new URL(permission.redirect, req.url));
                }
            }
        }
    }

    if (req.nextUrl.pathname === '/' && userRoles && userRoles[0] === 'Learner') {
        return NextResponse.redirect(new URL('/my-courses', req.url));
    }

    if (req.nextUrl.pathname === '/' && userRoles && userRoles[0] === 'Mentor') {
        return NextResponse.redirect(new URL('/mentor/courses', req.url));
    }

    if (req.nextUrl.pathname === '/' && userRoles && userRoles[0] === 'Admin') {
        return NextResponse.redirect(new URL('/admin/user-accounts', req.url));
    }

    if (req.nextUrl.pathname === '/' && !userRoles) {
        return NextResponse.redirect(new URL('/all-courses', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: routePermissions
        .filter(route => !route.url.startsWith('/auth'))
        .map(route => route.url),
};

/* 
Lỗi khi gọi API từ phía server
- Nếu gọi từ client: localhost:3123
- Nếu gọi từ server: backend:3123

Giải pháp:
Proxy Server
*/