import React from 'react';
import { CardProps } from '../../types';
import './IOSCommonCard.scss';

const IOSCommonCard: React.FC<CardProps> = ({
  children,
  image,
  title,
  subtitle,
  onClick,
  elevation = 1,
  className = '',
}) => {
  const cardClasses = [
    'ios-card',
    onClick && 'ios-card--clickable',
    `ios-card--elevation-${elevation}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : 'article'}
      aria-label={onClick ? `Card: ${title || 'Clickable card'}` : undefined}
    >
      {image && (
        <div className="ios-card__image">
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className="ios-card__img"
          />
        </div>
      )}
      
      <div className="ios-card__content">
        {(title || subtitle) && (
          <div className="ios-card__header">
            {title && (
              <h3 className="ios-card__title">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="ios-card__subtitle">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {children && (
          <div className="ios-card__body">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default IOSCommonCard; 