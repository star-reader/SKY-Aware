import React, { useState, createContext, useContext, useEffect } from 'react'
import getPlatform, { PlatformType } from '../utils/getPlatform'
import { PlatformStyle } from '../components/common/types'
import PubSub from 'pubsub-js'

// 导入平台特定的按钮组件
import IOSCommonButton from '../components/common/Button/styled/IOSCommonButton'
import IOSLiquidGlassButton from '../components/common/Button/styled/IOSLiquidGlassButton'
import WindowsButton from '../components/common/Button/styled/WindowsButton'
import PrimeReactButton from '../components/common/Button/styled/PrimeReactButton'

import './TestPage.scss'

// 创建强制样式上下文
const ForceStyleContext = createContext<{
  forceStyle?: PlatformStyle
}>({})

// 根据平台获取默认样式
const getDefaultStyleForPlatform = (platform: PlatformType, enableLiquidGlass: boolean = true): PlatformStyle => {
  switch (platform) {
    case 'ios':
    case 'macos':
      return enableLiquidGlass ? 'ios-liquid-glass' : 'ios-common'
    case 'windows':
      return 'windows'
    case 'android':
    case 'web':
    case 'linux':
    default:
      return 'web-android'
  }
}

// 包装 Button 组件以接受强制样式
const TestButton: React.FC<any> = (props) => {
  const { forceStyle } = useContext(ForceStyleContext)
  const [platform, setPlatform] = useState<PlatformType>('web')
  
  useEffect(() => {
    const detectPlatform = async () => {
      const detectedPlatform = await getPlatform()
      setPlatform(detectedPlatform)
    }
    detectPlatform()
  }, [])

  const currentStyle = forceStyle || getDefaultStyleForPlatform(platform)

  // 根据样式选择对应的按钮组件
  switch (currentStyle) {
    case 'ios-common':
      return <IOSCommonButton {...props} />
    case 'ios-liquid-glass':
      return <IOSLiquidGlassButton {...props} />
    case 'windows':
      return <WindowsButton {...props} />
    case 'web-android':
    default:
      return <PrimeReactButton {...props} />
  }
}

// 主题切换器组件
const ThemeSwitcher: React.FC<{
  darkMode: boolean
  onToggle: (dark: boolean) => void
}> = ({ darkMode, onToggle }) => {
  return (
    <div className="theme-switcher">
      <button
        className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
        onClick={() => onToggle(!darkMode)}
        aria-label={darkMode ? '切换到日间模式' : '切换到夜间模式'}
      >
        <span className="theme-icon">
          {darkMode ? (
            // 太阳图标
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          ) : (
            // 月亮图标
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
            </svg>
          )}
        </span>
        <span className="theme-text">
          {darkMode ? '日间模式' : '夜间模式'}
        </span>
      </button>
    </div>
  )
}

