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

  const getMuiVariant = () => {
    return variant === 'tabs' ? 'standard' : 'fullWidth';
  };

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
        aria-label={ariaLabel}
        sx={tabsStyle}
      >
        {options.map((option) => {
          const tabProps: any = {
            key: option.value,
            value: option.value,
            label: option.label,
            disabled: disabled || option.disabled,
            sx: {
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
            }
          };

          if (option.icon && React.isValidElement(option.icon)) {
            tabProps.icon = option.icon;
          }

          return <Tab {...tabProps} />;
        })}
      </Tabs>
    </Box>
  );
};

export default MaterialSegmentControl; 