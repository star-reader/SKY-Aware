import { platform } from '@tauri-apps/plugin-os'

// 定义支持的平台类型
export type PlatformType = 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'web'

/**
 * 获取当前运行平台
 * @returns {Promise<PlatformType>} 返回具体的平台类型
 */
export default async (): Promise<PlatformType> => {
    // return 'macos'
    let _localDebugPlatform = localStorage.getItem('_lDbg')
    if (_localDebugPlatform) {
        if (_localDebugPlatform === 'ios' || _localDebugPlatform === 'macos')
        return _localDebugPlatform as PlatformType
    }
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
        
        // 如果不在 Tauri 环境中，返回Web
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            return 'web'
        }
        
        return 'web'
        
    } catch (error) {
        console.error('Error detecting platform:', error)        
        return 'web'
    }
}

/**
 * 检查是否在 Tauri 环境中运行
 * @returns {boolean} 是否在 Tauri 环境中
 */
export const isTauri = (): boolean => {
    return typeof window !== 'undefined' && 
           window.__TAURI_OS_PLUGIN_INTERNALS__ !== undefined
}