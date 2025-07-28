import React from 'react';
import { Spinner, Field } from '@fluentui/react-components';
import { SpinnerProps } from '../../types';

const WindowsSpinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  visible = true,
  label,
  'aria-label': ariaLabel,
  className = '',
}) => {
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

  if (!visible) {
    return null;
  }

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