import React, { useEffect, useState, useRef } from 'react';
import { PopoverProps } from '../../types';
import './IOSCommonPopover.scss';

const IOSCommonPopover: React.FC<PopoverProps> = ({
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
  offset = 8,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const [popoverPosition, setPopoverPosition] = useState(position);
  const [isClosing, setIsClosing] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 计算最佳位置
  const calculatePosition = () => {
    if (!anchorEl || !popoverRef.current) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (position === 'auto') {
      // 自动计算最佳位置
      const spaceTop = anchorRect.top;
      const spaceBottom = viewportHeight - anchorRect.bottom;
      const spaceLeft = anchorRect.left;
      const spaceRight = viewportWidth - anchorRect.right;

      if (spaceBottom >= popoverRect.height + offset) {
        setPopoverPosition('bottom');
      } else if (spaceTop >= popoverRect.height + offset) {
        setPopoverPosition('top');
      } else if (spaceRight >= popoverRect.width + offset) {
        setPopoverPosition('right');
      } else if (spaceLeft >= popoverRect.width + offset) {
        setPopoverPosition('left');
      } else {
        setPopoverPosition('bottom'); // 默认底部
      }
    } else {
      setPopoverPosition(position);
    }
  };

  // 获取popover样式
  const getPopoverStyle = (): React.CSSProperties => {
    if (!anchorEl) return {};

    const anchorRect = anchorEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (popoverPosition) {
      case 'top':
        top = anchorRect.top + scrollTop - offset;
        left = anchorRect.left + scrollLeft + anchorRect.width / 2;
        break;
      case 'bottom':
        top = anchorRect.bottom + scrollTop + offset;
        left = anchorRect.left + scrollLeft + anchorRect.width / 2;
        break;
      case 'left':
        top = anchorRect.top + scrollTop + anchorRect.height / 2;
        left = anchorRect.left + scrollLeft - offset;
        break;
      case 'right':
        top = anchorRect.top + scrollTop + anchorRect.height / 2;
        left = anchorRect.right + scrollLeft + offset;
        break;
      default:
        top = anchorRect.bottom + scrollTop + offset;
        left = anchorRect.left + scrollLeft + anchorRect.width / 2;
    }

    return {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1050,
    };
  };

  useEffect(() => {
    if (open && anchorEl) {
      calculatePosition();
    }
  }, [open, anchorEl, position]);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
      // 防止页面滚动
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

  const popoverClasses = [
    'ios-popover',
    `ios-popover--${popoverPosition}`,
    arrow && 'ios-popover--with-arrow',
    isClosing && 'ios-popover--closing',
    className
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'ios-popover__backdrop',
    isClosing && 'ios-popover__backdrop--closing'
  ].filter(Boolean).join(' ');

  return (
    <>
      {backdrop && (
        <div
          className={backdropClasses}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        />
      )}
      <div
        ref={popoverRef}
        className={popoverClasses}
        style={getPopoverStyle()}
        role="tooltip"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {arrow && <div className="ios-popover__arrow" />}
        
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="ios-popover__header">
            {title && (
              <h3 className="ios-popover__title">
                {title}
              </h3>
            )}
            {showCloseButton && onClose && (
              <button
                className="ios-popover__close-button"
                onClick={handleClose}
                aria-label="关闭弹出层"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {content && (
          <div className="ios-popover__content" id={ariaDescribedBy}>
            {content}
          </div>
        )}
      </div>
    </>
  );
};

export default IOSCommonPopover; 