// 平台样式选择器组件
const PlatformSelector: React.FC<{
  currentStyle: string
  onStyleChange: (style: string) => void
}> = ({ currentStyle, onStyleChange }) => {
  const styles = [
    { value: '', label: '自动检测' },
    { value: 'ios-common', label: 'iOS 通用' },
    { value: 'ios-liquid-glass', label: 'iOS 液态玻璃' },
    { value: 'windows', label: 'Windows' },
    { value: 'web-android', label: 'Web/Android' }
  ]

  return (
    <div className="platform-selector">
      <h3>选择平台样式:</h3>
      <div className="platform-tabs">
        {styles.map((style) => (
          <button
            key={style.value}
            className={`platform-tab ${currentStyle === style.value ? 'active' : ''}`}
            onClick={() => onStyleChange(style.value)}
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// 按钮测试组件
const ButtonTests: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleLoadingTest = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="test-section">
      <h2>按钮组件测试</h2>
      
      <div className="test-group">
        <h3>基本变体</h3>
        <div className="button-row">
          <TestButton variant="primary" onClick={() => alert('Primary 按钮点击')}>
            Primary 按钮
          </TestButton>
          <TestButton variant="secondary" onClick={() => alert('Secondary 按钮点击')}>
            Secondary 按钮
          </TestButton>
          <TestButton variant="destructive" onClick={() => alert('Destructive 按钮点击')}>
            Destructive 按钮
          </TestButton>
        </div>
      </div>

      <div className="test-group">
        <h3>不同尺寸</h3>
        <div className="button-row">
          <TestButton size="small" variant="primary">
            小按钮
          </TestButton>
          <TestButton size="medium" variant="primary">
            中等按钮
          </TestButton>
          <TestButton size="large" variant="primary">
            大按钮
          </TestButton>
        </div>
      </div>

      <div className="test-group">
        <h3>状态测试</h3>
        <div className="button-row">
          <TestButton disabled>
            禁用按钮
          </TestButton>
          <TestButton loading={loading} onClick={handleLoadingTest}>
            {loading ? '加载中...' : '点击测试加载'}
          </TestButton>
        </div>
      </div>

      <div className="test-group">
        <h3>带图标的按钮</h3>
        <div className="button-row">
          <TestButton 
            variant="primary" 
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            }
          >
            添加
          </TestButton>
          <TestButton 
            variant="secondary" 
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            }
          >
            编辑
          </TestButton>
        </div>
      </div>
    </div>
  )
}

const TestPage: React.FC = () => {
  const [forceStyle, setForceStyle] = useState<string>('')
  const [platform, setPlatform] = useState<PlatformType>('web')
  const [darkMode, setDarkMode] = useState(false)
  
  // 检测平台
  useEffect(() => {
    const detectPlatform = async () => {
      const detectedPlatform = await getPlatform()
      setPlatform(detectedPlatform)
    }
    detectPlatform()
  }, [])

  // 获取当前主题状态并监听变化
  useEffect(() => {
    const updateThemeState = () => {
      const currentTheme = document.documentElement.getAttribute('aria-label')
      setDarkMode(currentTheme === 'dark')
    }

    // 初始设置
    updateThemeState()

    // 监听主题变化事件
    const themeToken = PubSub.subscribe('theme-mode', () => {
      // 稍微延迟获取，确保 DOM 已更新
      setTimeout(updateThemeState, 50)
    })

    // 清理订阅
    return () => {
      PubSub.unsubscribe(themeToken)
    }
  }, [])

  // 获取当前使用的样式
  const currentStyle = forceStyle || getDefaultStyleForPlatform(platform)
  const displayStyle = forceStyle ? forceStyle : `${currentStyle} (自动)`

  // 处理主题切换 - 使用现有的 pubsub 系统
  const handleThemeToggle = (isDark: boolean) => {
    // 使用现有的主题切换系统
    PubSub.publish('theme-mode', isDark ? 'dark' : 'light')
  }

  return (
    <ForceStyleContext.Provider value={{ forceStyle: forceStyle as any }}>
      <div className="test-page">
        <header className="test-header">
          <div className="header-top">
            <h1>多平台组件测试页面</h1>
            <ThemeSwitcher darkMode={darkMode} onToggle={handleThemeToggle} />
          </div>
          <div className="header-info">
            <p>检测到的平台: {platform}</p>
            <p>当前使用的样式: {displayStyle}</p>
            <p>是否使用液态玻璃: {currentStyle === 'ios-liquid-glass' ? '是' : '否'}</p>
            <p>当前主题: {darkMode ? '夜间模式' : '日间模式'}</p>
            <p>主题来源: 系统 aria-label = "{document.documentElement.getAttribute('aria-label')}"</p>
          </div>
        </header>

        <PlatformSelector 
          currentStyle={forceStyle}
          onStyleChange={setForceStyle}
        />

        <main className="test-content">
          <ButtonTests />
        </main>
      </div>
    </ForceStyleContext.Provider>
  )
}

export default TestPage 