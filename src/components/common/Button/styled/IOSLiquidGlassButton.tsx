import React from 'react'
import { LiquidGlass } from '@specy/liquid-glass-react'
import { ButtonProps } from '../../types'

const IOSLiquidGlassButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  icon,
  children,
  'aria-label': ariaLabel,
  style,
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  // 根据尺寸设置 padding
  const getPadding = () => {
    switch (size) {
      case 'small':
        return '8px 16px'
      case 'large':
        return '16px 24px'
      case 'medium':
      default:
        return '12px 20px'
    }
  }

  // 根据尺寸设置 cornerRadius
  const getCornerRadius = () => {
    switch (size) {
      case 'small':
        return 8
      case 'large':
        return 16
      case 'medium':
      default:
        return 12
    }
  }

  // 根据变体设置文字颜色
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-white font-medium'
      case 'destructive':
        return 'text-white font-medium'
      case 'secondary':
      default:
        return 'text-blue-600 font-medium'
    }
  }

  // 设置玻璃样式参数
  const glassStyle = {
    depth: 0.5,
    segments: 32,
    radius: getCornerRadius() / 100, // 转换为 0-1 范围
    roughness: 0.1,
    transmission: 1,
    reflectivity: 0.5,
    ior: 1.5,
    dispersion: 0.1,
    thickness: 0.5
  }

  return (
    <LiquidGlass
      glassStyle={glassStyle}
      style={`padding: ${getPadding()}; cursor: ${disabled ? 'not-allowed' : 'pointer'}; opacity: ${disabled ? '0.6' : '1'};`}
    >
      <span 
        className={`${getTextColor()} ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          ...style
        }}
        aria-label={ariaLabel}
        onClick={disabled ? undefined : handleClick}
      >
        {loading && (
          <svg 
            className="animate-spin" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
              style={{
                animation: 'spin 1s linear infinite'
              }}
            />
          </svg>
        )}
        {!loading && icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </span>
    </LiquidGlass>
  )
}

export default IOSLiquidGlassButton 