import React from 'react';
import { Button as FluentButton, Spinner } from '@fluentui/react-components';
import { ButtonProps } from '../../types';

const WindowsButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  icon,
  children,
  'aria-label': ariaLabel,
  className = '',
}) => {
  // Map variant to Fluent UI appearance
  const getAppearance = () => {
    switch (variant) {
      case 'contained':
      case 'primary':
        return 'primary';
      case 'outlined':
        return 'outline';
      case 'text':
        return 'subtle';
      case 'destructive':
        return 'primary';
      default:
        return 'primary';
    }
  };

  // Map size to Fluent UI size
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  const buttonStyle = variant === 'destructive' ? {
    backgroundColor: '#C42B1C',
    borderColor: '#C42B1C',
    color: '#FFFFFF',
  } : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  return (
    <FluentButton
      appearance={getAppearance()}
      size={getSize()}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
      style={buttonStyle}
      icon={loading ? <Spinner size="tiny" /> as any : icon}
    >
      {children}
    </FluentButton>
  );
};

export default WindowsButton; 