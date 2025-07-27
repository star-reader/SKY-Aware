import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Box,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { DropdownProps, DropdownOption } from '../../types';

const MaterialDropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  multiSelect = false,
  label,
  error = false,
  errorMessage,
  required = false,
  onSelectionChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    if (onSelectionChange) {
      const selectedValue = event.target.value;
      
      if (multiSelect && Array.isArray(selectedValue)) {
        const selectedOptions = options.filter(option => 
          selectedValue.includes(option.key)
        );
        const selectedValues = selectedOptions.map(item => item.value || item.key);
        onSelectionChange(selectedOptions, selectedValues);
      } else if (!multiSelect && typeof selectedValue === 'string') {
        const selectedOption = options.find(option => option.key === selectedValue);
        const selectedVal = selectedOption?.value || selectedValue;
        onSelectionChange(selectedOption, selectedVal as string);
      }
    }
  };

  const getCurrentValue = (): string | string[] => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return multiSelect ? [] : '';
  };

  const labelId = label ? `${label.toLowerCase().replace(/\s+/g, '-')}-label` : undefined;

  return (
    <FormControl 
      fullWidth 
      error={error} 
      required={required}
      disabled={disabled}
      className={className}
      size="small"
      margin="dense"
    >
      {label && (
        <InputLabel 
          id={labelId}
          sx={{ fontSize: '14px' }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        labelId={labelId}
        value={getCurrentValue()}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        multiple={multiSelect}
        disabled={disabled}
        displayEmpty={!!placeholder}
        aria-label={ariaLabel || label}
        sx={{
          minHeight: '40px',
          borderRadius: '6px',
          fontSize: '14px',
          '& .MuiSelect-select': {
            padding: '10px 14px',
            minHeight: 'unset',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '6px',
          },
        }}
        renderValue={multiSelect ? (selected) => {
          if (!Array.isArray(selected) || selected.length === 0) {
            return <span style={{ color: '#999', fontSize: '14px' }}>{placeholder}</span>;
          }
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => {
                const option = options.find(opt => opt.key === value);
                return (
                  <Chip
                    key={value}
                    label={option?.text || value}
                    size="small"
                    sx={{ fontSize: '12px', height: '24px' }}
                  />
                );
              })}
            </Box>
          );
        } : undefined}
      >
        {placeholder && !label && (
          <MenuItem disabled value="">
            <span style={{ color: '#999', fontSize: '14px' }}>{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.key}
            value={option.key}
            disabled={option.disabled}
            sx={{ fontSize: '14px' }}
          >
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {error && errorMessage && (
        <FormHelperText sx={{ fontSize: '12px' }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default MaterialDropdown; 