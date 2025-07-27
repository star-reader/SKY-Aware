import React, { useState, useEffect } from 'react';
import getPlatform from '../utils/getPlatform';
import IOSCommonButton from '../components/common/Button/styled/IOSCommonButton';
import WindowsButton from '../components/common/Button/styled/WindowsButton';
import MaterialButton from '../components/common/Button/styled/MaterialButton';
import { ButtonProps } from '../components/common/types';
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

type PlatformStyle = 'ios-common' | 'ios-liquid' | 'windows' | 'material';

interface TestButtonProps extends ButtonProps {
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
      case 'ios-liquid':
        return <IOSCommonButton {...buttonProps} {...buttonStyle} />;
      case 'windows':
        return <WindowsButton {...buttonProps} {...buttonStyle} />;
      case 'material':
        return <MaterialButton {...buttonProps} {...buttonStyle} />;
      default:
        return <IOSCommonButton {...buttonProps} {...buttonStyle} />;
    }
  };

  const renderPlatformTabs = () => {
    const tabs = [
      { id: 'ios-common', label: 'iOS Common' },
      { id: 'ios-liquid', label: 'iOS Liquid Glass' },
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