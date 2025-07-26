import React, { useState, useEffect } from 'react'
import { ButtonProps } from '../types'
import getPlatform, { PlatformType } from '../../../utils/getPlatform'

// 平台特定组件
import IOSCommonButton from './styled/IOSCommonButton.tsx'
import IOSLiquidGlassButton from './styled/IOSLiquidGlassButton.tsx'
import WindowsButton from './styled/WindowsButton.tsx'
import PrimeReactButton from './styled/PrimeReactButton.tsx'

// 根据平台获取默认样式
const getStyleForPlatform = (platform: PlatformType): string => {
  switch (platform) {
    case 'ios':
    case 'macos':
      return 'ios-liquid-glass' // 默认使用液态玻璃效果
    case 'windows':
      return 'windows'
    case 'android':
    case 'web':
    case 'linux':
    default:
      return 'web-android'
  }
}

/**
 * 通用按钮组件
 * 根据当前平台自动选择合适的样式实现
 */
const Button: React.FC<ButtonProps> = (props) => {
  const [style, setStyle] = useState<string>('web-android')

  useEffect(() => {
    const detectPlatform = async () => {
      const platform = await getPlatform()
      setStyle(getStyleForPlatform(platform))
    }
    detectPlatform()
  }, [])

  switch (style) {
    case 'ios-common':
      return <IOSCommonButton {...props} />
    case 'ios-liquid-glass':
      return <IOSLiquidGlassButton {...props} />
    case 'windows':
      return <WindowsButton {...props} />
    case 'web-android':
    default:
      return <PrimeReactButton {...props} />
  }
}

export default Button 