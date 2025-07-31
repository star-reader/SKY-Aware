interface UserCustomColorSchema {
    onlineFlight: {
        day: string,
        night: string
    }
}

const defaultColor: UserCustomColorSchema = {
    onlineFlight: {
        day: '#25569f',
        night: '#B0E0E6'
    }
}

export default () => {
    let userCustomColor: UserCustomColorSchema = defaultColor

    let pilotColorSchema = localStorage.getItem('pilotColorSchema')
    if (pilotColorSchema) {
        userCustomColor.onlineFlight = JSON.parse(pilotColorSchema)
    }

    return userCustomColor
}