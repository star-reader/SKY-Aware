import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import envs from '../../configs/envs'

export default () => {
    const mapRef = useRef<HTMLDivElement>(null)

    let map: mapboxgl.Map | null = null

    useEffect(() => {
        // 初始化加载，因为mapbox v3用webgl新版，所以别忘了写个界面来检测如果不支持退出
        // !todo 检测webgl是否支持

        mapboxgl.accessToken = envs.MAPBOX_TOKEN
        map = new mapboxgl.Map({
            container: mapRef.current as HTMLElement,
            style: 'mapbox://styles/mapbox/standard',
            center: [-74.5, 40],
            zoom: 9,
            config: {
                basemap: {
                    lightPreset: 'day',  // day-night
                    showPointOfInterestLabels: true,
                }
            }
        })

    }, [])
    
    return (
        <div className="fixed w-full h-full z-0">
            <div ref={mapRef} className="relative w-full h-full"></div>
        </div>
    )
}