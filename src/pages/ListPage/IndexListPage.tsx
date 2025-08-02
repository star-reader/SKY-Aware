import { useState, useEffect } from 'react';
import getPlatform, { PlatformType } from '../../utils/getPlatform'
import useOnlineStore from '../../store/useOnlineStore';
import WindowsListPage from './WindowsListPage';
import MaterialListPage from './MaterialListPage';
import IOSListPage from './IOSListPage'

export default () => {
    const [platform, setPlatform] = useState<PlatformType>('web')

    const [onlineFlights, setOnlineFlights] = useState<OnlineFlight[]>([])
    const [onlineControllers, setOnlineControllers] = useState<OnlineController[]>([])

    const [listLayoutType] = useState<'horizontal' | 'vertical'>('horizontal')  // horizontal, vertical

    useEffect(() => {
        getPlatform().then(setPlatform);
    }, [])

    useEffect(() => {
        const fetchOnlineInfo = () => {
            // @ts-ignore
            const { onlineFlights, onlineControllers }: 
            { onlineFlights: OnlineFlight[], onlineControllers: OnlineController[] } = useOnlineStore.getState()
            if (!onlineFlights || !onlineControllers) return
            setOnlineFlights(onlineFlights.sort(
                (a, b) => Date.parse(a.logon_time) - Date.parse(b.logon_time))
            )
            setOnlineControllers(onlineControllers.sort(
                (a, b) => Date.parse(a.logon_time) - Date.parse(b.logon_time))
            )
        }
        fetchOnlineInfo()
        setInterval(fetchOnlineInfo, 3000)
    })


    if (!platform) {
        return null
    }

    switch (platform) {
        case 'windows':
            return <WindowsListPage 
                onlineFlights={onlineFlights} 
                onlineControllers={onlineControllers} 
                listLayoutType={listLayoutType} 
            />
        case 'ios':
        case 'macos':
            return <IOSListPage 
                onlineFlights={onlineFlights} 
                onlineControllers={onlineControllers} 
                listLayoutType={listLayoutType} 
            />
        default:
            return <MaterialListPage
                onlineFlights={onlineFlights}
                onlineControllers={onlineControllers} 
                listLayoutType={listLayoutType} 
            />
    }
}