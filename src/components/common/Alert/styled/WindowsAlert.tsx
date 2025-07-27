import React from 'react';
import { MessageBar, MessageBarActions, Button } from '@fluentui/react-components';
import { AlertProps } from '../../types';

const WindowsAlert: React.FC<AlertProps> = ({
  type,
  message,
  dismissible = false,
  onDismiss,
  icon,
  position = 'top',
  className = '',
}) => {
  // Map our AlertType to Fluent UI MessageBarType
  const getMessageBarType = (): any => {
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
    <div style={getPositionStyles()}>
      <MessageBar
        intent={getMessageBarType()}
        className={className}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && (
            <div style={{ 
              width: '16px', 
              height: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {icon}
            </div>
          )}
          <div style={{ flex: 1 }}>
            {message}
          </div>
        </div>
        {dismissible && onDismiss && (
          <MessageBarActions
            containerAction={
              <Button
                appearance="transparent"
                size="small"
                onClick={onDismiss}
                aria-label="Close alert"
                icon={
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                }
              />
            }
          />
        )}
      </MessageBar>
    </div>
  );
};

export default WindowsAlert; 