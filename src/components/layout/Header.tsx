import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Module } from '../../lib/navData.ts';

interface HeaderProps {
  onToggleSidebar: () => void;
  mainModules: Module[];
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Header = ({ onToggleSidebar, mainModules, activeModule, onModuleChange }: HeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="main-modules-bar">
        <ul className="main-modules-nav" id="main-modules-nav">
          {mainModules.map(module => {
            const Icon = module.icon;
            return (
              <li key={module.module}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onModuleChange(module.module);
                  }}
                  className={activeModule === module.module ? 'active' : ''}
                >
                  <Icon className="h-5 w-5" />
                  <span>{module.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div ref={userMenuRef} className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
        <button className="user-menu-trigger" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <span>Welcome, User!</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="user-dropdown">
          <a href="#" className="logout-link">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;