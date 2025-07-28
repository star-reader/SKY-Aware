import React, { useEffect, useState } from 'react';
import { FormDialogProps } from '../../types';
import useWindowWidth from '../../../../hooks/common/useWindowWidth';
import './IOSCommonFormDialog.scss';

const IOSCommonFormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  title,
  content,
  action,
  size = 'medium',
  backdrop = true,
  backdropDismiss = true,
  icon,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const windowWidth = useWindowWidth();
  const [isClosing, setIsClosing] = useState(false);

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

  const handleActionClick = () => {
    if (!action.disabled && !action.loading) {
      action.onClick();
    }
  };

  if (!open && !isClosing) return null;

  const dialogClasses = [
    'ios-form-dialog',
    isMacOSStyle ? 'ios-form-dialog--macos' : 'ios-form-dialog--ios',
    `ios-form-dialog--${size}`,
    isClosing && 'ios-form-dialog--closing',
    className
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'ios-form-dialog__backdrop',
    isMacOSStyle ? 'ios-form-dialog__backdrop--macos' : 'ios-form-dialog__backdrop--ios'
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
        {/* Close Button */}
        {onClose && (
          <button
            className="ios-form-dialog__close-button"
            onClick={handleClose}
            aria-label="关闭对话框"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}

        {/* Header */}
        {(title || icon) && (
          <div className="ios-form-dialog__header">
            {icon && (
              <div className="ios-form-dialog__icon">
                {icon}
              </div>
            )}
            {title && (
              <h2 className="ios-form-dialog__title">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Content */}
        {content && (
          <div className="ios-form-dialog__content" id={ariaDescribedBy}>
            {content}
          </div>
        )}

        {/* Action Button */}
        <div className="ios-form-dialog__actions">
          <button
            className={`ios-form-dialog__action-button ${action.disabled ? 'ios-form-dialog__action-button--disabled' : ''} ${action.loading ? 'ios-form-dialog__action-button--loading' : ''}`}
            onClick={handleActionClick}
            disabled={action.disabled || action.loading}
          >
            {action.loading && (
              <div className="ios-form-dialog__action-spinner">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      dur="2s"
                      values="0 31.416;15.708 15.708;0 31.416"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="2s"
                      values="0;-15.708;-31.416"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            )}
            <span className={action.loading ? 'ios-form-dialog__action-label--loading' : ''}>
              {action.label}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IOSCommonFormDialog; 