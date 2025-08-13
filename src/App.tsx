import { webLightTheme, webDarkTheme, FluentProvider } from '@fluentui/react-components'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import pubsub from 'pubsub-js'
import getPlatform from './utils/getPlatform'
import AppLayOut from './layouts/AppLayOut'
import endpoints from './configs/apis/endpoints'
import useGraphqlStore from './store/useGraphqlStore'
import useOnlineStore from './store/useOnlineStore';
import graphql from './configs/apis/graphql';
import skyAwareDB from './services/storageServices/indexedDB'


export default () => {
  const [theme, setTheme] = useState(webLightTheme)
  // MUI主题
  const [muiTheme, setMuiTheme] = useState(createTheme())
  // MUI的夜间模式配置
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 初始化检测系统主题
    const initTheme = async (isNeedListen?: boolean) => {
      try {
        const systemTheme = window['__TAURI_OS_PLUGIN_INTERNALS__'] ?  await getCurrentWindow().theme() : 'light';
        setIsDark(systemTheme === 'dark')
        setTheme(systemTheme === 'dark' ? webDarkTheme : webLightTheme)
        document.documentElement.setAttribute('aria-label', systemTheme === 'dark' ? 'dark' : 'light')
        document.documentElement.setAttribute(
          'data-prefers-color-scheme',
          systemTheme === 'dark' ? 'dark' : 'light'
        )
        setMuiTheme(createTheme({
          palette: {
            mode: systemTheme === 'dark' ? 'dark' : 'light'
          }
        }))
        pubsub.publish('theme-mode', systemTheme === 'dark' ? 'dark' : 'light')
      } catch (e) {
        console.log('Failed to get system theme:')
      }

      try {
        if (isNeedListen && window['__TAURI_OS_PLUGIN_INTERNALS__']) {
          await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
            setIsDark(theme === 'dark')
            setTheme(theme === 'dark' ? webDarkTheme : webLightTheme)
            document.documentElement.setAttribute(
              'data-prefers-color-scheme',
              theme === 'dark' ? 'dark' : 'light'
            )
            setMuiTheme(createTheme({
              palette: {
                mode: theme === 'dark' ? 'dark' : 'light'
              }
            }))
          })
        }
      } catch (error) {
        console.log('Failed to listen theme change:')
      }
    }

    initTheme(true)

    // 监听主题模式变化
    const onThemeModeChange = (_: string, data: string) => {
      if (data === '亮色' || data === 'light') {
        setTheme(webLightTheme)
        setIsDark(false)
        document.documentElement.setAttribute('aria-label', 'light')
        document.documentElement.setAttribute(
          'data-prefers-color-scheme',
          'light'
        )
        setMuiTheme(createTheme({
          palette: {
            mode: 'light'
          }
        }))
      } else if (data === '暗色' || data === 'dark') {
        setTheme(webDarkTheme)
        setIsDark(true)
        document.documentElement.setAttribute('aria-label', 'dark')
        document.documentElement.setAttribute(
          'data-prefers-color-scheme',
          'dark'
        )
        setMuiTheme(createTheme({
          palette: {
            mode: 'dark'
          }
        }))
      } else {
        initTheme(false)
        document.documentElement.setAttribute('aria-label', 'auto')
        setMuiTheme(createTheme({
          palette: {
            mode: 'light'
          }
        }))
      }
    }

    const token = pubsub.subscribe('theme-mode', onThemeModeChange)

    return () => {
      pubsub.unsubscribe(token)
    }
  }, [])


  useEffect(() => {
    // 初始化的一瞬间获取平台信息
    const handlePlatformChange = async () => {
      const platform = await getPlatform()
      console.log('platform', platform)
      // setPlatform(platform)
    }
    handlePlatformChange()


    const intervalGetOnlineFlights = () => {
        // @ts-ignore
        const client = useGraphqlStore.getState().client as ApolloClient<NormalizedCacheObject>
        const fetchPilotData = async () => {
            const { data } = await client.query({
                query: graphql().getOnlineFlights,
            })
            useOnlineStore.setState({ onlineFlights: data.onlineFlights })
        }

        const fetchControllerData = async () => {
            const { data } = await client.query({
                query: graphql().getOnlineControllers,
            })
            useOnlineStore.setState({ onlineControllers: data.onlineControllers })
        }

        fetchPilotData()
        setInterval(fetchPilotData, 6000)
        fetchControllerData()
        setInterval(fetchControllerData, 30000)
    }

    const initGraphql = () => {
     // graphql配置
      let client = new ApolloClient({
        uri: endpoints.graphql,
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
          },
          query: {
            fetchPolicy: 'no-cache',
          },
        },
      })
      useGraphqlStore.setState({ client: client })

      intervalGetOnlineFlights()
    }
    initGraphql()

  }, [])

  // db相关effect
  useEffect(() => {
    const initDB = async () => {
      await skyAwareDB.init()
      // 测试一下行不行
      // await skyAwareDB.setAirlinesData([
      //     { icao: 'CCA', name: 'Air China' },
      //     { icao: 'CSN', name: 'China Southern Airlines' }
      // ], '1.0.0')
      // 行👍！
    }
    initDB()

    
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
            {/* 同时初始化MUI和Fluent UI */}
            {/* {platform === 'windows' ? */}
              {/* <WindowsLayOut onNavTabSelect={onNavTabSelect} currentTab={currentTab} /> */}
              <AppLayOut />
            {/* <MobileLayOut /> */}
            {/* } */}
        </ThemeProvider>
        </FluentProvider>
    </div>
  )
}