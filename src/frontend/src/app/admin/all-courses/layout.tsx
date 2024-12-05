import React from 'react';
import { RefreshProvider } from '@/context/RefreshContext';

const CoursesManagementLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RefreshProvider>
            {children}
        </RefreshProvider>
    );
};

export default CoursesManagementLayout;