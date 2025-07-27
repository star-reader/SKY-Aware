import React, { useState, useEffect } from 'react';
import getPlatform from '../utils/getPlatform';
import IOSCommonButton from '../components/common/Button/styled/IOSCommonButton';
import IOSLiquidGlassButton from '../components/common/Button/styled/IOSLiquidGlassButton';
import WindowsButton from '../components/common/Button/styled/WindowsButton';
import MaterialButton from '../components/common/Button/styled/MaterialButton';
import IOSCommonNavbar from '../components/common/Navbar/styled/IOSCommonNavbar';
import WindowsNavbar from '../components/common/Navbar/styled/WindowsNavbar';
import MaterialNavbar from '../components/common/Navbar/styled/MaterialNavbar';
import IOSCommonAlert from '../components/common/Alert/styled/IOSCommonAlert';
import WindowsAlert from '../components/common/Alert/styled/WindowsAlert';
import MaterialAlert from '../components/common/Alert/styled/MaterialAlert';
import IOSCommonPanel from '../components/common/Panel/styled/IOSCommonPanel';
import WindowsPanel from '../components/common/Panel/styled/WindowsPanel';
import MaterialPanel from '../components/common/Panel/styled/MaterialPanel';
import IOSCommonInput from '../components/common/Input/styled/IOSCommonInput';
import WindowsInput from '../components/common/Input/styled/WindowsInput';
import MaterialInput from '../components/common/Input/styled/MaterialInput';
import IOSCommonList from '../components/common/List/styled/IOSCommonList';
import WindowsList from '../components/common/List/styled/WindowsList';
import MaterialList from '../components/common/List/styled/MaterialList';
import IOSCommonSpinner from '../components/common/Spinner/styled/IOSCommonSpinner';
import WindowsSpinner from '../components/common/Spinner/styled/WindowsSpinner';
import MaterialSpinner from '../components/common/Spinner/styled/MaterialSpinner';
import IOSCommonCard from '../components/common/Card/styled/IOSCommonCard';
import WindowsCard from '../components/common/Card/styled/WindowsCard';
import MaterialCard from '../components/common/Card/styled/MaterialCard';
import IOSCommonDropdown from '../components/common/Dropdown/styled/IOSCommonDropdown';
import WindowsDropdown from '../components/common/Dropdown/styled/WindowsDropdown';
import MaterialDropdown from '../components/common/Dropdown/styled/MaterialDropdown';
import { ButtonProps, NavbarProps, AlertProps, PanelProps, InputProps, ListProps, SpinnerProps, CardProps, DropdownProps, DropdownOption } from '../components/common/types';
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

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

type PlatformStyle = 'ios-common' | 'ios-liquid' | 'windows' | 'material';

interface TestButtonProps extends ButtonProps {
  style?: React.CSSProperties;
}

interface TestNavbarProps extends NavbarProps {
  style?: React.CSSProperties;
}

interface TestAlertProps extends AlertProps {
  style?: React.CSSProperties;
  onAnimationEnd?: () => void;
}

interface TestPanelProps extends PanelProps {
  style?: React.CSSProperties;
  onAnimationEnd?: () => void;
}

interface TestInputProps extends InputProps {
  style?: React.CSSProperties;
}

interface TestListProps extends ListProps {
  style?: React.CSSProperties;
}

interface TestSpinnerProps extends SpinnerProps {
  style?: React.CSSProperties;
}

interface TestCardProps extends CardProps {
  style?: React.CSSProperties;
}

interface TestDropdownProps extends DropdownProps {
  style?: React.CSSProperties;
}

const TestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlatformStyle>('ios-common');
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [detectedPlatform, setDetectedPlatform] = useState<string>('loading...');
  const [visibleAlerts, setVisibleAlerts] = useState<{[key: string]: boolean}>({});
  const [visiblePanels, setVisiblePanels] = useState<{[key: string]: boolean}>({});
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [selectedListItem, setSelectedListItem] = useState<string>('item1');
  const [dropdownValues, setDropdownValues] = useState<{[key: string]: string | string[]}>({});
  


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

  // 根据选中的tab渲染对应的Alert组件
  const renderAlert = (props: TestAlertProps) => {
    const { style, ...alertProps } = props;
    const alertStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonAlert {...alertProps} {...alertStyle} />;
      case 'windows':
        return <WindowsAlert {...alertProps} {...alertStyle} />;
      case 'material':
        return <MaterialAlert {...alertProps} {...alertStyle} />;
      default:
        return <IOSCommonAlert {...alertProps} {...alertStyle} />;
    }
  };

  // 根据选中的tab渲染对应的Panel组件
  const renderPanel = (props: TestPanelProps) => {
    const { style, ...panelProps } = props;
    const panelStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonPanel {...panelProps} {...panelStyle} />;
      case 'windows':
        return <WindowsPanel {...panelProps} {...panelStyle} />;
      case 'material':
        return <MaterialPanel {...panelProps} {...panelStyle} />;
      default:
        return <IOSCommonPanel {...panelProps} {...panelStyle} />;
    }
  };

  // 根据选中的tab渲染对应的Input组件
  const renderInput = (props: TestInputProps) => {
    const { style, ...inputProps } = props;
    const inputStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonInput {...inputProps} {...inputStyle} />;
      case 'windows':
        return <WindowsInput {...inputProps} {...inputStyle} />;
      case 'material':
        return <MaterialInput {...inputProps} {...inputStyle} />;
      default:
        return <IOSCommonInput {...inputProps} {...inputStyle} />;
    }
  };

  // 根据选中的tab渲染对应的List组件
  const renderList = (props: TestListProps) => {
    const { style, ...listProps } = props;
    const listStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonList {...listProps} {...listStyle} />;
      case 'windows':
        return <WindowsList {...listProps} {...listStyle} />;
      case 'material':
        return <MaterialList {...listProps} {...listStyle} />;
      default:
        return <IOSCommonList {...listProps} {...listStyle} />;
    }
  };

  // 根据选中的tab渲染对应的Spinner组件
  const renderSpinner = (props: TestSpinnerProps) => {
    const { style, ...spinnerProps } = props;
    const spinnerStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonSpinner {...spinnerProps} {...spinnerStyle} />;
      case 'windows':
        return <WindowsSpinner {...spinnerProps} {...spinnerStyle} />;
      case 'material':
        return <MaterialSpinner {...spinnerProps} {...spinnerStyle} />;
      default:
        return <IOSCommonSpinner {...spinnerProps} {...spinnerStyle} />;
    }
  };

  // 根据选中的tab渲染对应的Card组件
  const renderCard = (props: TestCardProps) => {
    const { style, ...cardProps } = props;
    const cardStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonCard {...cardProps} {...cardStyle} />;
      case 'windows':
        return <WindowsCard {...cardProps} {...cardStyle} />;
      case 'material':
        return <MaterialCard {...cardProps} {...cardStyle} />;
      default:
        return <IOSCommonCard {...cardProps} {...cardStyle} />;
    }
  };

  // 根据选中的tab渲染对应的Dropdown组件
  const renderDropdown = (props: TestDropdownProps) => {
    const { style, ...dropdownProps } = props;
    const dropdownStyle = style ? { className: props.className, style } : { className: props.className };
    
    switch (activeTab) {
      case 'ios-common':
      case 'ios-liquid':
        return <IOSCommonDropdown {...dropdownProps} {...dropdownStyle} />;
      case 'windows':
        return <WindowsDropdown {...dropdownProps} {...dropdownStyle} />;
      case 'material':
        return <MaterialDropdown {...dropdownProps} {...dropdownStyle} />;
      default:
        return <IOSCommonDropdown {...dropdownProps} {...dropdownStyle} />;
    }
  };



  const showAlert = (alertId: string) => {
    setVisibleAlerts(prev => ({ ...prev, [alertId]: true }));
    // Auto dismiss after 5 seconds for non-dismissible alerts
    setTimeout(() => {
      setVisibleAlerts(prev => ({ ...prev, [alertId]: false }));
    }, 5000);
  };

  const dismissAlert = (alertId: string) => {
    setVisibleAlerts(prev => ({ ...prev, [alertId]: false }));
  };

  const handleAlertAnimationEnd = (alertId: string) => {
    // 动画结束后清理状态
    setVisibleAlerts(prev => ({ ...prev, [alertId]: false }));
  };

  const showPanel = (panelId: string) => {
    setVisiblePanels(prev => ({ ...prev, [panelId]: true }));
  };

  const dismissPanel = (panelId: string) => {
    setVisiblePanels(prev => ({ ...prev, [panelId]: false }));
  };

  const handlePanelAnimationEnd = (panelId: string) => {
    // 动画结束后清理状态
    setVisiblePanels(prev => ({ ...prev, [panelId]: false }));
  };

  const handleInputChange = (inputId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(prev => ({ ...prev, [inputId]: event.target.value }));
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

  const renderAlertSection = () => {
    return (
      <section className="test-section">
        <h2 className="test-section__title">Alert 组件测试</h2>
        
        {/* Alert 类型测试 */}
        <div className="test-group">
          <h3 className="test-group__title">Alert 类型</h3>
          <div className="test-group__content">
            {renderButton({ 
              onClick: () => showAlert('success'), 
              children: "Show Success Alert",
              variant: "contained"
            })}
            {renderButton({ 
              onClick: () => showAlert('error'), 
              children: "Show Error Alert",
              variant: "contained"
            })}
            {renderButton({ 
              onClick: () => showAlert('warning'), 
              children: "Show Warning Alert",
              variant: "contained"
            })}
            {renderButton({ 
              onClick: () => showAlert('info'), 
              children: "Show Info Alert",
              variant: "contained"
            })}
          </div>
        </div>

        {/* Dismissible Alert 测试 */}
        <div className="test-group">
          <h3 className="test-group__title">可关闭的 Alert</h3>
          <div className="test-group__content">
            {renderButton({ 
              onClick: () => showAlert('dismissible-success'), 
              children: "Show Dismissible Success",
              variant: "outlined"
            })}
            {renderButton({ 
              onClick: () => showAlert('dismissible-error'), 
              children: "Show Dismissible Error",
              variant: "outlined"
            })}
          </div>
        </div>

        {/* 自定义图标 Alert 测试 */}
        <div className="test-group">
          <h3 className="test-group__title">自定义图标 Alert</h3>
          <div className="test-group__content">
            {renderButton({ 
              onClick: () => showAlert('custom-icon'), 
              children: "Show Custom Icon Alert",
              variant: "text"
            })}
          </div>
        </div>

        {/* 渲染实际的 Alert 组件 */}
        {visibleAlerts['success'] && renderAlert({
          type: 'success',
          message: '操作成功完成！这是一个成功提示。',
          position: 'top',
        })}

        {visibleAlerts['error'] && renderAlert({
          type: 'error',
          message: '发生错误！请检查您的输入并重试。',
          position: 'top',
        })}

        {visibleAlerts['warning'] && renderAlert({
          type: 'warning',
          message: '注意：这是一个警告信息，请谨慎操作。',
          position: 'top',
        })}

        {visibleAlerts['info'] && renderAlert({
          type: 'info',
          message: '这是一条信息提示，为您提供相关信息。',
          position: 'top',
        })}

                 {visibleAlerts['dismissible-success'] && renderAlert({
           type: 'success',
           message: '可关闭的成功提示，点击X按钮关闭。',
           position: 'top',
           dismissible: true,
           onDismiss: () => dismissAlert('dismissible-success'),
           onAnimationEnd: () => handleAlertAnimationEnd('dismissible-success'),
         })}

         {visibleAlerts['dismissible-error'] && renderAlert({
           type: 'error',
           message: '可关闭的错误提示，点击X按钮关闭。',
           position: 'top',
           dismissible: true,
           onDismiss: () => dismissAlert('dismissible-error'),
           onAnimationEnd: () => handleAlertAnimationEnd('dismissible-error'),
         })}

                 {visibleAlerts['custom-icon'] && renderAlert({
           type: 'info',
           message: '这是一个带有自定义图标的Alert。',
           position: 'top',
           dismissible: true,
           onDismiss: () => dismissAlert('custom-icon'),
           onAnimationEnd: () => handleAlertAnimationEnd('custom-icon'),
           icon: <SettingsIcon />,
         })}

             </section>
     );
   };

   const renderPanelSection = () => {
     return (
       <section className="test-section">
         <h2 className="test-section__title">Panel 组件测试</h2>
         
         {/* Panel 类型测试 */}
         <div className="test-group">
           <h3 className="test-group__title">Panel 类型</h3>
           <div className="test-group__content">
             {renderButton({ 
               onClick: () => showPanel('success-panel'), 
               children: "Show Success Panel",
               variant: "contained"
             })}
             {renderButton({ 
               onClick: () => showPanel('info-panel'), 
               children: "Show Info Panel",
               variant: "contained"
             })}
             {renderButton({ 
               onClick: () => showPanel('warning-panel'), 
               children: "Show Warning Panel",
               variant: "contained"
             })}
           </div>
         </div>

         {/* 自定义Panel测试 */}
         <div className="test-group">
           <h3 className="test-group__title">自定义Panel</h3>
           <div className="test-group__content">
             {renderButton({ 
               onClick: () => showPanel('custom-panel'), 
               children: "Show Custom Panel",
               variant: "outlined"
             })}
             {renderButton({ 
               onClick: () => showPanel('no-action-panel'), 
               children: "Panel without Action",
               variant: "text"
             })}
           </div>
         </div>

         {/* 渲染实际的 Panel 组件 */}
         {visiblePanels['success-panel'] && renderPanel({
           open: true,
           title: 'Operation Successful',
           content: 'Your action has been completed successfully. Everything is working as expected.',
           icon: <CheckIcon />,
           actionText: 'Continue',
           onAction: () => console.log('Success panel action clicked'),
           onClose: () => dismissPanel('success-panel'),
           onAnimationEnd: () => handlePanelAnimationEnd('success-panel'),
         })}

         {visiblePanels['info-panel'] && renderPanel({
           open: true,
           title: 'Information',
           content: 'This is an informational panel with some useful details that you should know about.',
           icon: <InfoIcon />,
           actionText: 'Got it',
           onAction: () => console.log('Info panel action clicked'),
           onClose: () => dismissPanel('info-panel'),
           onAnimationEnd: () => handlePanelAnimationEnd('info-panel'),
         })}

         {visiblePanels['warning-panel'] && renderPanel({
           open: true,
           title: 'Warning',
           content: 'Please be careful with this action. It may have consequences that cannot be undone.',
           icon: <WarningIcon />,
           actionText: 'Proceed',
           onAction: () => console.log('Warning panel action clicked'),
           onClose: () => dismissPanel('warning-panel'),
           onAnimationEnd: () => handlePanelAnimationEnd('warning-panel'),
         })}

         {visiblePanels['custom-panel'] && renderPanel({
           open: true,
           title: 'Custom Settings',
           content: 'This panel demonstrates custom content and actions. You can configure various options here.',
           icon: <SettingsIcon />,
           actionText: 'Save Settings',
           onAction: () => console.log('Custom panel action clicked'),
           onClose: () => dismissPanel('custom-panel'),
           onAnimationEnd: () => handlePanelAnimationEnd('custom-panel'),
         })}

         {visiblePanels['no-action-panel'] && renderPanel({
           open: true,
           title: 'Information Only',
           content: 'This panel only displays information and has no action button.',
           icon: <InfoIcon />,
           onClose: () => dismissPanel('no-action-panel'),
           onAnimationEnd: () => handlePanelAnimationEnd('no-action-panel'),
         })}

       </section>
     );
   };

   const renderInputSection = () => {
     return (
       <section className="test-section">
         <h2 className="test-section__title">Input 组件测试</h2>
         
         {/* 基本Input测试 */}
         <div className="test-group">
           <h3 className="test-group__title">基本输入框</h3>
           <div className="test-group__content">
             <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {renderInput({
                 label: 'Name',
                 placeholder: 'Enter your name',
                 value: inputValues['name'] || '',
                 onChange: handleInputChange('name')
               })}
               {renderInput({
                 label: 'Email',
                 type: 'email',
                 placeholder: 'Enter your email',
                 value: inputValues['email'] || '',
                 onChange: handleInputChange('email'),
                 icon: <EmailIcon />
               })}
               {renderInput({
                 label: 'Password',
                 type: 'password',
                 placeholder: 'Enter your password',
                 value: inputValues['password'] || '',
                 onChange: handleInputChange('password'),
                 icon: <LockIcon />
               })}
             </div>
           </div>
         </div>

         {/* 状态测试 */}
         <div className="test-group">
           <h3 className="test-group__title">状态测试</h3>
           <div className="test-group__content">
             <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {renderInput({
                 label: 'Disabled Input',
                 placeholder: 'This is disabled',
                 disabled: true,
                 value: 'Disabled value'
               })}
               {renderInput({
                 label: 'Error Input',
                 placeholder: 'This has an error',
                 error: true,
                 value: inputValues['error'] || '',
                 onChange: handleInputChange('error')
               })}
               {renderInput({
                 label: 'With Icon',
                 placeholder: 'Input with user icon',
                 value: inputValues['withIcon'] || '',
                 onChange: handleInputChange('withIcon'),
                 icon: <PersonIcon />
               })}
             </div>
           </div>
         </div>

         {/* 类型测试 */}
         <div className="test-group">
           <h3 className="test-group__title">类型测试</h3>
           <div className="test-group__content">
             <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {renderInput({
                 label: 'Text Input',
                 type: 'text',
                 placeholder: 'Enter text',
                 value: inputValues['text'] || '',
                 onChange: handleInputChange('text')
               })}
               {renderInput({
                 label: 'Number Input',
                 type: 'number',
                 placeholder: 'Enter number',
                 value: inputValues['number'] || '',
                 onChange: handleInputChange('number')
               })}
               {renderInput({
                 label: 'Email Input',
                 type: 'email',
                 placeholder: 'Enter email',
                 value: inputValues['emailType'] || '',
                 onChange: handleInputChange('emailType'),
                 icon: <EmailIcon />
               })}
             </div>
           </div>
         </div>

         {/* 无标签测试 */}
         <div className="test-group">
           <h3 className="test-group__title">无标签输入框</h3>
           <div className="test-group__content">
             <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {renderInput({
                 placeholder: 'Search...',
                 value: inputValues['search'] || '',
                 onChange: handleInputChange('search'),
                 icon: <SearchIcon />
               })}
               {renderInput({
                 placeholder: 'Username',
                 value: inputValues['username'] || '',
                 onChange: handleInputChange('username'),
                 icon: <PersonIcon />
               })}
               {renderInput({
                 placeholder: 'Enter password',
                 type: 'password',
                 value: inputValues['passwordNoLabel'] || '',
                 onChange: handleInputChange('passwordNoLabel'),
                 icon: <LockIcon />
               })}
             </div>
           </div>
         </div>

         {/* 综合示例 */}
         <div className="test-group">
           <h3 className="test-group__title">综合示例 - 登录表单</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderInput({
                 label: 'Username or Email',
                 placeholder: 'Enter your username or email',
                 value: inputValues['loginEmail'] || '',
                 onChange: handleInputChange('loginEmail'),
                 icon: <PersonIcon />
               })}
               {renderInput({
                 label: 'Password',
                 type: 'password',
                 placeholder: 'Enter your password',
                 value: inputValues['loginPassword'] || '',
                 onChange: handleInputChange('loginPassword'),
                 icon: <LockIcon />
               })}
               <div style={{ marginTop: '16px', textAlign: 'center' }}>
                 {renderButton({
                   variant: 'contained',
                   children: 'Login',
                   onClick: () => console.log('Login clicked', {
                     email: inputValues['loginEmail'],
                     password: inputValues['loginPassword']
                   }),
                   style: { width: '100%' }
                 })}
               </div>
             </div>
           </div>
         </div>

       </section>
     );
   };

   const renderListSection = () => {
     // 测试数据
     const basicListItems = [
       {
         id: 'item1',
         label: 'Inbox',
         sublabel: '3 new messages',
         icon: <NotificationIcon />,
       },
       {
         id: 'item2',
         label: 'Drafts',
         sublabel: '2 saved drafts',
         icon: <FileIcon />,
       },
       {
         id: 'item3',
         label: 'Sent',
         sublabel: 'Recently sent items',
         icon: <SearchIcon />,
       },
       {
         id: 'item4',
         label: 'Trash',
         sublabel: '5 deleted items',
         icon: <DeleteIcon />,
         disabled: true,
       },
     ];

     const avatarListItems = [
       {
         id: 'user1',
         label: 'Alice Johnson',
         sublabel: 'Online - Available for chat',
         avatar: (
           <img 
             src="https://images.unsplash.com/photo-1494790108755-2616b612b734?w=40&h=40&fit=crop&crop=face" 
             alt="Alice" 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />
         ),
       },
       {
         id: 'user2',
         label: 'Bob Smith',
         sublabel: 'Away - Back in 30 minutes',
         avatar: (
           <img 
             src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
             alt="Bob" 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />
         ),
       },
       {
         id: 'user3',
         label: 'Carol Davis',
         sublabel: 'Busy - Do not disturb',
         avatar: (
           <img 
             src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" 
             alt="Carol" 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />
         ),
       },
     ];

     const actionListItems = [
       {
         id: 'setting1',
         label: 'Notifications',
         sublabel: 'Manage your notification preferences',
         icon: <NotificationIcon />,
         action: (
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span style={{ fontSize: '12px', color: '#666' }}>On</span>
             {renderButton({
               variant: 'text',
               size: 'small',
               children: 'Edit',
               onClick: () => console.log('Edit notifications'),
             })}
           </div>
         ),
       },
               {
          id: 'setting2',
          label: 'Privacy',
          sublabel: 'Control your privacy settings',
          icon: <SettingsIcon />,
          action: (
            renderButton({
              variant: 'outlined',
              size: 'small',
              children: 'Configure',
              onClick: () => console.log('Configure privacy'),
            })
          ),
        },
       {
         id: 'setting3',
         label: 'Storage',
         sublabel: '12.5 GB of 15 GB used',
         icon: <FolderIcon />,
         action: (
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ 
               width: '60px', 
               height: '4px', 
               background: '#e0e0e0', 
               borderRadius: '2px',
               overflow: 'hidden'
             }}>
               <div style={{ 
                 width: '83%', 
                 height: '100%', 
                 background: '#ff9800'
               }} />
             </div>
           </div>
         ),
       },
     ];

     const fileListItems = [
       {
         id: 'file1',
         label: 'Project Report.pdf',
         sublabel: 'Modified 2 hours ago • 2.4 MB',
         icon: <FileIcon />,
         href: '#',
       },
       {
         id: 'file2',
         label: 'Meeting Notes',
         sublabel: 'Created today • Shared with team',
         icon: <FileIcon />,
         href: '#',
       },
       {
         id: 'file3',
         label: 'Design Assets',
         sublabel: 'Updated yesterday • 15 files',
         icon: <FolderIcon />,
         href: '#',
       },
     ];

     return (
       <section className="test-section">
         <h2 className="test-section__title">List 组件测试</h2>
         
         {/* 基本List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">基本列表</h3>
           <div className="test-group__content">
             <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {renderList({
                 items: basicListItems,
                 selectedItem: selectedListItem,
                 onItemClick: (item) => {
                   setSelectedListItem(item.id);
                   console.log('Selected item:', item.label);
                 },
               })}
               {renderList({
                 items: basicListItems,
                 selectedItem: selectedListItem,
                 onItemClick: (item) => {
                   setSelectedListItem(item.id);
                   console.log('Selected item:', item.label);
                 },
                 dense: true,
                 subheader: 'Dense List',
               })}
             </div>
           </div>
         </div>

         {/* 分隔线List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">带分隔线的列表</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderList({
                 items: basicListItems,
                 selectedItem: selectedListItem,
                 onItemClick: (item) => {
                   setSelectedListItem(item.id);
                   console.log('Selected item:', item.label);
                 },
                 dividers: true,
                 subheader: 'Mail Folders',
               })}
             </div>
           </div>
         </div>

         {/* Avatar List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">用户列表 - 头像</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderList({
                 items: avatarListItems,
                 selectedItem: selectedListItem,
                 onItemClick: (item) => {
                   setSelectedListItem(item.id);
                   console.log('Selected user:', item.label);
                 },
                 dividers: true,
                 subheader: 'Team Members',
               })}
             </div>
           </div>
         </div>

         {/* Action List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">带操作的列表</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderList({
                 items: actionListItems,
                 subheader: 'Settings',
                 dividers: true,
               })}
             </div>
           </div>
         </div>

         {/* 可滚动List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">可滚动列表</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderList({
                 items: [...basicListItems, ...basicListItems, ...basicListItems],
                 selectedItem: selectedListItem,
                 onItemClick: (item) => {
                   setSelectedListItem(item.id);
                   console.log('Selected item:', item.label);
                 },
                 scrollable: true,
                 maxHeight: '200px',
                 subheader: 'Scrollable List',
                 dividers: true,
               })}
             </div>
           </div>
         </div>

         {/* 链接List测试 */}
         <div className="test-group">
           <h3 className="test-group__title">链接列表</h3>
           <div className="test-group__content">
             <div style={{ maxWidth: '400px', margin: '0 auto' }}>
               {renderList({
                 items: fileListItems,
                 subheader: 'Recent Files',
                 dividers: true,
               })}
             </div>
           </div>
         </div>

       </section>
     );
   };

   const renderSpinnerSection = () => {
     return (
       <section className="test-section">
         <h2 className="test-section__title">Spinner 测试</h2>

         {/* 基础Spinner测试 */}
         <div className="test-group">
           <h3 className="test-group__title">基础加载器</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
               {renderSpinner({ size: 'small' })}
               {renderSpinner({ size: 'medium' })}
               {renderSpinner({ size: 'large' })}
             </div>
           </div>
         </div>

         {/* 带标签的Spinner测试 */}
         <div className="test-group">
           <h3 className="test-group__title">带标签的加载器</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '40px', justifyContent: 'center' }}>
               {renderSpinner({ 
                 size: 'small', 
                 label: 'Loading...',
               })}
               {renderSpinner({ 
                 size: 'medium', 
                 label: 'Please wait',
               })}
               {renderSpinner({ 
                 size: 'large', 
                 label: 'Processing',
               })}
             </div>
           </div>
         </div>

         {/* 自定义颜色的Spinner测试 */}
         <div className="test-group">
           <h3 className="test-group__title">自定义颜色</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
               {renderSpinner({ color: '#007AFF' })}
               {renderSpinner({ color: '#FF3B30' })}
               {renderSpinner({ color: '#34C759' })}
               {renderSpinner({ color: '#FF9500' })}
             </div>
           </div>
         </div>

         {/* 确定进度的Spinner测试 */}
         <div className="test-group">
           <h3 className="test-group__title">确定进度</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
               {renderSpinner({ 
                 variant: 'determinate', 
                 value: 25,
                 label: '25%',
               })}
               {renderSpinner({ 
                 variant: 'determinate', 
                 value: 50,
                 label: '50%',
               })}
               {renderSpinner({ 
                 variant: 'determinate', 
                 value: 75,
                 label: '75%',
               })}
               {renderSpinner({ 
                 variant: 'determinate', 
                 value: 100,
                 label: '100%',
               })}
             </div>
           </div>
         </div>

         {/* 粗细调整的Spinner测试 */}
         <div className="test-group">
           <h3 className="test-group__title">线条粗细</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
               {renderSpinner({ 
                 size: 'large',
                 thickness: 1,
                 label: 'Thin',
               })}
               {renderSpinner({ 
                 size: 'large',
                 thickness: 3,
                 label: 'Medium',
               })}
               {renderSpinner({ 
                 size: 'large',
                 thickness: 5,
                 label: 'Thick',
               })}
             </div>
           </div>
         </div>

         {/* 可见性控制测试 */}
         <div className="test-group">
           <h3 className="test-group__title">可见性控制</h3>
           <div className="test-group__content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', flexDirection: 'column' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                 {renderSpinner({ 
                   visible: true,
                   label: 'Visible',
                 })}
                 {renderSpinner({ 
                   visible: false,
                   label: 'Hidden',
                 })}
               </div>
               <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                 左侧显示，右侧隐藏（应该看不到）
               </p>
             </div>
           </div>
         </div>

       </section>
     );
   };

  const renderCardSection = () => {
    return (
      <section className="test-section">
        <h2 className="test-section__title">Card 组件测试</h2>

        {/* 基础Card测试 */}
        <div className="test-group">
          <h3 className="test-group__title">基础 Card</h3>
          <div className="test-group__content">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {renderCard({ 
                title: 'Simple Card',
                subtitle: 'Basic card without image',
                children: (
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                    This is a simple card component that displays basic content without any advanced features.
                  </p>
                ),
              })}
              
              {renderCard({ 
                title: 'Card with Image',
                subtitle: 'Beautiful landscape photo',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
                children: (
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                    This card includes a header image that makes it more visually appealing.
                  </p>
                ),
              })}
              
              {renderCard({ 
                title: 'Content Only',
                children: (
                  <div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      This card focuses purely on content without a subtitle.
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      Additional details can be provided here.
                    </p>
                  </div>
                ),
              })}
            </div>
          </div>
        </div>

        {/* 可点击Card测试 */}
        <div className="test-group">
          <h3 className="test-group__title">可点击 Card</h3>
          <div className="test-group__content">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {renderCard({ 
                title: 'Clickable Card',
                subtitle: 'Click me to see action!',
                image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
                onClick: () => alert('Card clicked!'),
                children: (
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                    This card responds to click events and shows hover effects.
                  </p>
                ),
              })}
              
              {renderCard({ 
                title: 'Action Card',
                subtitle: 'Interactive content',
                onClick: () => alert('Action executed!'),
                children: (
                  <div style={{ textAlign: 'center' }}>
                    <SearchIcon />
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', lineHeight: '1.5' }}>
                      Click anywhere on this card to trigger an action.
                    </p>
                  </div>
                ),
              })}
            </div>
          </div>
        </div>

        {/* 不同高度Card测试 */}
        <div className="test-group">
          <h3 className="test-group__title">不同高度 (Elevation)</h3>
          <div className="test-group__content">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                             {[1, 2, 3, 4].map(elevation => (
                 <div key={elevation}>
                   {renderCard({ 
                     title: `Elevation ${elevation}`,
                     subtitle: `Shadow level: ${elevation}`,
                     elevation: elevation,
                     children: (
                       <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                         This card has elevation level {elevation}, creating different shadow depths.
                       </p>
                     ),
                   })}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 产品展示Card测试 */}
        <div className="test-group">
          <h3 className="test-group__title">产品展示 Cards</h3>
          <div className="test-group__content">
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {renderCard({ 
                title: 'Wireless Headphones',
                subtitle: '$299.99',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop',
                onClick: () => alert('Product selected: Wireless Headphones'),
                elevation: 2,
                children: (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      Premium noise-cancelling wireless headphones with 30-hour battery life.
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      ⭐ 4.8/5 stars · Free shipping
                    </p>
                  </div>
                ),
              })}
              
              {renderCard({ 
                title: 'Smartphone',
                subtitle: '$899.99',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop',
                onClick: () => alert('Product selected: Smartphone'),
                elevation: 2,
                children: (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      Latest flagship smartphone with advanced AI camera system.
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      ⭐ 4.9/5 stars · 2-year warranty
                    </p>
                  </div>
                ),
              })}
              
              {renderCard({ 
                title: 'Laptop',
                subtitle: '$1,299.99',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop',
                onClick: () => alert('Product selected: Laptop'),
                elevation: 2,
                children: (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      High-performance laptop perfect for work and entertainment.
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      ⭐ 4.7/5 stars · Student discount available
                    </p>
                  </div>
                ),
              })}
            </div>
          </div>
        </div>

      </section>
    );
  };

  // Dropdown 测试部分
  const renderDropdownSection = () => {
    // 测试选项数据
    const basicOptions = [
      { key: 'option1', text: 'Option 1', value: 'opt1' },
      { key: 'option2', text: 'Option 2', value: 'opt2' },
      { key: 'option3', text: 'Option 3', value: 'opt3' },
      { key: 'option4', text: 'Disabled Option', value: 'opt4', disabled: true },
    ];

    const countryOptions = [
      { key: 'cn', text: '中国', value: 'china' },
      { key: 'us', text: '美国', value: 'usa' },
      { key: 'jp', text: '日本', value: 'japan' },
      { key: 'kr', text: '韩国', value: 'korea' },
      { key: 'gb', text: '英国', value: 'uk' },
      { key: 'fr', text: '法国', value: 'france' },
      { key: 'de', text: '德国', value: 'germany' },
      { key: 'it', text: '意大利', value: 'italy' },
      { key: 'ca', text: '加拿大', value: 'canada' },
      { key: 'au', text: '澳大利亚', value: 'australia' },
    ];

    const skillOptions = [
      { key: 'react', text: 'React', value: 'react' },
      { key: 'vue', text: 'Vue.js', value: 'vue' },
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'nodejs', text: 'Node.js', value: 'nodejs' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'java', text: 'Java', value: 'java' },
      { key: 'swift', text: 'Swift', value: 'swift' },
      { key: 'kotlin', text: 'Kotlin', value: 'kotlin' },
    ];

    return (
      <section className="test-section">
        <h2 className="test-section__title">Dropdown 组件测试</h2>

        {/* 基础 Dropdown 测试 */}
        <div className="test-group">
          <h3 className="test-group__title">基础 Dropdown</h3>
          <div className="test-group__content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {renderDropdown({
                label: '选择选项',
                options: basicOptions,
                placeholder: '请选择一个选项',
                value: dropdownValues.basic as string,
                onSelectionChange: (option: DropdownOption | DropdownOption[] | undefined, value?: string | string[]) => {
                  setDropdownValues(prev => ({ ...prev, basic: value as string }));
                },
              })}

              {renderDropdown({
                label: '带默认值',
                options: basicOptions,
                defaultValue: 'option2',
                onSelectionChange: (option: DropdownOption | DropdownOption[] | undefined, value?: string | string[]) => {
                  console.log('Selection changed:', option, value);
                },
              })}

              {renderDropdown({
                label: '禁用状态',
                options: basicOptions,
                defaultValue: 'option1',
                disabled: true,
                onSelectionChange: (option: DropdownOption | DropdownOption[] | undefined, value?: string | string[]) => {
                  console.log('Selection changed:', option, value);
                },
              })}
            </div>
          </div>
        </div>

        {/* 多选 Dropdown 测试 */}
        <div className="test-group">
          <h3 className="test-group__title">多选 Dropdown</h3>
          <div className="test-group__content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {renderDropdown({
                label: '选择技能 (多选)',
                options: skillOptions,
                placeholder: '请选择技能...',
                multiSelect: true,
                value: dropdownValues.multiSelect as string[],
                onSelectionChange: (options: DropdownOption | DropdownOption[] | undefined, values?: string | string[]) => {
                  setDropdownValues(prev => ({ ...prev, multiSelect: values as string[] }));
                },
              })}

              {renderDropdown({
                label: '多选带清除',
                options: skillOptions,
                placeholder: '请选择技能...',
                multiSelect: true,
                clearable: true,
                defaultValue: ['react', 'vue'],
                onSelectionChange: (options: DropdownOption | DropdownOption[] | undefined, values?: string | string[]) => {
                  console.log('Multi-selection changed:', options, values);
                },
              })}
            </div>
          </div>
        </div>

        {/* 可搜索 Dropdown 测试 */}
        <div className="test-group">
          <h3 className="test-group__title">可搜索 Dropdown</h3>
          <div className="test-group__content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {renderDropdown({
                label: '选择国家 (可搜索)',
                options: countryOptions,
                placeholder: '搜索并选择国家...',
                searchable: true,
                clearable: true,
                value: dropdownValues.withSearch as string,
                onSelectionChange: (option, value) => {
                  setDropdownValues(prev => ({ ...prev, withSearch: value as string }));
                },
              })}

              {renderDropdown({
                label: '多选可搜索',
                options: countryOptions,
                placeholder: '搜索并选择多个国家...',
                multiSelect: true,
                searchable: true,
                clearable: true,
                onSelectionChange: (options, values) => {
                  console.log('Searchable multi-selection:', options, values);
                },
              })}
            </div>
          </div>
        </div>

        {/* 错误状态和必填 */}
        <div className="test-group">
          <h3 className="test-group__title">错误状态和验证</h3>
          <div className="test-group__content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {renderDropdown({
                label: '必填选项',
                options: basicOptions,
                placeholder: '此字段为必填项',
                required: true,
                error: !dropdownValues.withError,
                errorMessage: '请选择一个选项',
                value: dropdownValues.withError as string,
                onSelectionChange: (option, value) => {
                  setDropdownValues(prev => ({ ...prev, withError: value as string }));
                },
              })}

              {renderDropdown({
                label: '带错误消息',
                options: basicOptions,
                placeholder: '选择时会显示错误',
                error: true,
                errorMessage: '这是一个错误提示消息',
                onSelectionChange: (option, value) => {
                  console.log('Error state selection:', option, value);
                },
              })}
            </div>
          </div>
        </div>

        {/* 无标签和样式变体 */}
        <div className="test-group">
          <h3 className="test-group__title">样式变体</h3>
          <div className="test-group__content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {renderDropdown({
                options: basicOptions,
                placeholder: '无标签 Dropdown',
                onSelectionChange: (option, value) => {
                  console.log('No label selection:', option, value);
                },
              })}

              {renderDropdown({
                options: countryOptions.slice(0, 3),
                placeholder: '简短列表',
                clearable: true,
                onSelectionChange: (option, value) => {
                  console.log('Short list selection:', option, value);
                },
              })}

              {renderDropdown({
                options: [...Array(15)].map((_, i) => ({
                  key: `long-option-${i}`,
                  text: `很长的选项名称 ${i + 1} - 这是一个很长的文本用来测试文本截断效果`,
                  value: `long-${i}`,
                })),
                placeholder: '长文本选项测试',
                searchable: true,
                onSelectionChange: (option, value) => {
                  console.log('Long text selection:', option, value);
                },
              })}
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
         {renderAlertSection()}
         {renderPanelSection()}
         {renderInputSection()}
         {renderListSection()}
         {renderSpinnerSection()}
         {renderCardSection()}
         {renderDropdownSection()}
       </div>
    </div>
  );
};

export default TestPage; 