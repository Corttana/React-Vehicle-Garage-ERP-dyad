import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import { useIsMobile } from '../../hooks/use-mobile.tsx';
import { mainModules, subMenus, NavItem } from '../../lib/navData.ts';

interface ErpLayoutProps {
  children: React.ReactNode;
}

const ErpLayout = ({ children }: ErpLayoutProps) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(() => {
    return mainModules.find(m => m.active)?.module || 'service';
  });
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    setNavItems(subMenus[activeModule] || []);
  }, [activeModule]);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const wrapperClasses = `app-wrapper ${isCollapsed ? 'sidebar-collapsed' : ''} ${isMobileOpen ? 'sidebar-mobile-open' : ''}`;

  return (
    <div className={wrapperClasses} id="app-wrapper">
      <Sidebar isCollapsed={isCollapsed} navItems={navItems} />
      <div className="main-container">
        <Header
          onToggleSidebar={handleToggleSidebar}
          mainModules={mainModules}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        <main className="app-content">
          {children}
        </main>
      </div>
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </div>
  );
};

export default ErpLayout;