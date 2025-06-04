import { webLightTheme, webDarkTheme, FluentProvider } from '@fluentui/react-components'
import WindowsLayOut from './layouts/windowsLayOut'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'

import pubsub from 'pubsub-js'


export default () => {
  const [theme, setTheme] = useState(webLightTheme)
  const [isDark, setIsDark] = useState(false)
  const [currentTab, setCurrentTab] = useState('settings')

  useEffect(() => {
    // 初始化检测系统主题
    const initTheme = async () => {
      const systemTheme = await getCurrentWindow().theme();
      try {
        setIsDark(systemTheme === 'dark')
        setTheme(systemTheme === 'dark' ? webDarkTheme : webLightTheme)
      } catch (e) {
        console.error('Failed to get system theme:', e)
      }

      await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
        setIsDark(theme === 'dark')
        setTheme(theme === 'dark' ? webDarkTheme : webLightTheme)
      })
    }

    initTheme()
  }, [])

  useEffect(() => {
    pubsub.subscribe('theme-mode', onThemeModeChange)
  }, [])

  const onNavTabSelect = (to: string) => {
    setCurrentTab(to)
  }

  const onThemeModeChange = (_: string, data: string) => {
    if (data === '亮色') {
      setTheme(webLightTheme)
      setIsDark(false)
    } else if (data === '暗色') {
      setTheme(webDarkTheme)
      setIsDark(true)
    }
  }

  return (
    <FluentProvider 
      theme={theme} 
      aria-label={isDark ? "dark" : "light"}
    >
      <WindowsLayOut onNavTabSelect={onNavTabSelect} currentTab={currentTab} />
    </FluentProvider>
  )
}