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
  // Map our size to Material UI size (number in pixels)
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

  // Map our color to Material UI color
  const getMUIColor = (): 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    if (color) {
      // If a custom color is provided, use 'inherit' and handle with sx
      return 'inherit';
    }
    return 'primary';
  };

  // If visible is false, don't render the component
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

  // If label is provided, wrap with Box and Typography
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