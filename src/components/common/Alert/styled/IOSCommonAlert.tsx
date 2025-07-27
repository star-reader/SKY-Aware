import React, { useState, useEffect } from 'react';
import { AlertProps } from '../../types';
import './IOSCommonAlert.scss';

interface IOSAlertProps extends AlertProps {
  onAnimationEnd?: () => void;
}

const IOSCommonAlert: React.FC<IOSAlertProps> = ({
  type,
  message,
  dismissible = false,
  onDismiss,
  icon,
  position = 'top',
  className = '',
  onAnimationEnd,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
        );
      case 'info':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDismiss = () => {
    setIsExiting(true);
    // 等待退出动画完成后再调用onDismiss
    setTimeout(() => {
      onDismiss?.();
      onAnimationEnd?.();
    }, 400); // 动画持续时间
  };

  const renderCloseButton = () => (
    <button
      className="ios-alert__close"
      onClick={handleDismiss}
      aria-label="Close alert"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );

  return (
    <div 
      className={`ios-alert ios-alert--${type} ios-alert--${position} ${isExiting ? 'ios-alert--exiting' : ''} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="ios-alert__content">
        <div className="ios-alert__icon">
          {icon || getDefaultIcon()}
        </div>
        <div className="ios-alert__message">
          {message}
        </div>
        {dismissible && renderCloseButton()}
      </div>
    </div>
  );
};

export default IOSCommonAlert; 