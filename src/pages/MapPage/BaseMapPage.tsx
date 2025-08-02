import { useEffect, useRef, memo } from 'react'
import mapboxgl from 'mapbox-gl'
import type { GeoJSON, Geometry, GeoJsonProperties, Feature } from 'geojson'
import pubsub from 'pubsub-js'
import envs from '../../configs/envs'
import useWindowWidth from '../../hooks/common/useWindowWidth'
import constants from '../../configs/constants'
import useCurrentTheme from '../../hooks/common/useCurrentTheme'
import { addOnlineFlightsMarker, addSKYlineMarker } from '../../services/mapServices/markerLoader'
import matchSet from '../../configs/airplanes/matchSet.json'
import useOnlineStore from '../../store/useOnlineStore'
import useGetColor from '../../hooks/map/useGetColor'
import useMouseEvent from '../../hooks/common/useMouseEvent'

export default memo(({ platform }: { platform: string | undefined }) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const windowWidth = useWindowWidth()
    const currentTheme = useCurrentTheme()
    let map: mapboxgl.Map | null = null
    let isFirstLoad = true

    const generatedStyle = {
        //'width': platform === 'windows' ? 'calc(100vw + 180px)' : windowWidth > constants.mobileMaxWidth ? 'calc(100vw + 180px)' : '100vw',
        'width': platform === 'windows' ? '' : windowWidth > constants.mobileMaxWidth ? '' : '',
        // 这里left的问题和Fluent UI也有关，在下面有更详细的说明
        // 'left': 0
    }

    const getPilotIcon = (_type: string | undefined) => {
        if (!_type) return 'default'
        if (_type.indexOf('CON') != -1){
            return 'CONC'
        }
        let typeLength = _type.split('/')
        let type = typeLength[0]
        if (typeLength.length === 2){
            type = typeLength[0].length === 1 ? typeLength[1] : typeLength[0]
        }else if (typeLength.length === 3){
            type === typeLength[1]
        }
        for (let item of matchSet) {
            if (item.callsign === type) {
                return item.src
            }
        }
        return 'default'
    }

    useEffect(() => {
        // 初始化加载，因为mapbox v3用webgl新版，所以别忘了写个界面来检测如果不支持退出
        // !todo 检测webgl是否支持

        const initMap = () => {
            mapboxgl.accessToken = envs.MAPBOX_TOKEN
            map = new mapboxgl.Map({
                container: mapRef.current as HTMLElement,
                style: 'mapbox://styles/mapbox/standard',
                center: [116.4074, 39.9042],
                zoom: 4,
                config: {
                    basemap: {
                        lightPreset: currentTheme === 'light' ? 'day' : 'night',  // day-night
                        showPointOfInterestLabels: false,
                    }
                }
            })
            // addMapControls()

            map.setMaxZoom(20)
            map.addControl(new mapboxgl.NavigationControl({
                showCompass: true,
                visualizePitch: true
            }), 'top-right')
            map.addControl(new mapboxgl.ScaleControl({
                unit: 'metric'
            }), 'bottom-right')

            const zoom: string | null = localStorage.getItem('map-zoom')
            const center: string | null = localStorage.getItem('map-center')
            if (zoom) {
                map.setZoom(parseFloat(zoom))
            } else {
                localStorage.setItem('map-zoom', map.getZoom().toString())
            }
            if (center) {
                let lng: number = parseFloat(center.split('LngLat(')[1].split(',')[0].trim())
                let lat: number = parseFloat(center.split(',')[1].split(')')[0].trim())
                map.setCenter([lng, lat])
            } else {
                localStorage.setItem('map-center', map.getCenter().toString())
            }

            bindEventListeners()
        }

        const bindEventListeners = () => {
            if (!map) return
            map.on('zoomend', () => {
                if (!map) return
                localStorage.setItem('map-zoom', map.getZoom().toString())
                localStorage.setItem('map-center', map.getCenter().toString())
            })
            map.on('dragend', () => {
                if (!map) return
                localStorage.setItem('map-center', map.getCenter().toString())
            })
            map.once('style.load', async () => {
                if (!map) return
                if (isFirstLoad) {
                    isFirstLoad = false
                    await addOnlineFlightsMarker(map)
                    await addSKYlineMarker(map)
                    map.resize()
                    drawOnlineFlights()
                    setInterval(() => {
                        drawOnlineFlights()
                    }, 3000)

                    useMouseEvent(map)
                }
                // drawOnlineFlights()
            })
        }

        // 绘制在线飞行图标
        const drawOnlineFlights = () => {
            // @ts-ignore
            const onlineFlights: OnlineFlight[] = useOnlineStore.getState().onlineFlights

            const geojsonData: GeoJSON<Geometry, GeoJsonProperties> = {
                type: 'FeatureCollection',
                features: []
            }

            if (!onlineFlights || onlineFlights.length === 0) return

            let userColor = useGetColor().onlineFlight

            for (let flight of onlineFlights) {
                const isEmergency = [7700, 7600, 7500].includes(flight.transponder)
                const color = isEmergency ? '#DC143C' : useCurrentTheme() === 'light' ? userColor.day : userColor.night

                const feature: Feature<Geometry, GeoJsonProperties> = {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [flight.longitude, flight.latitude]
                    },
                    properties: {
                        ...flight,
                        icon: getPilotIcon(flight.flight_plan?.aircraft),
                        color,
                        isEmergency
                    }
                }
                geojsonData.features.push(feature)
            }

            if (!map) return

            if (map.getSource('online-flights')) {
                // @ts-ignore
                map.getSource('online-flights')?.setData(geojsonData)
            } else {
                map.addSource('online-flights', {
                    type: 'geojson',
                    data: geojsonData
                })
                const layer: mapboxgl.LayerSpecification = {
                    id:'online-flights',
                    type:'symbol',
                    source:'online-flights',
                    layout:{
                        "icon-anchor":'center',
                        "icon-image": ['get', 'icon'],
                        "icon-rotate": ['get', 'heading'],
                        "icon-pitch-alignment": "map",
                        "icon-rotation-alignment": "map",
                        'icon-ignore-placement':true,
                        'icon-size': [
                            'interpolate',
                            ['exponential', 0.5],
                            ['zoom'],
                            2,
                            0.06,
                            4,
                            0.09,
                            6.5,
                            0.134,
                            7,
                            0.146,
                            8,
                            0.167,
                            10,
                            0.180,
                            12,
                            0.188,
                            13,
                            0.190,
                            14,
                            0.202,
                            15,
                            0.238,
                            15.5,
                            0.252,
                            16,
                            0.254,
                            16.5,
                            0.26,
                            17,
                            0.3,
                            17.4,
                            0.33
                        ],
                        'icon-allow-overlap': true,
                        "text-field":['get','callsign'],
                        "text-variable-anchor": [
                            "top",
                            "bottom",
                            "top-left",
                            "top-right",
                            "left",
                            "right",
                            "bottom-left",
                            "bottom",
                            "bottom-right"
                        ],
                        'text-size':[
                            'interpolate',
                            ['exponential', 0.5],
                            ['zoom'],
                            2,
                            10,
                            5,
                            11,
                            8,
                            12
                        ],
                        'text-offset':[1.2, 1.2],
                        'text-allow-overlap': true,
                        'text-pitch-alignment':"viewport",
                        'text-rotation-alignment':'viewport'
                    },
                    paint:{
                        "icon-color":[
                            'case',
                            ['==',['get','emergency'],'true'],
                            'red',
                            useCurrentTheme() === 'light' ? userColor.day : userColor.night
                        ],
                        'text-color': ['get','color'],
                        'text-halo-width':0,
                        'text-halo-color':'white'
                    }
                }
                map.addLayer(layer)
            }
        }

        initMap()

    }, [])

    useEffect(() => {
        if (!mapRef.current || !map) return
        
        const resizeObserver = new ResizeObserver(() => {
            if (map) {
                map.resize();
            }
        });
        
        resizeObserver.observe(mapRef.current)
        
        return () => {
            resizeObserver.disconnect()
        }
    }, [map])

    useEffect(() => {
        pubsub.subscribe('theme-mode', (_, data) => {
            if (map) {
                map.setConfigProperty('basemap', 'lightPreset', 
                    (data === 'light' || data === '亮色') ? 'day' : 'night'
                )
            }
        })

        pubsub.subscribe('navbar-collapsed', () => {
            if (!map) return
            map.resize()
        })

        pubsub.subscribe('current-tab', (_, data) => {
            if (map && data === '地图') {
                map.resize()
            }
        })

        // 主题切换与用户自定义颜色切换

        const updateColor = () => {
            if (map) {
                if (map.getLayer('online-flights')) {
                    let userColor = useGetColor().onlineFlight
                    map.setPaintProperty('online-flights', 'text-color', useCurrentTheme() === 'light' ? userColor.day : userColor.night)
                    map.setPaintProperty('online-flights', 'icon-color', useCurrentTheme() === 'light' ? userColor.day : userColor.night)
                }
            }
        }

        pubsub.subscribe('theme-mode', updateColor)
        pubsub.subscribe('pilot-color-schema', updateColor)  // 这个是用户在设置中切换自定义颜色，进行更新

    }, [])
    
    return (
        // generatedStyle 是根据平台和窗口宽度计算的样式，用于控制地图的宽度，在桌面端达到左侧导航栏半透明高斯模糊的效果
        // 但因为Windows Fluent UI透明度bug的问题，所以暂时弃用
        // 这个弃用只是暂时的，所以使用width再次覆盖，后续透明度系统修好后可以直接恢复
        <div className="relative w-full h-full z-0" style={{...generatedStyle, zIndex: 0}}>
            <div ref={mapRef} className="relative w-full h-full"></div>
        </div>
    )
})