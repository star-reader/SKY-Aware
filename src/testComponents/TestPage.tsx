import React, { useState, useEffect } from 'react';
import getPlatform from '../utils/getPlatform';
import IOSCommonButton from '../components/common/Button/styled/IOSCommonButton';
import IOSLiquidGlassButton from '../components/common/Button/styled/IOSLiquidGlassButton';
import WindowsButton from '../components/common/Button/styled/WindowsButton';
import MaterialButton from '../components/common/Button/styled/MaterialButton';
import IOSCommonNavbar from '../components/common/Navbar/styled/IOSCommonNavbar';
import WindowsNavbar from '../components/common/Navbar/styled/WindowsNavbar';
import MaterialNavbar from '../components/common/Navbar/styled/MaterialNavbar';
import { ButtonProps, NavbarProps } from '../components/common/types';
import './TestPage.scss';

// Test icons (简单的 SVG 图标)
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

type PlatformStyle = 'ios-common' | 'ios-liquid' | 'windows' | 'material';

interface TestButtonProps extends ButtonProps {
  style?: React.CSSProperties;
}

interface TestNavbarProps extends NavbarProps {
  style?: React.CSSProperties;
}

const TestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlatformStyle>('ios-common');
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [detectedPlatform, setDetectedPlatform] = useState<string>('loading...');

  useEffect(() => {
    getPlatform().then(platform => {
      setDetectedPlatform(platform);
    });
  }, []);

  const handleLoadingTest = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  // 根据选中的tab渲染对应的按钮组件
  const renderButton = (props: TestButtonProps) => {
    const { style, ...buttonProps } = props;
    const buttonStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
        return <IOSCommonButton {...buttonProps} {...buttonStyle} />;
      case 'ios-liquid':
        return <IOSLiquidGlassButton {...buttonProps} {...buttonStyle} />;
      case 'windows':
        return <WindowsButton {...buttonProps} {...buttonStyle} />;
      case 'material':
        return <MaterialButton {...buttonProps} {...buttonStyle} />;
      default:
        return <IOSCommonButton {...buttonProps} {...buttonStyle} />;
    }
  };

  // 根据选中的tab渲染对应的导航组件
  const renderNavbar = (props: TestNavbarProps) => {
    const { style, ...navbarProps } = props;
    const navbarStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonNavbar {...navbarProps} {...navbarStyle} />;
      case 'windows':
        return <WindowsNavbar {...navbarProps} {...navbarStyle} />;
      case 'material':
        return <MaterialNavbar {...navbarProps} {...navbarStyle} />;
      default:
        return <IOSCommonNavbar {...navbarProps} {...navbarStyle} />;
    }
  };

  const renderPlatformTabs = () => {
    const tabs = [
      { id: 'ios-common', label: 'iOS Common' },
      // { id: 'ios-liquid', label: 'iOS Liquid Glass' },
      { id: 'windows', label: 'Windows' },
      { id: 'material', label: 'Web/Android' },
    ];

    return (
      <div className="test-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`test-tab ${activeTab === tab.id ? 'test-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id as PlatformStyle)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderButtonSection = () => {
    return (
      <section className="test-section">
        <h2 className="test-section__title">Button 组件测试</h2>
        
        {/* 基本变体 */}
        <div className="test-group">
          <h3 className="test-group__title">基本变体</h3>
          <div className="test-group__content">
            {renderButton({ variant: "contained", onClick: () => console.log('Contained clicked'), children: "Contained Button" })}
            {renderButton({ variant: "outlined", onClick: () => console.log('Outlined clicked'), children: "Outlined Button" })}
            {renderButton({ variant: "text", onClick: () => console.log('Text clicked'), children: "Text Button" })}
            {renderButton({ variant: "primary", onClick: () => console.log('Primary clicked'), children: "Primary Button" })}
            {renderButton({ variant: "destructive", onClick: () => console.log('Destructive clicked'), children: "Destructive Button" })}
          </div>
        </div>

        {/* 尺寸变体 */}
        <div className="test-group">
          <h3 className="test-group__title">尺寸变体</h3>
          <div className="test-group__content">
            {renderButton({ variant: "contained", size: "small", children: "Small Button" })}
            {renderButton({ variant: "contained", size: "medium", children: "Medium Button" })}
            {renderButton({ variant: "contained", size: "large", children: "Large Button" })}
          </div>
        </div>

        {/* 带图标的按钮 */}
        <div className="test-group">
          <h3 className="test-group__title">带图标的按钮</h3>
          <div className="test-group__content">
            {renderButton({ variant: "contained", icon: <HomeIcon />, children: "Home" })}
            {renderButton({ variant: "outlined", icon: <SearchIcon />, children: "Search" })}
            {renderButton({ variant: "destructive", icon: <DeleteIcon />, children: "Delete" })}
          </div>
        </div>

        {/* 状态测试 */}
        <div className="test-group">
          <h3 className="test-group__title">状态测试</h3>
          <div className="test-group__content">
            {renderButton({ variant: "contained", disabled: true, children: "Disabled Button" })}
            {renderButton({ 
              variant: "contained", 
              loading: loadingStates.loading1,
              onClick: () => handleLoadingTest('loading1'),
              children: "Click for Loading"
            })}
            {renderButton({ 
              variant: "outlined", 
              loading: loadingStates.loading2,
              onClick: () => handleLoadingTest('loading2'),
              icon: <SearchIcon />,
              children: "Loading with Icon"
            })}
          </div>
        </div>

        {/* 组合测试 */}
        <div className="test-group">
          <h3 className="test-group__title">组合测试</h3>
          <div className="test-group__content">
            {renderButton({ 
              variant: "destructive", 
              size: "small", 
              icon: <DeleteIcon />,
              onClick: () => console.log('Small destructive clicked'),
              children: "Delete Item"
            })}
            {renderButton({ 
              variant: "outlined", 
              size: "large", 
              icon: <SearchIcon />,
              loading: loadingStates.loading3,
              onClick: () => handleLoadingTest('loading3'),
              children: "Search Database"
            })}
            {renderButton({ 
              variant: "text", 
              size: "small",
              onClick: () => console.log('Cancel clicked'),
              children: "Cancel"
            })}
          </div>
        </div>

        {/* 长文本测试 */}
        <div className="test-group">
          <h3 className="test-group__title">长文本测试</h3>
          <div className="test-group__content">
            {renderButton({ 
              variant: "contained", 
              style: { maxWidth: '200px' },
              children: "This is a very long button text that should be handled properly"
            })}
            {renderButton({ 
              variant: "outlined", 
              icon: <HomeIcon />, 
              style: { maxWidth: '150px' },
              children: "Long Text with Icon"
            })}
          </div>
        </div>

        {/* 辅助功能测试 */}
        <div className="test-group">
          <h3 className="test-group__title">辅助功能测试</h3>
          <div className="test-group__content">
            {renderButton({ 
              variant: "contained", 
              "aria-label": "保存文档到云端",
              icon: <HomeIcon />,
              children: "Save"
            })}
            {renderButton({ 
              variant: "destructive", 
              "aria-label": "永久删除选中的项目",
              icon: <DeleteIcon />,
              children: "Delete Selected"
            })}
          </div>
        </div>
      </section>
    );
  };

  const renderNavbarSection = () => {
    const [activeNavItem, setActiveNavItem] = useState('home');

    // Test data for navbar
    const navbarItems = [
      { label: 'Home', icon: <HomeIcon />, route: '/home' },
      { label: 'Search', icon: <SearchIcon />, route: '/search' },
      { label: 'Profile', icon: <ProfileIcon />, route: '/profile' },
      { label: 'Settings', icon: <SettingsIcon />, route: '/settings' },
    ];

    return (
      <section className="test-section">
        <h2 className="test-section__title">Navbar 组件测试</h2>
        
                 {/* 底部导航测试 */}
         <div className="test-group">
           <h3 className="test-group__title">底部导航 (Bottom Navigation)</h3>
           <div className="test-group__content">
             <div className="test-navbar-container" style={{ position: 'relative', height: '120px', width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
               {renderNavbar({
                 items: navbarItems,
                 position: 'bottom',
                 activeItem: activeNavItem,
                 onItemClick: (item) => {
                   setActiveNavItem(item.label);
                   console.log('Bottom nav clicked:', item.label);
                 },
                 showLabels: true,
                 safeArea: false,
                 style: { position: 'relative', bottom: 'auto', left: 'auto', right: 'auto' }, // 覆盖fixed定位
               })}
             </div>
           </div>
         </div>

         {/* 侧边栏导航测试 */}
         <div className="test-group">
           <h3 className="test-group__title">侧边栏导航 (Sidebar Navigation)</h3>
           <div className="test-group__content">
             <div className="test-navbar-container" style={{ position: 'relative', height: '300px', width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
               {renderNavbar({
                 items: navbarItems,
                 position: 'sidebar',
                 activeItem: activeNavItem,
                 onItemClick: (item) => {
                   setActiveNavItem(item.label);
                   console.log('Sidebar nav clicked:', item.label);
                 },
                 showLabels: true,
                 safeArea: false,
                 style: { position: 'relative', height: '100%' }, // 覆盖fixed定位
               })}
               <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                 <p>主内容区域 - 当前选中: {activeNavItem}</p>
               </div>
             </div>
           </div>
         </div>
      </section>
    );
  };

  return (
    <div className={`test-page test-page--${activeTab}`}>
      <div className="test-page__header">
        <h1 className="test-page__title">组件测试页面</h1>
        <p className="test-page__description">
          当前平台样式: <strong>{activeTab}</strong> | 
          检测到的平台: <strong>{detectedPlatform}</strong>
        </p>
        {renderPlatformTabs()}
      </div>

      <div className="test-page__content">
        {renderButtonSection()}
        {renderNavbarSection()}
        
        {/* 占位符，为将来的其他组件测试 */}
        <section className="test-section">
          <h2 className="test-section__title">其他组件</h2>
          <div className="test-group">
            <h3 className="test-group__title">即将到来</h3>
            <div className="test-group__content">
              <p className="test-placeholder">
                更多组件测试将在这里显示...
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestPage; 