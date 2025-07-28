import React, { useEffect, useState } from 'react';
import { DialogProps } from '../../types';
import useWindowWidth from '../../../../hooks/common/useWindowWidth';
import './IOSCommonDialog.scss';

const IOSCommonDialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
  size = 'medium',
  scrollable = false,
  backdrop = true,
  backdropDismiss = true,
  icon,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const windowWidth = useWindowWidth();
  const [isClosing, setIsClosing] = useState(false);

  // 根据屏幕宽度判断是否使用macOS样式
  // macOS样式：宽度 > 768px
  const isMacOSStyle = windowWidth > 768;

  useEffect(() => {
    if (open) {
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClose = () => {
    if (onClose) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 200);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && backdropDismiss) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      handleClose();
    }
  };

  if (!open && !isClosing) return null;

  const dialogClasses = [
    'ios-dialog',
    isMacOSStyle ? 'ios-dialog--macos' : 'ios-dialog--ios',
    `ios-dialog--${size}`,
    scrollable && 'ios-dialog--scrollable',
    isClosing && 'ios-dialog--closing',
    className
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'ios-dialog__backdrop',
    isMacOSStyle ? 'ios-dialog__backdrop--macos' : 'ios-dialog__backdrop--ios'
  ].join(' ');

  return (
    <div 
      className={backdropClasses}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={{ display: backdrop ? 'flex' : 'none' }}
    >
      <div 
        className={dialogClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
      >
        {/* Dialog Header */}
        {(title || icon) && (
          <div className="ios-dialog__header">
            {icon && (
              <div className="ios-dialog__icon">
                {icon}
              </div>
            )}
            {title && (
              <h2 className="ios-dialog__title">
                {title}
              </h2>
            )}
            {isMacOSStyle && onClose && (
              <button 
                className="ios-dialog__close-button"
                onClick={handleClose}
                aria-label="关闭对话框"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Dialog Content */}
        {content && (
          <div className="ios-dialog__content">
            {content}
          </div>
        )}

        {/* Dialog Actions */}
        {actions && actions.length > 0 && (
          <div className="ios-dialog__actions">
            {actions.map((action, index) => {
              const buttonClasses = [
                'ios-dialog__action-button',
                `ios-dialog__action-button--${action.variant || 'secondary'}`,
                action.disabled && 'ios-dialog__action-button--disabled',
                // iOS样式：垂直堆叠，macOS样式：水平排列
                isMacOSStyle ? 'ios-dialog__action-button--macos' : 'ios-dialog__action-button--ios'
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={index}
                  className={buttonClasses}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IOSCommonDialog; 