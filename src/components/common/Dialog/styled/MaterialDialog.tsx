import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import { DialogProps } from '../../types';

const MaterialDialog: React.FC<DialogProps> = ({
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
  'aria-describedby': ariaDescribedBy,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (_event: unknown, reason?: string) => {
    if (reason === 'backdropClick' && !backdropDismiss) {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  // 映射尺寸
  const getMaxWidth = (): 'sm' | 'md' | 'lg' | false => {
    switch (size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      case 'fullscreen': return false;
      case 'medium':
      default: return 'md';
    }
  };

  // 设置对话框属性
  const dialogProps = {
    open,
    onClose: handleClose,
    maxWidth: getMaxWidth(),
    fullWidth: true,
    fullScreen: size === 'fullscreen' || isMobile,
    scroll: scrollable ? 'paper' : 'body' as 'paper' | 'body',
    className,
    'aria-labelledby': title ? 'dialog-title' : undefined,
    'aria-describedby': ariaDescribedBy,
    ...(backdrop === false && { hideBackdrop: true }),
  };

  return (
    <Dialog {...dialogProps}>
      {/* Dialog Title */}
      {title && (
        <DialogTitle 
          id="dialog-title"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingRight: onClose ? 1 : 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {icon}
              </Box>
            )}
            {title}
          </Box>
          
          {onClose && (
            <IconButton
              aria-label="关闭"
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </IconButton>
          )}
        </DialogTitle>
      )}

      {/* Dialog Content */}
      {content && (
        <DialogContent 
          dividers={scrollable}
          sx={{
            paddingTop: !title ? 3 : undefined,
            minHeight: scrollable ? '200px' : undefined,
            maxHeight: scrollable ? '60vh' : undefined,
          }}
        >
          {typeof content === 'string' ? (
            <DialogContentText id={ariaDescribedBy}>
              {content}
            </DialogContentText>
          ) : (
            <Box id={ariaDescribedBy}>
              {content}
            </Box>
          )}
        </DialogContent>
      )}

      {/* Dialog Actions */}
      {actions && actions.length > 0 && (
        <DialogActions 
          sx={{ 
            padding: 2,
            gap: 1,
            flexDirection: isMobile ? 'column-reverse' : 'row',
          }}
        >
          {actions.map((action, index) => {
            // 映射按钮样式
            const getButtonVariant = () => {
              switch (action.variant) {
                case 'primary': return 'contained';
                case 'destructive': return 'contained';
                case 'secondary':
                default: return 'outlined';
              }
            };

            const getButtonColor = () => {
              switch (action.variant) {
                case 'primary': return 'primary';
                case 'destructive': return 'error';
                case 'secondary':
                default: return 'inherit';
              }
            };

            return (
              <Button
                key={index}
                variant={getButtonVariant()}
                color={getButtonColor()}
                onClick={action.onClick}
                disabled={action.disabled}
                fullWidth={isMobile}
                sx={{
                  minWidth: isMobile ? undefined : '80px',
                  order: isMobile ? (action.variant === 'primary' ? -1 : 0) : 0,
                }}
              >
                {action.label}
              </Button>
            );
          })}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MaterialDialog; 