import { webLightTheme, webDarkTheme, FluentProvider } from '@fluentui/react-components'
import WindowsLayOut from './layouts/windowsLayOut'
import MobileLayOut from './layouts/MobileLayOut'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'

import pubsub from 'pubsub-js'
import getPlatform from './utils/getPlatform'


export default () => {
  const [theme, setTheme] = useState(webLightTheme)
  const [isDark, setIsDark] = useState(false)
  const [currentTab, setCurrentTab] = useState('settings')
  const [platform, setPlatform] = useState('')

  useEffect(() => {
    // 初始化检测系统主题
    const initTheme = async (isNeedListen?: boolean) => {
      const systemTheme = await getCurrentWindow().theme();
      try {
        setIsDark(systemTheme === 'dark')
        setTheme(systemTheme === 'dark' ? webDarkTheme : webLightTheme)
      } catch (e) {
        console.error('Failed to get system theme:', e)
      }

      if (isNeedListen) {
        await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
          setIsDark(theme === 'dark')
          setTheme(theme === 'dark' ? webDarkTheme : webLightTheme)
        })
      }
    }

    initTheme(true)

    // 监听主题模式变化
    const onThemeModeChange = (_: string, data: string) => {
      if (data === '亮色') {
        setTheme(webLightTheme)
        setIsDark(false)
      } else if (data === '暗色') {
        setTheme(webDarkTheme)
        setIsDark(true)
      }else{
        initTheme(false)
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
      setPlatform(platform)
    }
    handlePlatformChange()
  }, [])

  return (
    <FluentProvider 
      theme={theme} 
      aria-label={isDark ? "dark" : "light"}
    >
      { platform === 'android' ? 
        <MobileLayOut /> : 
        <WindowsLayOut onNavTabSelect={onNavTabSelect} currentTab={currentTab} />}
    </FluentProvider>
  )
}