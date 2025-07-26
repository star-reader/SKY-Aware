import React from 'react'
import { Button as PrimeButton } from 'primereact/button'
import { ButtonProps } from '../../types'

const PrimeReactButton: React.FC<ButtonProps> = ({
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

  // 根据 PrimeReact 文档映射 severity
  const getSeverity = () => {
    switch (variant) {
      case 'primary':
        return undefined // 默认为 primary
      case 'secondary':
        return 'secondary'
      case 'destructive':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  // 根据 PrimeReact 文档映射 size
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'small'
      case 'large':
        return 'large'
      case 'medium':
      default:
        return undefined // 默认尺寸
    }
  }

  return (
    <PrimeButton
      label={children ? String(children) : undefined}
      icon={icon ? 'pi pi-custom' : undefined}
      loading={loading}
      disabled={disabled}
      onClick={handleClick}
      severity={getSeverity()}
      size={getSize()}
      rounded
      aria-label={ariaLabel}
      style={style}
      className={className}
    />
  )
}

export default PrimeReactButton 