import { tinycolor } from "@ctrl/tinycolor"

interface UserCustomColorSchema {
    onlineFlight: {
        day: string,
        night: string
    }
}

const defaultColor: UserCustomColorSchema = {
    onlineFlight: {
        day: 'rgb(37,86,159)',
        night: 'rgb(176,224,230)'
    }
}

const getHSVobjectByString = (str: string) => {
    let rgbString = str.match(/\d+/g) as RegExpMatchArray
    let rgb = {
        r: Number(rgbString[0]),
        g: Number(rgbString[1]),
        b: Number(rgbString[2])
    }
    let hsv = tinycolor(rgb).toHsv()
    return hsv
}

export default () => {
    let userCustomColor: UserCustomColorSchema = defaultColor

    let pilotColorSchema = localStorage.getItem('pilotColorSchema')
    if (pilotColorSchema) {
        userCustomColor.onlineFlight = JSON.parse(pilotColorSchema)
    }

    return userCustomColor
}

export const getPilotDefaultColor = () => {
    let pilotColorSchema = localStorage.getItem('pilotColorSchema')
    if (pilotColorSchema) {
        let oriJson = JSON.parse(pilotColorSchema)
        let day = getHSVobjectByString(oriJson.day)
        let night = getHSVobjectByString(oriJson.night)
        return {
            day: day,
            night: night
        }
    }
    // return defaultColor.onlineFlight
    return {
        day: getHSVobjectByString(defaultColor.onlineFlight.day),
        night: getHSVobjectByString(defaultColor.onlineFlight.night)
    }
}