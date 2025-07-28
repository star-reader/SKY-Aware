import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { SpinnerProps } from '../../types';

const MaterialSpinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color,
  visible = true,
  label,
  variant = 'indeterminate',
  value = 0,
  thickness = 3.6,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const getMUISize = (): number => {
    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 40;
      case 'large':
        return 56;
      default:
        return 40;
    }
  };

  const getMUIColor = (): 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    if (color) {
      return 'inherit';
    }
    return 'primary';
  };

  if (!visible) {
    return null;
  }

  const circularProgress = (
    <CircularProgress
      size={getMUISize()}
      color={getMUIColor()}
      variant={variant}
      value={variant === 'determinate' ? value : undefined}
      thickness={thickness}
      aria-label={ariaLabel || label}
      className={className}
      sx={{
        ...(color && { color }),
      }}
    />
  );

  if (label) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        className={className}
      >
        {circularProgress}
        <Typography 
          variant="body2" 
          color="text.secondary"
          textAlign="center"
        >
          {label}
        </Typography>
      </Box>
    );
  }

  return circularProgress;
};

export default MaterialSpinner; 