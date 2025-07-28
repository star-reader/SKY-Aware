import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { PanelProps } from '../../types';

interface MaterialPanelProps extends PanelProps {
  onAnimationEnd?: () => void;
}

const MaterialPanel: React.FC<MaterialPanelProps> = ({
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onClose?.();
    onAnimationEnd?.();
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (backdropDismiss && event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={backdropDismiss ? handleClose : undefined}
      maxWidth="sm"
      fullWidth={false}
      className={className}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? '20px 20px 0 0' : '12px',
          maxWidth: isMobile ? '100%' : '400px',
          width: isMobile ? '100%' : '400px',
          minHeight: isMobile ? 'auto' : '300px',
          margin: isMobile ? 0 : 'auto',
          // 移动端从底部弹出
          ...(isMobile && {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            top: 'auto',
            transform: 'none',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            maxHeight: '80vh',
          }),
        },
        // 移动端Dialog容器样式调整
        ...(isMobile && {
          '& .MuiDialog-container': {
            alignItems: 'flex-end',
            justifyContent: 'stretch',
          },
        }),
      }}
      BackdropProps={{
        onClick: handleBackdropClick,
      }}
    >
      {/* 关闭按钮 */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
          zIndex: 1,
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      {/* 标题 */}
      {title && (
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 600,
            paddingTop: '24px',
            paddingBottom: '16px',
            paddingLeft: '24px',
            paddingRight: '48px', // 为关闭按钮留空间
          }}
        >
          {title}
        </DialogTitle>
      )}

      {/* 内容区域 */}
      <DialogContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          paddingTop: icon ? '16px' : 0,
          paddingBottom: '24px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {/* 大图标区域 */}
        {icon && (
          <Box
            sx={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              backgroundColor: theme.palette.primary.main + '20', // 20% opacity
              color: theme.palette.primary.main,
              marginBottom: '8px',
              '& svg': {
                fontSize: '48px',
              },
            }}
          >
            {icon}
          </Box>
        )}

        {/* 内容文本 */}
        {content && (
          <Box
            sx={{
              fontSize: '16px',
              color: 'text.secondary',
              lineHeight: 1.4,
              textAlign: 'center',
              maxWidth: '320px',
            }}
          >
            {content}
          </Box>
        )}
      </DialogContent>

      {/* 操作按钮 */}
      {(actionText || onAction) && (
        <DialogActions
          sx={{
            justifyContent: 'center',
            gap: '12px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: 0,
          }}
        >
          <Button
            variant="contained"
            onClick={handleAction}
            sx={{
              minWidth: '120px',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {actionText}
          </Button>
          {backdropDismiss && (
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                minWidth: '80px',
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MaterialPanel; 