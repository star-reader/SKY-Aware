import React, { useState, forwardRef } from 'react';
import { InputProps } from '../../types';
import './IOSCommonInput.scss';

const IOSCommonInput = forwardRef<HTMLInputElement, InputProps>(({
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
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!event.target.value);
    onChange?.(event);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const containerClasses = [
    'ios-input',
    isFocused && 'ios-input--focused',
    error && 'ios-input--error',
    disabled && 'ios-input--disabled',
    hasValue && 'ios-input--has-value',
    icon && 'ios-input--with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="ios-input__label">
          {label}
        </label>
      )}
      
      <div className="ios-input__wrapper">
        {icon && (
          <div className="ios-input__icon">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel || label}
          className="ios-input__field"
          {...props}
        />
      </div>
    </div>
  );
});

IOSCommonInput.displayName = 'IOSCommonInput';

export default IOSCommonInput; 