import React, { useState, useEffect } from 'react';
import pubsub from 'pubsub-js'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { NavbarProps } from '../../types';

const MaterialNavbar: React.FC<NavbarProps & { style?: React.CSSProperties }> = ({
  items,
  position = 'bottom',
  activeItem,
  onItemClick,
  showLabels = true,  
  className = '',
  style,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(activeItem || '地图');
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
    pubsub.publish('navbar-collapsed', isCollapsed)
  }, [isCollapsed])

  const handleItemClick = (item: any) => {
    setSelectedValue(item.label);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    const item = items.find(item => item.label === newValue);
    if (item) {
      handleItemClick(item);
    }
  };

  const handleBottomNavChange = (_: React.SyntheticEvent, newValue: string) => {
    const item = items.find(item => item.label === newValue);
    if (item) {
      handleItemClick(item);
    }
  };

  // Top position - AppBar with Tabs
  if (position === 'top') {
    return (
      <AppBar 
        position="fixed" 
        className={className}
        sx={{
          zIndex: 1000,
          minHeight: '64px',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', padding: '0 16px' }}>
          <Tabs
            value={selectedValue}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: '64px',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 16px',
                minWidth: '64px',
              },
            }}
          >
            {items.map((item) => (
              <Tab
                key={item.label}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    {showLabels && item.label}
                    {item.badge && (
                      <Badge
                        badgeContent={item.badge}
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                value={item.label}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }

  if (position === 'bottom') {
    return (
      <BottomNavigation
         value={selectedValue || '地图'}
         onChange={handleBottomNavChange}
         className={className}
         sx={{
           position: style?.position || 'fixed',
           bottom: style?.bottom !== undefined ? style.bottom : 0,
           left: style?.left !== undefined ? style.left : 0,
           right: style?.right !== undefined ? style.right : 0,
           zIndex: 1000,
           height: '50px',
           borderTop: '1px solid',
           borderTopColor: 'divider',
           backdropFilter: 'blur(30px)',
           '& .MuiBottomNavigationAction-root': {
             fontSize: '12px',
             minWidth: '34px',
             height: '50px'
           },
           '& .MuiBottomNavigationAction-label': {
             fontSize: '10px',
             '&.Mui-selected': {
               fontSize: '10px',
             },
           },
           ...style,
         }}
       >
        {items.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={showLabels ? item.label : ''}
            value={item.label}
            icon={
              item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
          />
        ))}
      </BottomNavigation>
    );
  }

  // Sidebar position - Drawer with List
  return (
    <Drawer
      variant="permanent"
      className={className}
      sx={{
        width: isCollapsed ? 60 : 180,
        flexShrink: 0,
        transition: 'width 0.2s ease-in-out',
                 '& .MuiDrawer-paper': {
           width: isCollapsed ? 60 : 180,
           transition: 'width 0.2s ease-in-out',
           boxSizing: 'border-box',
           borderRight: '1px solid',
           borderRightColor: 'divider',
           position: style?.position || 'fixed',
           height: style?.height || 'auto',
           zIndex: 1000,
         },
        ...style,
      }}
           >
       <Box sx={{ p: 2, borderBottom: '1px solid', borderBottomColor: 'divider', 
          display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-start',
          transition: 'all 0.2s ease-in-out'
        }}>
         <IconButton
           onClick={() => setIsCollapsed(!isCollapsed)}
           sx={{ 
             color: 'text.secondary',
             transition: 'all 0.2s ease-in-out'
           }}
           aria-label={isCollapsed ? "展开导航" : "收起导航"}
         >
           <MenuIcon />
         </IconButton>
       </Box>
               <List sx={{ 
          pt: 1,
          transition: 'all 0.2s ease-in-out' // List容器过渡
        }}>
         {items.map((item) => {
          const isSelected = selectedValue === item.label;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                    selected={isSelected}
                    onClick={() => handleItemClick(item)}
                    sx={{
                      minHeight: '44px',
                      padding: isCollapsed ? '8px' : '8px 16px',
                      borderRadius: '8px',
                      margin: '2px 8px',
                      justifyContent: 'flex-start',
                      transition: 'all 0.2s ease-in-out', // 添加按钮过渡效果
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      },
                    }}
               >
               <ListItemIcon
                    sx={{
                      color: isSelected ? 'inherit' : 'text.secondary',
                      minWidth: isCollapsed ? '24px' : '40px',
                      justifyContent: 'center',
                      marginLeft: isCollapsed ? '2px' : 0,
                      transition: 'all 0.2s ease-in-out !important', // 强制图标过渡效果
                    }}
                 >
                                     {item.badge ? (
                     <Badge badgeContent={item.badge} color="error">
                       <span style={{ 
                         display: 'flex', 
                         alignItems: 'center', 
                         justifyContent: 'center',
                         transition: 'all 0.2s ease-in-out',
                         transformOrigin: 'center center'
                       }}>
                         {item.icon}
                       </span>
                     </Badge>
                   ) : (
                     <span style={{ 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center',
                       transition: 'all 0.2s ease-in-out',
                       transformOrigin: 'center center'
                     }}>
                       {item.icon}
                     </span>
                   )}
                </ListItemIcon>
                                 {showLabels && isShowText && (
                   <ListItemText
                     primary={item.label}
                     primaryTypographyProps={{
                       fontSize: '14px',
                       fontWeight: isSelected ? 600 : 400,
                     }}
                   />
                 )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default MaterialNavbar; 