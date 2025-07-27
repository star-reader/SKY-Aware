import React from 'react';
import { 
  Dropdown, 
  Field, 
  Option,
  DropdownProps as FluentDropdownProps 
} from '@fluentui/react-components';
import { DropdownProps, DropdownOption } from '../../types';

const WindowsDropdown: React.FC<DropdownProps> = ({
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
  const handleSelectionChange: FluentDropdownProps['onSelectionChange'] = (event, data) => {
    if (onSelectionChange) {
      const selectedOptions = data.selectedOptions;
      
      if (multiSelect) {
        const selectedItems = options.filter(option => 
          selectedOptions.includes(option.key)
        );
        const selectedValues = selectedItems.map(item => item.value || item.key);
        onSelectionChange(selectedItems, selectedValues);
      } else {
        const selectedKey = data.value;
        const selectedOption = options.find(option => option.key === selectedKey);
        const selectedValue = selectedOption?.value || selectedKey;
        onSelectionChange(selectedOption, selectedValue as string);
      }
    }
  };

  const getSelectedOptions = (): string[] => {
    if (multiSelect && Array.isArray(value)) {
      return value;
    } else if (!multiSelect && typeof value === 'string') {
      return [value];
    } else if (multiSelect && Array.isArray(defaultValue)) {
      return defaultValue;
    } else if (!multiSelect && typeof defaultValue === 'string') {
      return [defaultValue];
    }
    return [];
  };

  const dropdownElement = (
    <Dropdown
      multiselect={multiSelect}
      placeholder={placeholder}
      disabled={disabled}
      value={multiSelect ? undefined : (value as string) || (defaultValue as string)}
      selectedOptions={getSelectedOptions()}
      onSelectionChange={handleSelectionChange}
      aria-label={ariaLabel}
      className={className}
      style={{
        width: '100%',
        minWidth: '200px',
      }}
    >
      {options.map((option) => (
        <Option
          key={option.key}
          value={option.key}
          disabled={option.disabled}
          text={option.text}
        >
          {option.text}
        </Option>
      ))}
    </Dropdown>
  );

  if (label) {
    return (
      <Field
        label={label}
        required={required}
        validationState={error ? 'error' : 'none'}
        validationMessage={error ? errorMessage : undefined}
        style={{
          width: '100%',
          marginBottom: '16px',
        }}
      >
        {dropdownElement}
      </Field>
    );
  }

  return dropdownElement;
};

export default WindowsDropdown; 