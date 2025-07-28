import React, { useEffect, useState } from 'react';
import {
  Popover,
  Paper,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { PopoverProps } from '../../types';

const MaterialPopover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  position = 'auto',
  title,
  content,
  showCloseButton = true,
  backdrop = true,
  backdropDismiss = true,
  arrow = false, // Material Design 通常不使用箭头
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const [isOpen, setIsOpen] = useState(open);

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

  // 映射位置到 Material UI 的 anchorOrigin 和 transformOrigin
  const getAnchorOrigin = () => {
    switch (position) {
      case 'top':
        return { vertical: 'top' as const, horizontal: 'center' as const };
      case 'bottom':
        return { vertical: 'bottom' as const, horizontal: 'center' as const };
      case 'left':
        return { vertical: 'center' as const, horizontal: 'left' as const };
      case 'right':
        return { vertical: 'center' as const, horizontal: 'right' as const };
      case 'auto':
      default:
        return { vertical: 'bottom' as const, horizontal: 'center' as const };
    }
  };

  const getTransformOrigin = () => {
    switch (position) {
      case 'top':
        return { vertical: 'bottom' as const, horizontal: 'center' as const };
      case 'bottom':
        return { vertical: 'top' as const, horizontal: 'center' as const };
      case 'left':
        return { vertical: 'center' as const, horizontal: 'right' as const };
      case 'right':
        return { vertical: 'center' as const, horizontal: 'left' as const };
      case 'auto':
      default:
        return { vertical: 'top' as const, horizontal: 'center' as const };
    }
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={getAnchorOrigin()}
      transformOrigin={getTransformOrigin()}
      slotProps={{
        paper: {
          elevation: 8,
          sx: {
            maxWidth: '320px',
            minWidth: '200px',
            borderRadius: '8px',
            overflow: 'hidden',
          },
        },
      }}
      className={className}
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedBy}
    >
      <Paper elevation={0} sx={{ p: 0 }}>
        {/* Header */}
        {(title || showCloseButton) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '16px 16px 8px',
              borderBottom: title && content ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            {title && (
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                {title}
              </Typography>
            )}
            {showCloseButton && onClose && (
              <IconButton
                size="small"
                onClick={() => handleClose()}
                aria-label="关闭弹出层"
                sx={{
                  ml: title ? 1.5 : 0,
                  width: 28,
                  height: 28,
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </IconButton>
            )}
          </Box>
        )}

        {/* Content */}
        {content && (
          <Box
            id={ariaDescribedBy}
            sx={{
              p: (title || showCloseButton) ? '12px 16px 16px' : '16px',
              fontSize: '14px',
              lineHeight: 1.4,
            }}
          >
            {typeof content === 'string' ? (
              <Typography variant="body2">
                {content}
              </Typography>
            ) : (
              content
            )}
          </Box>
        )}
      </Paper>
    </Popover>
  );
};

export default MaterialPopover; 