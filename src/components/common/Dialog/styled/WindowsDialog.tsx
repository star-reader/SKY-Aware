import React from 'react';
import { 
  Dialog, 
  DialogSurface, 
  DialogTitle, 
  DialogContent, 
  DialogBody, 
  DialogActions, 
  Button 
} from '@fluentui/react-components';
import { DialogProps } from '../../types';

const WindowsDialog: React.FC<DialogProps> = ({
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
  const handleOpenChange = (_event: unknown, data: { open: boolean }) => {
    if (!data.open && onClose) {
      onClose();
    }
  };

  // 映射尺寸
  const getDialogSize = () => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      case 'fullscreen': return 'large'; // Fluent UI doesn't have fullscreen, use large
      case 'medium':
      default: return 'medium';
    }
  };

  // 设置对话框样式
  const dialogSurfaceStyle: React.CSSProperties = {
    maxHeight: scrollable ? '80vh' : undefined,
    overflow: scrollable ? 'auto' : undefined,
    width: size === 'fullscreen' ? '90vw' : undefined,
    height: size === 'fullscreen' ? '90vh' : undefined,
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      modalType={backdrop ? 'modal' : 'non-modal'}
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedBy}
    >
      <DialogSurface 
        style={dialogSurfaceStyle}
        className={className}
      >
        {/* Dialog Title with Close Button */}
        <DialogTitle

        >
          {(title || icon) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {icon && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {icon}
                </div>
              )}
              {title}
            </div>
          )}
        </DialogTitle>

        {/* Dialog Content */}
        {content && (
          <DialogContent>
            <DialogBody>
              {content}
            </DialogBody>
          </DialogContent>
        )}

        {/* Dialog Actions */}
        {actions && actions.length > 0 && (
          <DialogActions>
            {actions.map((action, index) => {
              // 映射按钮样式
              const getButtonAppearance = () => {
                switch (action.variant) {
                  case 'primary': return 'primary';
                  case 'destructive': return 'primary';
                  case 'secondary':
                  default: return 'secondary';
                }
              };

              return (
                <Button
                  key={index}
                  appearance={getButtonAppearance()}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  style={{
                    color: action.variant === 'destructive' ? '#D83B01' : undefined,
                    borderColor: action.variant === 'destructive' ? '#D83B01' : undefined,
                    backgroundColor: action.variant === 'destructive' && getButtonAppearance() === 'primary' ? '#D83B01' : undefined,
                  }}
                >
                  {action.label}
                </Button>
              );
            })}
          </DialogActions>
        )}
      </DialogSurface>
    </Dialog>
  );
};

export default WindowsDialog; 