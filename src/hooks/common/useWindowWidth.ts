import { useEffect, useState } from "react"

export default () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        // 设置初始值
        setWindowWidth(window.innerWidth)
        
        // 添加监听器
        window.addEventListener('resize', handleResize)
        
        // 清理监听器
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowWidth
}