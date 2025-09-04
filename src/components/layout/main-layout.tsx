import React from "react";
import Header from "./header";
import Footer from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
  headerClassName = "",
  footerClassName = "",
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-white ${className}`}>
      {/* Header */}
      {showHeader && <Header className={headerClassName} />}
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer className={footerClassName} />}
    </div>
  );
};

MainLayout.displayName = "MainLayout";

export default MainLayout;