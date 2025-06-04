import { useEffect, useState } from "react"

export default () => {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })

    return windowWidth
}