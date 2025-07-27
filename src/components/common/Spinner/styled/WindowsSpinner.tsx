import React from 'react';
import { Spinner, Field } from '@fluentui/react-components';
import { SpinnerProps } from '../../types';

const WindowsSpinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  visible = true,
  label,
  variant = 'indeterminate',
  'aria-label': ariaLabel,
  className = '',
}) => {
  // Map our size to Fluent UI size
  const getFluentSize = (): 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge' => {
    switch (size) {
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  // Fluent UI Spinner doesn't have determinate variant, always indeterminate
  // If visible is false, don't render the component
  if (!visible) {
    return null;
  }

  // If label is provided, wrap with Field component
  if (label) {
    return (
      <Field 
        label={label}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Spinner
          size={getFluentSize()}
          aria-label={ariaLabel || label}
          style={{
            color: 'var(--colorBrandForeground1)',
          }}
        />
      </Field>
    );
  }

  return (
    <Spinner
      size={getFluentSize()}
      aria-label={ariaLabel}
      className={className}
      style={{
        color: 'var(--colorBrandForeground1)',
      }}
    />
  );
};

export default WindowsSpinner; 