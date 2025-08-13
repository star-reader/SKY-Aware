import { platform } from '@tauri-apps/plugin-os'
import { getVersion } from '@tauri-apps/api/app'

// 定义支持的平台类型
export type PlatformType = 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'web'

/**
 * 检查是否在 Tauri 环境中运行
 * @returns {Promise<boolean>} 是否在 Tauri 环境中
 */
const checkTauriEnvironment = async (): Promise<boolean> => {
    try {
        await getVersion()
        return true
    } catch {
        return false
    }
}

/**
 * 获取当前运行平台
 * @returns {Promise<PlatformType>} 返回具体的平台类型
 */
export default async (): Promise<PlatformType> => {
    // 首先检查本地调试设置
    const _localDebugPlatform = localStorage.getItem('_lDbg')
    if (_localDebugPlatform) {
        return _localDebugPlatform as PlatformType
    }

    try {
        // 检查是否在 Tauri 环境中
        const isTauriEnv = await checkTauriEnvironment()
        if (isTauriEnv) {
            try {
                const tauriPlatform = platform()
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
                        return 'web'
                }
            } catch (platformError) {
                return 'web'
            }
        }
    
        return 'web'
        
    } catch (error) {
        return 'web'
    }
}

/**
 * 检查是否在 Tauri 环境中运行
 * @returns {boolean} 是否在 Tauri 环境中
 */
export const isTauri = async (): Promise<boolean> => {
    return typeof window !== 'undefined' && await checkTauriEnvironment()
}