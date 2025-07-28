import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FormDialogProps } from '../../types';

const MaterialFormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  title,
  content,
  action,
  size = 'medium',
  backdropDismiss = true,
  icon,
  className = '',
  'aria-describedby': ariaDescribedBy,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (_event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && !backdropDismiss) {
      return;
    }
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
  const getMaxWidth = (): 'sm' | 'md' | 'lg' => {
    switch (size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      case 'medium':
      default: return 'md';
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={getMaxWidth()}
      fullWidth={true}
      fullScreen={isMobile}
      className={className}
      aria-labelledby={title ? 'form-dialog-title' : undefined}
      aria-describedby={ariaDescribedBy}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          maxWidth: size === 'small' ? '360px' : size === 'large' ? '520px' : '440px',
        }
      }}
    >
      {/* Close Button */}
      {onClose && (
        <IconButton
          aria-label="关闭对话框"
          onClick={() => handleClose()}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </IconButton>
      )}

      {/* Header */}
      {(title || icon) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pt: 4,
            px: 4,
            pb: 2,
            pr: onClose ? 6 : 4,
          }}
        >
          {icon && (
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': {
                  width: '48px !important',
                  height: '48px !important',
                }
              }}
            >
              {icon}
            </Box>
          )}
          {title && (
            <DialogTitle
              id="form-dialog-title"
              sx={{
                margin: 0,
                padding: 0,
                fontSize: '1.25rem',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {title}
            </DialogTitle>
          )}
        </Box>
      )}

      {/* Content */}
      {content && (
        <DialogContent
          sx={{
            pt: (title || icon) ? 0 : 4,
            px: 4,
            pb: 3,
            textAlign: 'center',
          }}
        >
          {typeof content === 'string' ? (
            <DialogContentText
              id={ariaDescribedBy}
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'text.secondary',
              }}
            >
              {content}
            </DialogContentText>
          ) : (
            <Box id={ariaDescribedBy}>
              {content}
            </Box>
          )}
        </DialogContent>
      )}

      {/* Action Button */}
      <Box
        sx={{
          px: 4,
          pb: 4,
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={action.disabled || action.loading}
          onClick={handleActionClick}
          sx={{
            minHeight: isMobile ? '48px' : '44px',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          {action.loading && (
            <CircularProgress
              size={16}
              sx={{
                mr: 1,
                color: 'inherit',
              }}
            />
          )}
          {action.label}
        </Button>
      </Box>
    </Dialog>
  );
};

export default MaterialFormDialog; 