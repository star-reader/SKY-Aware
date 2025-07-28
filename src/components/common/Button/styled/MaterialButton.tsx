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

  const spinnerSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;

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
        minWidth: '64px !important',
        width: 'auto',
        height: size === 'small' ? '32px !important' : size === 'large' ? '44px !important' : '36px !important',
        minHeight: size === 'small' ? '32px !important' : size === 'large' ? '44px !important' : '36px !important',
        fontSize: size === 'small' ? '12px !important' : size === 'large' ? '16px !important' : '14px !important',
        padding: size === 'small' ? '6px 12px !important' : size === 'large' ? '12px 20px !important' : '8px 16px !important',
        textTransform: 'none',
        lineHeight: '1.4',
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