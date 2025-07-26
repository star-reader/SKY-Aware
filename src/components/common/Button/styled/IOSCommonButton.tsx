import React from 'react'
import { ButtonProps } from '../../types'
import './IOSCommonButton.scss'

const IOSCommonButton: React.FC<ButtonProps> = ({
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

  const buttonClass = [
    'ios-common-button',
    `ios-common-button--${variant}`,
    `ios-common-button--${size}`,
    disabled && 'ios-common-button--disabled',
    loading && 'ios-common-button--loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
    >
      {loading && (
        <span className="ios-common-button__spinner">
          <svg className="ios-common-button__spinner-icon" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </span>
      )}
      {icon && !loading && (
        <span className="ios-common-button__icon">{icon}</span>
      )}
      {children && (
        <span className="ios-common-button__text">{children}</span>
      )}
    </button>
  )
}

export default IOSCommonButton 