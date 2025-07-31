interface UserCustomColor {
    onlineFlight: {
        day: string,
        night: string
    }
}

const defaultColor: UserCustomColor = {
    onlineFlight: {
        day: '#25569f',
        night: '#B0E0E6'
    }
}

export default () => {
    let userCustomColor: UserCustomColor = defaultColor

    let pilotColroSchema = localStorage.getItem('pilotColroSchema')
    if (pilotColroSchema) {
        userCustomColor.onlineFlight = JSON.parse(pilotColroSchema)
    }

    return userCustomColor
}