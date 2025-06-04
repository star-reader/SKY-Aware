import { webLightTheme, webDarkTheme, FluentProvider } from '@fluentui/react-components'
import WindowsLayOut from './layouts/windowsLayOut'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'


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

  const onNavTabSelect = (to: string) => {
    setCurrentTab(to)
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