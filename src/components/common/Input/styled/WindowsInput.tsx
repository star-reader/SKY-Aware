import React, { forwardRef } from 'react';
import { Input, Field } from '@fluentui/react-components';
import { InputProps } from '../../types';

const WindowsInput = forwardRef<HTMLInputElement, InputProps>(({
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
  const getInputType = (): any => {
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

  // 如果有 label，使用 Field 包装组件
  if (label) {
    return (
      <Field
        label={label}
        validationState={error ? 'error' : 'none'}
        className={className}
      >
        <Input
          ref={ref}
          type={getInputType()}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel || label}
          contentBefore={icon ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'var(--colorNeutralForeground3)',
              fontSize: '16px'
            }}>
              {icon}
            </div>
          ) : undefined}
          style={{
            width: '100%',
            marginBottom: '16px'
          }}
          {...props}
        />
      </Field>
    );
  }

  // 没有 label 时，直接使用 Input
  return (
    <Input
      ref={ref}
      type={getInputType()}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      contentBefore={icon ? (
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          color: 'var(--colorNeutralForeground3)',
          fontSize: '16px'
        }}>
          {icon}
        </div>
      ) : undefined}
      style={{
        width: '100%',
        marginBottom: '16px',
        ...(error && {
          borderColor: 'var(--colorPaletteRedBorder2)',
          backgroundColor: 'var(--colorPaletteRedBackground1)'
        })
      }}
      {...props}
    />
  );
});

WindowsInput.displayName = 'WindowsInput';

export default WindowsInput; 