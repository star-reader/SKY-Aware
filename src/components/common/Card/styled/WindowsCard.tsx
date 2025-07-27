import React from 'react';
import { 
  Card, 
  CardFooter, 
  CardHeader, 
  CardPreview,
  Text,
  Caption1,
  Button
} from '@fluentui/react-components';
import { CardProps } from '../../types';

const WindowsCard: React.FC<CardProps> = ({
  children,
  image,
  title,
  subtitle,
  onClick,
  elevation = 4,
  className = '',
}) => {
  const cardStyle = {
    width: 'auto',
    maxWidth: '300px',
    margin: '8px',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out',
    boxShadow: `var(--shadow${Math.min(Math.max(elevation, 2), 64)})`,
  };

  const hoverStyle = onClick ? {
    transform: 'translateY(-2px)',
    boxShadow: `var(--shadow${Math.min(Math.max(elevation + 8, 2), 64)})`,
  } : {};

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Card
      className={className}
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (onClick) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          Object.assign(e.currentTarget.style, cardStyle);
        }
      }}
    >
      {image && (
        <CardPreview>
          <img
            src={image}
            alt={title || 'Card image'}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: 'var(--borderRadiusMedium) var(--borderRadiusMedium) 0 0',
            }}
          />
        </CardPreview>
      )}
      
      {(title || subtitle) && (
        <CardHeader
          header={
            title && (
              <Text weight="semibold" size={400}>
                {title}
              </Text>
            )
          }
          description={
            subtitle && (
              <Caption1>
                {subtitle}
              </Caption1>
            )
          }
          style={{
            padding: '12px 16px 8px 16px',
          }}
        />
      )}
      
      {children && (
        <div style={{ padding: '0 16px 16px 16px' }}>
          {children}
        </div>
      )}
    </Card>
  );
};

export default WindowsCard; 