import React from 'react';
import { RefreshProvider } from '@/context/RefreshContext';

const ExamsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RefreshProvider>
            {children}
        </RefreshProvider>
    );
};

export default ExamsLayout;