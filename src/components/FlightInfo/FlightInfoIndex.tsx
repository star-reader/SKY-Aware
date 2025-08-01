import { useEffect, useState, memo } from "react"
import pubsub from 'pubsub-js'
import getPlatform, { PlatformType } from "../../utils/getPlatform"
import useWindowWidth from "../../hooks/common/useWindowWidth"
import constants from "../../configs/constants"
import WindowsCard from "./WindowsCard"
import CommonCard from "./CommonCard"

// 把数据存到这里，各个组件去引
// 根据尺寸和平台选择不同的内容，如fluent card， 其他card；fluent card不需要考虑响应式；其他card考虑响应式
export default memo(() => {
    const [isShow, setIsShow] = useState(false)
    const [data, setData] = useState<OnlineFlight | null>(null)
    const [platform, setPlatform] = useState<PlatformType>('web')
    const windowWidth = useWindowWidth()

    useEffect(() => {
        getPlatform().then(setPlatform);
    }, []);
    
    useEffect(() => {
        pubsub.subscribe('query-online-pilot',(_, data: OnlineFlight) => {
            setIsShow(true)
            setData(data)
        })
    }, [])

    return (
        isShow && data && (
            platform === 'windows' ? 
            // windows fluent ui card
            <WindowsCard flightData={data} /> : 
            // other card, props in window size
            <CommonCard flightData={data} 
                isMobileWidth={windowWidth <= constants.mobileMaxWidth} 
            />
        )
            
    )
})