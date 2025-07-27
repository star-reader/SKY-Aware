import React from 'react';
import { SpinnerProps } from '../../types';
import './IOSCommonSpinner.scss';

const IOSCommonSpinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color,
  visible = true,
  label,
  variant = 'indeterminate',
  value = 0,
  thickness = 2,
  'aria-label': ariaLabel,
  className = '',
}) => {
  // Get size in pixels for iOS
  const getIOSSize = (): number => {
    switch (size) {
      case 'small':
        return 20;
      case 'medium':
        return 28;
      case 'large':
        return 36;
      default:
        return 28;
    }
  };

  // If visible is false, don't render the component
  if (!visible) {
    return null;
  }

  const spinnerSize = getIOSSize();
  const radius = (spinnerSize - thickness * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = variant === 'determinate' ? `${(value / 100) * circumference} ${circumference}` : undefined;

  const containerClasses = [
    'ios-spinner',
    `ios-spinner--${size}`,
    variant === 'determinate' && 'ios-spinner--determinate',
    className
  ].filter(Boolean).join(' ');

  const spinnerElement = (
    <div className={containerClasses}>
      <svg
        className="ios-spinner__svg"
        width={spinnerSize}
        height={spinnerSize}
        viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}
        role="progressbar"
        aria-label={ariaLabel || label || 'Loading...'}
        aria-valuenow={variant === 'determinate' ? value : undefined}
        aria-valuemin={variant === 'determinate' ? 0 : undefined}
        aria-valuemax={variant === 'determinate' ? 100 : undefined}
      >
        <circle
          className="ios-spinner__track"
          cx={spinnerSize / 2}
          cy={spinnerSize / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          className="ios-spinner__progress"
          cx={spinnerSize / 2}
          cy={spinnerSize / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
          style={{
            strokeDasharray,
            ...(color && { stroke: color }),
          }}
        />
      </svg>
    </div>
  );

  // If label is provided, wrap with container
  if (label) {
    return (
      <div className="ios-spinner-container">
        {spinnerElement}
        <span className="ios-spinner__label">
          {label}
        </span>
      </div>
    );
  }

  return spinnerElement;
};

export default IOSCommonSpinner; 