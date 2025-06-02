import { webLightTheme, webDarkTheme, FluentProvider, makeStyles } from '@fluentui/react-components'
import WindowsLayOut from './layouts/windowsLayOut'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  darkRoot: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  }
})

export default () => {
  const styles = useStyles()
  const [theme, setTheme] = useState(webLightTheme)
  const [isDark, setIsDark] = useState(false)

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

  return (
    <FluentProvider 
      theme={theme} 
      className={isDark ? styles.darkRoot : styles.root}
    >
      <WindowsLayOut />
    </FluentProvider>
  )
}