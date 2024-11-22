import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      {children}
    </div>
  );
};

export default Layout;
