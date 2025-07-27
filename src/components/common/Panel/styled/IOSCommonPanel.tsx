import React, { useState, useEffect } from 'react';
import { PanelProps } from '../../types';
import './IOSCommonPanel.scss';

interface IOSPanelProps extends PanelProps {
  onAnimationEnd?: () => void;
}

const IOSCommonPanel: React.FC<IOSPanelProps> = ({
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
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsExiting(false);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
      onAnimationEnd?.();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && backdropDismiss) {
      handleClose();
    }
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  if (!open && !isVisible) {
    return null;
  }

  return (
    <div 
      className={`ios-panel-backdrop ${isVisible ? 'ios-panel-backdrop--visible' : ''} ${isExiting ? 'ios-panel-backdrop--exiting' : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`ios-panel ${isMobile ? 'ios-panel--mobile' : 'ios-panel--desktop'} ${isVisible ? 'ios-panel--visible' : ''} ${isExiting ? 'ios-panel--exiting' : ''} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ios-panel-title' : undefined}
      >
        {/* 关闭按钮 */}
        <button 
          className="ios-panel__close"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 主要内容区域 */}
        <div className="ios-panel__content">
          {/* 大图标区域 */}
          {icon && (
            <div className="ios-panel__icon">
              {icon}
            </div>
          )}

          {/* 标题 */}
          {title && (
            <h2 id="ios-panel-title" className="ios-panel__title">
              {title}
            </h2>
          )}

          {/* 内容 */}
          {content && (
            <div className="ios-panel__text">
              {content}
            </div>
          )}

          {/* 操作按钮 */}
          {(actionText || onAction) && (
            <button 
              className="ios-panel__action"
              onClick={handleAction}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IOSCommonPanel; 