'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';

interface AuthContextType {
    user: any;
    signin: (user: any, token: any) => void;
    signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(() => {
        if (typeof window !== 'undefined') {
            const storedUser = sessionStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    const [isMounted, setIsMounted] = useState(false);

    const signin = (user: any, token: any) => {
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        setCookie('token', token, {
            maxAge: 60 * 60 * 24,
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
        });
    };

    const signout = () => {
        setUser(null);
        deleteCookie('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
