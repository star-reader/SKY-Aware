import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { SegmentControlProps } from '../../types';

const MaterialSegmentControl: React.FC<SegmentControlProps> = ({
  options,
  value,
  onChange,
  variant = 'segmented',
  fullWidth = false,
  disabled = false,
  size = 'medium',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (!disabled) {
      onChange(newValue);
    }
  };

  // 映射尺寸
  const getTabsSize = () => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      case 'medium':
      default: return 'medium';
    }
  };

  // 设置Material UI的variant
  const getMuiVariant = () => {
    return variant === 'tabs' ? 'standard' : 'fullWidth';
  };

  // 设置样式
  const tabsStyle = {
    width: fullWidth ? '100%' : 'auto',
    minHeight: 'auto',
    '& .MuiTabs-indicator': {
      display: variant === 'segmented' ? 'none' : 'block',
    },
    '& .MuiTabs-flexContainer': {
      gap: variant === 'segmented' ? '2px' : 0,
    },
    ...(variant === 'segmented' && {
      backgroundColor: 'background.default',
      borderRadius: 1,
      padding: '4px',
      '& .MuiTab-root': {
        borderRadius: 1,
        minHeight: 'auto',
        textTransform: 'none',
        fontWeight: 500,
        transition: 'all 0.2s',
        '&.Mui-selected': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        },
        '&:not(.Mui-selected)': {
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
      },
    }),
  };

  return (
    <Box className={className}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={fullWidth ? 'fullWidth' : getMuiVariant()}
        size={getTabsSize()}
        aria-label={ariaLabel}
        sx={tabsStyle}
        disabled={disabled}
      >
        {options.map((option) => (
          <Tab
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            iconPosition="start"
            disabled={disabled || option.disabled}
            sx={{
              minWidth: 'auto',
              padding: size === 'small' ? '6px 12px' : 
                      size === 'large' ? '12px 24px' : 
                      '8px 16px',
              fontSize: size === 'small' ? '0.75rem' : 
                       size === 'large' ? '1rem' : 
                       '0.875rem',
              '& .MuiTab-iconWrapper': {
                marginBottom: option.icon && option.label ? '4px !important' : 0,
                marginRight: option.icon && option.label ? '8px !important' : 0,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default MaterialSegmentControl; 