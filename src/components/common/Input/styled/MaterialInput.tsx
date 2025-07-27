import React, { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { InputProps } from '../../types';

const MaterialInput = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  label,
  icon,
  className = '',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // Map our InputType to MUI type
  const getInputType = (): string => {
    switch (type) {
      case 'text':
        return 'text';
      case 'password':
        return 'password';
      case 'email':
        return 'email';
      case 'number':
        return 'number';
      default:
        return 'text';
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <TextField
      ref={ref}
      type={getInputType()}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      label={label}
              className={className}
        fullWidth
        variant="outlined"
        margin="dense"
        size="small"
        InputLabelProps={{
          shrink: !!value || !!placeholder, // 有值或有placeholder时收缩标签
        }}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: error ? 'error.main' : 'action.active',
              fontSize: '16px'
            }}>
              {icon}
            </div>
          </InputAdornment>
        ) : undefined,
        'aria-label': ariaLabel || label,
      }}
      sx={{
        marginBottom: '12px',
        '& .MuiOutlinedInput-root': {
          minHeight: '40px',
          '& fieldset': {
            borderRadius: '6px',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '14px',
        },
        '& .MuiOutlinedInput-input': {
          fontSize: '14px',
          padding: '10px 14px',
          height: '20px',
        },
        ...(icon && {
          '& .MuiOutlinedInput-input': {
            paddingLeft: '8px',
          },
        }),
      }}
      {...props}
    />
  );
});

MaterialInput.displayName = 'MaterialInput';

export default MaterialInput; 