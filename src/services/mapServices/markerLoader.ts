import type { Map } from "mapbox-gl"

import wpt from '../../assets/mapMarker/wpt.png'
import ownship from '../../assets/mapMarker/ownship.png'
import markerAtc from '../../assets/mapMarker/marker_atc.png'
import loadingSet from '../../configs/airplanes/loadingSet.json'

const imgSet = [
    {name: 'wpt', img: wpt},
    {name: 'ownship', img: ownship},
    {name: 'marker-atc', img: markerAtc},
]

const addSKYlineMarker = async (map: Map): Promise<void> => {
    return new Promise((res, _) => {
        let count = 0
        for (let i of imgSet) {
            if (map.hasImage(i.name)) continue
            map.loadImage(i.img, (_, img) => {
                if (!img) return
                map.addImage(i.name, img, {
                    'pixelRatio': 1,
                    'sdf': true
                })
                count++
                if (count === imgSet.length) {
                    res()
                }
            })
        }
    })
}

const addOnlineFlightsMarker = async (map: Map): Promise<void> => {
    return new Promise((res, _) => {
        let count = 0
        for (let i of loadingSet) {
            if (map.hasImage(i)) continue
            map.loadImage(`/airplanes/${i}-svg.png`, (_, img) => {
                if (!img) return
                map.addImage(i, img, {
                    'pixelRatio': 1,
                    'sdf': true
                })
                count++
                if (count === loadingSet.length) {
                    res()
                }
            })
        }
    })
}

export { addSKYlineMarker, addOnlineFlightsMarker }