import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, IconButton, Box, Slide, Fade, Zoom } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AlertProps } from '../../types';

interface MaterialAlertProps extends AlertProps {
  onAnimationEnd?: () => void;
}

const MaterialAlert: React.FC<MaterialAlertProps> = ({
  type,
  message,
  dismissible = false,
  onDismiss,
  icon,
  position = 'top',
  className = '',
  onAnimationEnd,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
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

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss?.();
      onAnimationEnd?.();
    }, 300);
  };

  const getAnimationComponent = () => {
    switch (position) {
      case 'top':
        return Slide;
      case 'bottom':
        return Slide;
      case 'center':
        return Zoom;
      default:
        return Slide;
    }
  };

  const getAnimationProps = () => {
    switch (position) {
      case 'top':
        return { direction: 'down' as const };
      case 'bottom':
        return { direction: 'up' as const };
      case 'center':
        return {};
      default:
        return { direction: 'down' as const };
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

  const AnimationComponent = getAnimationComponent();
  const animationProps = getAnimationProps();

  return (
    <Box style={getPositionStyles()}>
      <AnimationComponent 
        in={isVisible && !isExiting} 
        timeout={300}
        {...animationProps}
      >
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
                onClick={handleDismiss}
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
      </AnimationComponent>
    </Box>
  );
};

export default MaterialAlert; 