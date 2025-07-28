import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  Title3
} from '@fluentui/react-components';
import { PopoverProps } from '../../types';

const WindowsPopover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  position = 'auto',
  title,
  content,
  showCloseButton = true,
  backdrop = true,
  backdropDismiss = true,
  arrow = true,
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

  // 映射位置
  const getFluentPosition = () => {
    switch (position) {
      case 'top': return 'above';
      case 'bottom': return 'below';
      case 'left': return 'before';
      case 'right': return 'after';
      case 'auto':
      default: return 'below';
    }
  };

  // 如果没有 anchorEl，创建一个虚拟的触发器
  const triggerContent = anchorEl ? null : <div style={{ display: 'none' }} />;

  return (
    <Popover
      open={isOpen}
      onOpenChange={handleOpenChange}
      positioning={{
        position: getFluentPosition(),
        align: 'center',
        offset: 8,
      }}
      closeOnScroll={true}
      trapFocus={true}
      // className={className as any}
    >
      {triggerContent as React.ReactElement && (
        <PopoverTrigger disableButtonEnhancement>
          {triggerContent}
        </PopoverTrigger>
      ) }
      
      <PopoverSurface
        style={{
          maxWidth: '320px',
          minWidth: '200px',
          padding: 0,
        }}
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 16px 8px',
              borderBottom: title && content ? '1px solid #e1e1e1' : 'none',
            }}
          >
            {title && (
              <Title3
                style={{
                  margin: 0,
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {title}
              </Title3>
            )}
            {showCloseButton && onClose && (
              <Button
                appearance="subtle"
                size="small"
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path d="M10.707 10L15.854 4.854a.5.5 0 0 0-.708-.708L10 9.293 4.854 4.146a.5.5 0 1 0-.708.708L9.293 10l-5.147 5.146a.5.5 0 0 0 .708.708L10 10.707l5.146 5.147a.5.5 0 0 0 .708-.708L10.707 10z"/>
                  </svg>
                }
                onClick={handleClose}
                aria-label="关闭弹出层"
                style={{
                  minWidth: '28px',
                  width: '28px',
                  height: '28px',
                  marginLeft: title ? '12px' : '0',
                }}
              />
            )}
          </div>
        )}

        {/* Content */}
        {content && (
          <div
            id={ariaDescribedBy}
            style={{
              padding: (title || showCloseButton) ? '12px 16px 16px' : '16px',
              fontSize: '14px',
              lineHeight: '1.4',
            }}
          >
            {content}
          </div>
        )}
      </PopoverSurface>
    </Popover>
  );
};

export default WindowsPopover; 