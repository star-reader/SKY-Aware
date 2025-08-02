import { useEffect, useState, memo } from "react"
import pubsub from 'pubsub-js'
import getPlatform, { PlatformType } from "../../utils/getPlatform"
import useWindowWidth from "../../hooks/common/useWindowWidth"
import constants from "../../configs/constants"
import WindowsCard from "./WindowsCard"
import CommonCard from "./CommonCard"
import useOnlineStore from "../../store/useOnlineStore"

// 把数据存到这里，各个组件去引
// 根据尺寸和平台选择不同的内容，如fluent card， 其他card；fluent card不需要考虑响应式；其他card考虑响应式
export default memo(() => {
    const [isShow, setIsShow] = useState(false)
    const [data, setData] = useState<OnlineFlight | null>(null)
    const [platform, setPlatform] = useState<PlatformType>('web')
    const windowWidth = useWindowWidth()

    const isMobileWidth = windowWidth <= constants.mobileMaxWidth

    useEffect(() => {
        getPlatform().then(setPlatform)
    }, [])
    
    useEffect(() => {
        const queryToken = pubsub.subscribe('query-online-pilot',(_, data: OnlineFlight) => {
            setIsShow(true)
            setData(data)
        })

        let fetchInterval: ReturnType<typeof setInterval> | null = null

        if (data) {
            const fetchInfo = () => {
                // @ts-ignore
                const onlineFlights: OnlineFlight[] = useOnlineStore.getState().onlineFlights
                const flight = onlineFlights.find(flight => 
                    flight.callsign === data.callsign && flight.session_id === data.session_id
                )
                if (flight && flight.cid) {
                    setData(flight)
                }
            }

            fetchInterval = setInterval(fetchInfo, 3000)
        }

        return () => {
            pubsub.unsubscribe(queryToken)
            if (fetchInterval) {
                clearInterval(fetchInterval)
            }
        }
    }, [data])

    const handleClose = () => {
        setIsShow(false)
        setData(null)
    }

    // 监听ESC键和自定义关闭事件
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isShow) {
                handleClose()
            }
        }

        const handleCustomClose = () => {
            handleClose()
        }

        if (isShow) {
            window.addEventListener('keydown', handleKeyDown)
            window.addEventListener('closeFlightCard', handleCustomClose)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('closeFlightCard', handleCustomClose)
        }
    }, [isShow])
    
    if (!isShow || !data) {
        return null
    }

    return (
        platform === 'windows' ? 
        // windows fluent ui card
        <WindowsCard flightData={data} /> : 
        // other card, props in window size
        <CommonCard
            flightData={data} 
            isMobileWidth={isMobileWidth} 
            platform={platform}
            onClose={handleClose}
        />
    )
})