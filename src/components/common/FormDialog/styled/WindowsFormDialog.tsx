import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  Button,
  Spinner
} from '@fluentui/react-components';
import { FormDialogProps } from '../../types';

const WindowsFormDialog: React.FC<FormDialogProps> = ({
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
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (_event: unknown, data: { open: boolean }) => {
    setIsOpen(data.open);
    if (!data.open && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleActionClick = () => {
    if (!action.disabled && !action.loading) {
      action.onClick();
    }
  };

  // 映射尺寸
  const getDialogSize = () => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      case 'medium':
      default: return 'medium';
    }
  };

  // 设置对话框样式
  const dialogSurfaceStyle: React.CSSProperties = {
    width: size === 'small' ? '320px' : size === 'large' ? '480px' : '400px',
    maxWidth: '90vw',
    padding: 0,
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      modalType={backdrop ? 'modal' : 'non-modal'}
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedBy}
    >
      <DialogSurface
        style={dialogSurfaceStyle}
        className={className}
      >
        {/* Close Button */}
        {onClose && (
          <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1 }}>
            <Button
              appearance="subtle"
              aria-label="关闭对话框"
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path d="M10.707 10L15.854 4.854a.5.5 0 0 0-.708-.708L10 9.293 4.854 4.146a.5.5 0 1 0-.708.708L9.293 10l-5.147 5.146a.5.5 0 0 0 .708.708L10 10.707l5.146 5.147a.5.5 0 0 0 .708-.708L10.707 10z"/>
                </svg>
              }
              onClick={handleClose}
              style={{
                minWidth: '32px',
                width: '32px',
                height: '32px',
                padding: '0',
              }}
            />
          </div>
        )}

        {/* Header */}
        {(title || icon) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '32px 32px 16px',
              paddingRight: onClose ? '64px' : '32px',
            }}
          >
            {icon && (
              <div
                style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {React.cloneElement(icon as React.ReactElement, {
                  style: { width: '48px', height: '48px', ...((icon as React.ReactElement).props?.style || {}) }
                })}
              </div>
            )}
            {title && (
              <DialogTitle
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {title}
              </DialogTitle>
            )}
          </div>
        )}

        {/* Content */}
        {content && (
          <DialogContent>
            <DialogBody
              id={ariaDescribedBy}
              style={{
                padding: (title || icon) ? '0 32px 24px' : '32px 32px 24px',
                fontSize: '14px',
                lineHeight: '1.5',
                textAlign: 'center',
              }}
            >
              {content}
            </DialogBody>
          </DialogContent>
        )}

        {/* Action Button */}
        <div
          style={{
            padding: '0 32px 32px',
          }}
        >
          <Button
            appearance="primary"
            size="large"
            disabled={action.disabled || action.loading}
            onClick={handleActionClick}
            style={{
              width: '100%',
              minHeight: '40px',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {action.loading && (
              <Spinner size="tiny" style={{ marginRight: '8px' }} />
            )}
            {action.label}
          </Button>
        </div>
      </DialogSurface>
    </Dialog>
  );
};

export default WindowsFormDialog; 