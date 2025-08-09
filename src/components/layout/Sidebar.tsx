import React, { useState, useEffect } from 'react';
import { Cuboid, ChevronRight, type LucideIcon } from 'lucide-react';
import { NavItem } from '../../lib/navData.ts';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  navItems: NavItem[];
}

const SidebarMenu = ({ items, isCollapsed }: { items: NavItem[], isCollapsed: boolean }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    const openParentMenus = (items: NavItem[], parentPath: string) => {
      items.forEach(item => {
        const currentPath = `${parentPath}/${item.name}`;
        if (item.href === location.pathname || (item.active)) {
          setOpenMenus(prev => [...new Set([...prev, parentPath])]);
        }
        if (item.children) {
          if (item.children.some(child => child.href === location.pathname || child.active)) {
             setOpenMenus(prev => [...new Set([...prev, currentPath, parentPath])]);
          }
          openParentMenus(item.children, currentPath);
        }
      });
    };
    openParentMenus(items, 'root');
  }, [items, location.pathname]);

  const toggleMenu = (path: string) => {
    setOpenMenus(prev =>
      prev.includes(path) ? prev.filter(p => !p.startsWith(path)) : [...prev, path]
    );
  };

  const renderItems = (items: NavItem[], parentPath: string) => {
    return items.map((item, index) => {
      const currentPath = `${parentPath}/${item.name}`;
      const isOpen = openMenus.includes(currentPath);
      const hasChildren = item.children && item.children.length > 0;
      const Icon = item.icon;
      const isActive = item.href === location.pathname || item.active;

      return (
        <li key={index} className={`${hasChildren ? 'has-submenu' : ''} ${isOpen ? 'open' : ''}`}>
          <Link to={item.href || '#'} onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleMenu(currentPath);
            }
          }} className={isActive ? 'active' : ''}>
            {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
            <span>{item.name}</span>
            {hasChildren && <ChevronRight className="arrow h-5 w-5" />}
          </Link>
          {hasChildren && (
            <ul className="sub-menu">
              {renderItems(item.children!, currentPath)}
            </ul>
          )}
        </li>
      );
    });
  };

  return <>{renderItems(items, 'root')}</>;
};


const Sidebar = ({ isCollapsed, navItems }: SidebarProps) => {
  return (
    <aside className="app-sidebar" id="app-sidebar">
      <div className="sidebar-header">
        <Cuboid className="h-8 w-8" />
        <span>Elixir ERP</span>
      </div>
      <ul className="sidebar-nav" id="sidebar-nav">
        <SidebarMenu items={navItems} isCollapsed={isCollapsed} />
      </ul>
    </aside>
  );
};

export default Sidebar;