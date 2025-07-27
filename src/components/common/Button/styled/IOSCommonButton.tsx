import React from 'react';
import { ButtonProps } from '../../types';
import './IOSCommonButton.scss';

const IOSCommonButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  icon,
  children,
  'aria-label': ariaLabel,
  className = '',
  type = 'button',
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    'ios-button',
    `ios-button--${variant}`,
    `ios-button--${size}`,
    disabled && 'ios-button--disabled',
    loading && 'ios-button--loading',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {loading && (
        <span className="ios-button__spinner" aria-hidden="true">
          <svg
            className="ios-button__spinner-icon"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="43.98"
              strokeDashoffset="43.98"
            />
          </svg>
        </span>
      )}
      {icon && !loading && (
        <span className="ios-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children && (
        <span className="ios-button__text">
          {children}
        </span>
      )}
    </button>
  );
};

export default IOSCommonButton; 