import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogSurface, 
  DialogBody, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Button
} from '@fluentui/react-components';
import { PanelProps } from '../../types';

interface WindowsPanelProps extends PanelProps {
  onAnimationEnd?: () => void;
}

const WindowsPanel: React.FC<WindowsPanelProps> = ({
  open,
  onClose,
  title,
  content,
  icon,
  actionText = 'OK',
  onAction,
  backdropDismiss = true,
  className = '',
  onAnimationEnd,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = () => {
    onClose?.();
    onAnimationEnd?.();
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  const handleOpenChange = (_event: any, data: { open: boolean }) => {
    if (!data.open && backdropDismiss) {
      handleClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={handleOpenChange}
      modalType={isMobile ? 'alert' : 'modal'}
    >
      <DialogSurface 
        className={className}
        style={{
          maxWidth: isMobile ? '90vw' : '400px',
          width: isMobile ? '90vw' : '400px',
          minHeight: isMobile ? 'auto' : '300px',
          borderRadius: '8px',
          padding: 0,
        }}
      >
        <DialogBody style={{ padding: 0 }}>
          {/* 标题区域 */}
          {title && (
            <DialogTitle 
              style={{ 
                textAlign: 'center',
                padding: '24px 24px 16px',
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: 'none'
              }}
            >
              {title}
            </DialogTitle>
          )}

          {/* 内容区域 */}
          <DialogContent 
            style={{ 
              padding: icon ? '16px 24px 24px' : '0 24px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {/* 大图标区域 */}
            {icon && (
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  backgroundColor: 'var(--colorBrandBackground2)',
                  color: 'var(--colorBrandForeground1)',
                  marginBottom: '8px'
                }}
              >
                {icon}
              </div>
            )}

            {/* 内容文本 */}
            {content && (
              <div 
                style={{
                  fontSize: '14px',
                  color: 'var(--colorNeutralForeground2)',
                  lineHeight: '1.4',
                  textAlign: 'center',
                  maxWidth: '320px'
                }}
              >
                {content}
              </div>
            )}
          </DialogContent>

          {/* 操作按钮 */}
          {(actionText || onAction) && (
            <DialogActions 
              style={{ 
                padding: '0 24px 24px',
                gap: '12px',
              }}
            >
              <Button
                appearance="primary"
                onClick={handleAction}
                style={{
                  minWidth: '120px',
                  borderRadius: '4px'
                }}
              >
                {actionText}
              </Button>
              {backdropDismiss && (
                <Button
                  appearance="secondary"
                  onClick={handleClose}
                  style={{
                    minWidth: '80px',
                    borderRadius: '4px'
                  }}
                >
                  Cancel
                </Button>
              )}
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default WindowsPanel; 