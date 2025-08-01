import { Map } from "mapbox-gl"
import pubsub from 'pubsub-js'

export default (map: Map) => {
    if (!map) return

    const mouseOverableLayers = [
        'online-flights'
    ]

    const queryableLayers = [
        'online-flights'
    ]

    for (const layer of mouseOverableLayers) {
        map.on('mousemove', layer, () => {
            // const features = map.queryRenderedFeatures(e.point, {
            //     layers: [layer]
            // })
            map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', layer, () => {
            map.getCanvas().style.cursor = ''
        })
    }

    for (const layer of queryableLayers) {
        map.on('click', layer, (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: [layer]
            })
            let data = features[0].properties
            if (!data || !data.flight_plan) return
            data.flight_plan = JSON.parse(data.flight_plan as unknown as string)
            pubsub.publish('query-online-pilot', data)
        })
    }

}