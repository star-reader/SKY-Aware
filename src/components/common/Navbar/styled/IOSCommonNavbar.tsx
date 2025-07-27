import React, { useState } from 'react';
import { NavbarProps } from '../../types';
import './IOSCommonNavbar.scss';

const IOSCommonNavbar: React.FC<NavbarProps & { style?: React.CSSProperties }> = ({
  items,
  position = 'bottom',
  activeItem,
  onItemClick,
  showLabels = true,
  safeArea = true,
  className = '',
  style,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleItemClick = (item: any) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const navbarClasses = [
    'ios-navbar',
    `ios-navbar--${position}`,
    safeArea && 'ios-navbar--safe-area',
    isCollapsed && 'ios-navbar--collapsed',
    className,
  ].filter(Boolean).join(' ');
  
  // 汉堡菜单图标
  const renderHamburgerIcon = () => (
    <button
      className="ios-navbar__hamburger"
      onClick={() => setIsCollapsed(!isCollapsed)}
      aria-label={isCollapsed ? "展开导航" : "收起导航"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </button>
  );

  const renderNavItem = (item: any, index: number) => {
    const isActive = activeItem === item.label || activeItem === item.route;
    const itemClasses = [
      'ios-navbar__item',
      isActive && 'ios-navbar__item--active',
    ].filter(Boolean).join(' ');

    return (
      <button
        key={item.label || index}
        className={itemClasses}
        onClick={() => handleItemClick(item)}
        aria-label={item.label}
      >
        {item.icon && (
          <span className="ios-navbar__icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        {showLabels && item.label && (
          <span className="ios-navbar__label">
            {item.label}
          </span>
        )}
        {item.badge && (
          <span className="ios-navbar__badge" aria-hidden="true">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <nav className={navbarClasses} role="navigation" style={style}>
      {position === 'sidebar' && renderHamburgerIcon()}
      <div className="ios-navbar__content">
        {items.map((item, index) => renderNavItem(item, index))}
      </div>
    </nav>
  );
};

export default IOSCommonNavbar; 