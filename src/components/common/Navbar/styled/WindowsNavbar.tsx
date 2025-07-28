import React, { useState, useEffect } from 'react';
import { Badge, Tooltip, makeStyles } from '@fluentui/react-components';
import { 
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  OnNavItemSelectData
} from '@fluentui/react-nav-preview';
import { NavbarProps } from '../../types';

const useStyles = makeStyles({
  nav: {
    width: "250px",
    transition: "width 0.2s ease-in-out",
  },
  navCollapsed: {
    width: "60px", 
    transition: "width 0.2s ease-in-out",
  },
});

const WindowsNavbar: React.FC<NavbarProps & { style?: React.CSSProperties }> = ({
  items,
  position = 'sidebar',
  activeItem,
  onItemClick,
  showLabels = true,
  className = '',
  style,
}) => {
  const styles = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isShowText, setIsShowText] = useState(true);

  useEffect(() => {
    if (isCollapsed) {
      setIsShowText(false);
    } else {
      setTimeout(() => {
        setIsShowText(!isCollapsed);
      }, 200);
    }
  }, [isCollapsed]);

  const handleNavItemSelect = (data: OnNavItemSelectData) => {
    const item = items.find(item => item.label === data.value);
    if (item && onItemClick) {
      onItemClick(item);
    }
  };

  // 根据position决定渲染方式
  if (position !== 'sidebar') {
    // 对于非sidebar位置，暂时返回一个简单的div
    // 可以在将来扩展为其他Fluent UI组件
    return (
      <div 
         className={className}
         style={{
           display: 'flex',
           padding: '8px',
           ...style
         }}
       >
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              const foundItem = items.find(i => i.label === item.label);
              if (foundItem && onItemClick) {
                onItemClick(foundItem);
              }
            }}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {item.icon}
            {showLabels && item.label}
            {item.badge && (
              <Badge 
                appearance="filled" 
                color="danger"
                size="small"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Sidebar位置使用NavDrawer
  return (
         <NavDrawer
       defaultSelectedValue={activeItem || ''}
       defaultSelectedCategoryValue=""
       open={true}
       type="inline"
       className={isCollapsed ? styles.navCollapsed : styles.nav}
       onNavItemSelect={(_, data) => handleNavItemSelect(data)}
       style={style}
     >
      <NavDrawerHeader>
        <Tooltip 
          content={isCollapsed ? "展开导航" : "收起导航"} 
          relationship="label"
          positioning="before-top"
        >
          <Hamburger onClick={() => setIsCollapsed(!isCollapsed)} />
        </Tooltip>
      </NavDrawerHeader>

      <NavDrawerBody>
        {items.map((item) => (
          <NavItem 
            key={item.label}
            icon={item.icon as any} 
            value={item.label}
          >
            {isShowText && showLabels && item.label}
            {item.badge && !isShowText && (
              <Badge 
                appearance="filled" 
                color="danger"
                size="small"
              >
                {item.badge}
              </Badge>
            )}
          </NavItem>
        ))}
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default WindowsNavbar; 