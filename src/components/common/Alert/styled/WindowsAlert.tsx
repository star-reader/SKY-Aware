import React, { useState, useEffect } from 'react';
import { MessageBar, MessageBarActions, Button } from '@fluentui/react-components';
import { AlertProps } from '../../types';

interface WindowsAlertProps extends AlertProps {
  onAnimationEnd?: () => void;
}

const WindowsAlert: React.FC<WindowsAlertProps> = ({
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
    // 延迟显示以触发进入动画
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
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

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss?.();
      onAnimationEnd?.();
    }, 300);
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

  const getAnimationStyle = (): React.CSSProperties => {
    const baseAnimation = {
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };

    if (!isVisible && !isExiting) {
      return {
        ...baseAnimation,
        opacity: 0,
        transform: position === 'top' 
          ? 'translateX(-50%) translateY(-20px) scale(0.95)' 
          : position === 'bottom'
          ? 'translateX(-50%) translateY(20px) scale(0.95)'
          : 'translate(-50%, -50%) scale(0.95)',
      };
    }

    if (isExiting) {
      return {
        ...baseAnimation,
        opacity: 0,
        transform: position === 'top' 
          ? 'translateX(-50%) translateY(-20px) scale(0.95)' 
          : position === 'bottom'
          ? 'translateX(-50%) translateY(20px) scale(0.95)'
          : 'translate(-50%, -50%) scale(0.95)',
      };
    }

    return {
      ...baseAnimation,
      opacity: 1,
      transform: position === 'center' 
        ? 'translate(-50%, -50%) scale(1)' 
        : 'translateX(-50%) translateY(0) scale(1)',
    };
  };

  return (
    <div style={{ ...getPositionStyles(), ...getAnimationStyle() }}>
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
                 onClick={handleDismiss}
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