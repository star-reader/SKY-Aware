import React from 'react'
import { Button as FluentButton, Spinner } from '@fluentui/react-components'
import { ButtonProps } from '../../types'

const WindowsButton: React.FC<ButtonProps> = ({
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

  // 根据 Fluent UI 文档映射 appearance
  const getAppearance = () => {
    switch (variant) {
      case 'primary':
        return 'primary'
      case 'secondary':
        return 'secondary'
      case 'destructive':
        return 'primary' // 使用 primary 样式但后面会覆盖颜色
      default:
        return 'secondary'
    }
  }

  // 根据 Fluent UI 文档映射 size
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'small'
      case 'large':
        return 'large'
      case 'medium':
      default:
        return 'medium'
    }
  }

  // 构建 Fluent UI Button 的 props
  const fluentProps = {
    appearance: getAppearance(),
    size: getSize(),
    disabled: disabled || loading,
    onClick: handleClick,
    'aria-label': ariaLabel,
    className: className,
    style: {
      ...style,
      // 为 destructive 变体自定义颜色
      ...(variant === 'destructive' && {
        backgroundColor: '#d13438',
        borderColor: '#d13438',
        color: '#ffffff'
      })
    }
  }

  return (
    <FluentButton {...fluentProps}>
      {loading && <Spinner size="extra-small" style={{ marginRight: children ? '8px' : '0' }} />}
      {!loading && icon && <span style={{ marginRight: children ? '8px' : '0' }}>{icon}</span>}
      {children}
    </FluentButton>
  )
}

export default WindowsButton 