import { webLightTheme, webDarkTheme, FluentProvider } from '@fluentui/react-components'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import pubsub from 'pubsub-js'
import WindowsLayOut from './layouts/WindowsLayOut'
import MobileLayOut from './layouts/MaterialLayOut'
import TestPage from './testComponents/TestPage'
import getPlatform from './utils/getPlatform'


export default () => {
  const [theme, setTheme] = useState(webLightTheme)
  // MUI主题
  const [muiTheme, setMuiTheme] = useState(createTheme())
  // MUI的夜间模式配置
  const [isDark, setIsDark] = useState(false)
  const [currentTab, setCurrentTab] = useState('settings')
  const [platform, setPlatform] = useState('')
  const [showTestPage, setShowTestPage] = useState(false)

  useEffect(() => {
    // 初始化检测系统主题
    const initTheme = async (isNeedListen?: boolean) => {
      const systemTheme = await getCurrentWindow().theme();
      try {
        setIsDark(systemTheme === 'dark')
        setTheme(systemTheme === 'dark' ? webDarkTheme : webLightTheme)
        document.documentElement.setAttribute('aria-label', systemTheme === 'dark' ? 'dark' : 'light')
        setMuiTheme(createTheme({
          palette: {
            mode: systemTheme === 'dark' ? 'dark' : 'light'
          }
        }))
      } catch (e) {
        console.error('Failed to get system theme:', e)
      }

      if (isNeedListen) {
        await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
          setIsDark(theme === 'dark')
          setTheme(theme === 'dark' ? webDarkTheme : webLightTheme)
          setMuiTheme(createTheme({
            palette: {
              mode: theme === 'dark' ? 'dark' : 'light'
            }
          }))
        })
      }
    }

    initTheme(true)

    // 监听主题模式变化
    const onThemeModeChange = (_: string, data: string) => {
      if (data === '亮色') {
        setTheme(webLightTheme)
        setIsDark(false)
        document.documentElement.setAttribute('aria-label', 'light')
      } else if (data === '暗色') {
        setTheme(webDarkTheme)
        setIsDark(true)
        document.documentElement.setAttribute('aria-label', 'dark')
      }else{
        initTheme(false)
        document.documentElement.setAttribute('aria-label', 'auto')
      }
    }

    const token = pubsub.subscribe('theme-mode', onThemeModeChange)

    return () => {
      pubsub.unsubscribe(token)
    }
  }, [])

  // 导航栏选择
  const onNavTabSelect = (to: string) => {
    setCurrentTab(to)
  }

  useEffect(() => {
    // 初始化的一瞬间获取平台信息
    const handlePlatformChange = async () => {
      const platform = await getPlatform()
      console.log('platform', platform)
      setPlatform(platform)
    }
    handlePlatformChange()
  }, [])

  return (
    <div id="global-entry-hooks-provider" 
      className="w-full h-full"
      aria-label={isDark ? "dark" : "light"}>
        <FluentProvider
          theme={theme}
          aria-label={isDark ? "dark" : "light"}
        >
        <ThemeProvider theme={muiTheme}>
          {/* 添加测试页面切换按钮 */}
          <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
            <button
              onClick={() => setShowTestPage(!showTestPage)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #007AFF',
                background: showTestPage ? '#007AFF' : 'white',
                color: showTestPage ? 'white' : '#007AFF',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {showTestPage ? '返回应用' : '组件测试'}
            </button>
          </div>
          
          {/* 渲染内容 */}
          {showTestPage ? (
            <TestPage />
          ) : (
            /* 同时初始化MUI和Fluent UI */
            platform === 'windows' ?
            <WindowsLayOut onNavTabSelect={onNavTabSelect} currentTab={currentTab} /> :
            <MobileLayOut />
          )}
        </ThemeProvider>
        </FluentProvider>
    </div>
  )
}