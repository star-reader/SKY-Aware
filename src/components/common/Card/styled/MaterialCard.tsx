import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CardHeader,
} from '@mui/material';
import { CardProps } from '../../types';

const MaterialCard: React.FC<CardProps> = ({
  children,
  image,
  title,
  subtitle,
  onClick,
  elevation = 2,
  className = '',
}) => {
  const cardContent = (
    <>
      {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title || 'Card image'}
          sx={{
            objectFit: 'cover',
          }}
        />
      )}
      
      {(title || subtitle) && (
        <CardHeader
          title={
            title && (
              <Typography variant="h6" component="h2" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                {title}
              </Typography>
            )
          }
          subheader={
            subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )
          }
          sx={{
            padding: '16px 16px 8px 16px',
            '& .MuiCardHeader-content': {
              overflow: 'hidden',
            },
            '& .MuiCardHeader-title': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
            '& .MuiCardHeader-subheader': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        />
      )}
      
      {children && (
        <CardContent sx={{ padding: '0 16px 16px 16px', '&:last-child': { paddingBottom: '16px' } }}>
          {children}
        </CardContent>
      )}
    </>
  );

  if (onClick) {
    return (
      <Card
        elevation={elevation}
        className={className}
        sx={{
          maxWidth: 300,
          margin: 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => theme.shadows[Math.min(elevation + 4, 24)],
          },
        }}
      >
        <CardActionArea onClick={onClick}>
          {cardContent}
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card
      elevation={elevation}
      className={className}
      sx={{
        maxWidth: 300,
        margin: 1,
      }}
    >
      {cardContent}
    </Card>
  );
};

export default MaterialCard; 