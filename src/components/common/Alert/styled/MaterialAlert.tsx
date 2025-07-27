import React from 'react';
import { Alert, AlertTitle, IconButton, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AlertProps } from '../../types';

const MaterialAlert: React.FC<AlertProps> = ({
  type,
  message,
  dismissible = false,
  onDismiss,
  icon,
  position = 'top',
  className = '',
}) => {
  // Map our AlertType to MUI Alert severity
  const getSeverity = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  // Get position styles
  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      maxWidth: '400px',
      width: 'calc(100% - 32px)',
      margin: '0 16px',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: '16px',
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: '16px',
        };
      case 'center':
        return {
          ...baseStyles,
          top: '50%',
          transform: 'translate(-50%, -50%)',
        };
      default:
        return {
          ...baseStyles,
          top: '16px',
        };
    }
  };

  return (
    <Box style={getPositionStyles()}>
      <Alert
        severity={getSeverity()}
        icon={icon || undefined}
        className={className}
        sx={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          '& .MuiAlert-message': {
            fontSize: '14px',
            lineHeight: '1.4',
          },
        }}
        action={
          dismissible && onDismiss ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onDismiss}
              sx={{
                padding: '4px',
                '& svg': {
                  fontSize: '16px',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default MaterialAlert; 