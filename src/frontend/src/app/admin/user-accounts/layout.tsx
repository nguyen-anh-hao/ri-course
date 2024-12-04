import React from 'react';
import { RefreshProvider } from '@/context/RefreshContext';

const UserAccountsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RefreshProvider>
            {children}
        </RefreshProvider>
    );
};

export default UserAccountsLayout;