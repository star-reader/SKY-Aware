import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { ButtonProps } from '../../types';

const MaterialButton: React.FC<ButtonProps> = ({
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
  // Map variant to MUI variant
  const getMuiVariant = () => {
    switch (variant) {
      case 'contained':
      case 'primary':
        return 'contained';
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      case 'destructive':
        return 'contained';
      default:
        return 'contained';
    }
  };



  const getColor = () => {
    if (variant === 'destructive') {
      return 'error';
    }
    return 'primary';
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const spinnerSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  return (
    <MuiButton
      variant={getMuiVariant()}
      color={getColor()}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
      type={type}
      startIcon={loading ? (
        <CircularProgress size={spinnerSize} color="inherit" />
      ) : icon}
      sx={{
        // 强制覆盖MUI默认尺寸，与其他平台保持完全一致
        minWidth: '64px !important',
        width: 'auto',
        height: size === 'small' ? '32px !important' : size === 'large' ? '44px !important' : '36px !important',
        minHeight: size === 'small' ? '32px !important' : size === 'large' ? '44px !important' : '36px !important',
        fontSize: size === 'small' ? '12px !important' : size === 'large' ? '16px !important' : '14px !important',
        padding: size === 'small' ? '6px 12px !important' : size === 'large' ? '12px 20px !important' : '8px 16px !important',
        textTransform: 'none',
        lineHeight: '1.4',
        // 移除MUI默认的间距和边距
        margin: 0,
        '& .MuiButton-startIcon': {
          marginLeft: 0,
          marginRight: '6px',
        },
        '& .MuiButton-endIcon': {
          marginLeft: '6px',
          marginRight: 0,
        },
        // Loading state
        ...(loading && {
          '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: '6px',
          },
        }),
      }}
    >
      {children}
    </MuiButton>
  );
};

export default MaterialButton; 