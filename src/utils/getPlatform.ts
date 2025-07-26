import { platform } from '@tauri-apps/plugin-os'

// 定义支持的平台类型
export type PlatformType = 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'web'

/**
 * 获取当前运行平台
 * @returns {Promise<PlatformType>} 返回具体的平台类型
 */
export default async (): Promise<PlatformType> => {
    try {
        // 首先检查是否在 Tauri 环境中
        if (typeof window !== 'undefined' && window.__TAURI_OS_PLUGIN_INTERNALS__) {
            const tauriPlatform = await platform()
            
            // 将 Tauri 返回的平台名称映射到我们的类型
            switch (tauriPlatform) {
                case 'windows':
                    return 'windows'
                case 'macos':
                    return 'macos'
                case 'linux':
                    return 'linux'
                case 'android':
                    return 'android'
                case 'ios':
                    return 'ios'
                default:
                    console.warn('Unknown Tauri platform:', tauriPlatform)
                    return 'web' // fallback
            }
        }
        
        // 如果不在 Tauri 环境中，使用浏览器 API 检测
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent.toLowerCase()
            
            // 检测移动设备
            if (/android/.test(userAgent)) {
                return 'android'
            }
            
            if (/iphone|ipad|ipod/.test(userAgent) || 
                ('ontouchend' in document)) {
                return 'ios'
            }
            
            if (userAgent.includes('windows')) {
                return 'windows'
            }
            
            if (userAgent.includes('macintosh')) {
                return 'macos'
            }
            
            if (userAgent.includes('linux')) {
                return 'linux'
            }
            
            return 'web'
        }
        
        return 'web'
        
    } catch (error) {
        console.error('Error detecting platform:', error)
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent.toLowerCase()
            
            if (/android/.test(userAgent)) return 'android'
            if (/iphone|ipad|ipod/.test(userAgent)) return 'ios'
            if (/windows/.test(userAgent)) return 'windows'
            if (/macintosh/.test(userAgent)) return 'macos'
            if (/linux/.test(userAgent)) return 'linux'
        }
        
        return 'web'
    }
}

/**
 * 同步版本的平台检测（仅适用于浏览器环境）
 * @returns {PlatformType} 返回检测到的平台类型
 */
export const getPlatformSync = (): PlatformType => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return 'web'
    }
    
    const userAgent = navigator.userAgent.toLowerCase()
    
    // 检测移动设备
    if (/android/.test(userAgent)) {
        return 'android'
    }
    
    if (/iphone|ipad|ipod/.test(userAgent) || 
        ('ontouchend' in document)) {
        return 'ios'
    }
    
    // 检测桌面操作系统
    if (userAgent.includes('windows')) {
        return 'windows'
    }
    
    if (userAgent.includes('macintosh')) {
        return 'macos'
    }
    
    if (userAgent.includes('linux')) {
        return 'linux'
    }
    
    return 'web'
}

/**
 * 检查是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export const isMobile = (): boolean => {
    const platform = getPlatformSync()
    return platform === 'android' || platform === 'ios'
}

/**
 * 检查是否为桌面设备
 * @returns {boolean} 是否为桌面设备
 */
export const isDesktop = (): boolean => {
    const platform = getPlatformSync()
    return platform === 'windows' || platform === 'macos' || platform === 'linux'
}

/**
 * 检查是否在 Tauri 环境中运行
 * @returns {boolean} 是否在 Tauri 环境中
 */
export const isTauri = (): boolean => {
    return typeof window !== 'undefined' && 
           window.__TAURI_OS_PLUGIN_INTERNALS__ !== undefined
}