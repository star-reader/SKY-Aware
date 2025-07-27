import React from 'react';
import { SegmentControlProps } from '../../types';
import './IOSCommonSegmentControl.scss';

const IOSCommonSegmentControl: React.FC<SegmentControlProps> = ({
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
  const handleOptionClick = (optionValue: string, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;
    onChange(optionValue);
  };

  const containerClasses = [
    'ios-segment-control',
    `ios-segment-control--${variant}`,
    `ios-segment-control--${size}`,
    fullWidth && 'ios-segment-control--full-width',
    disabled && 'ios-segment-control--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isOptionDisabled = disabled || option.disabled;
        
        const segmentClasses = [
          'ios-segment-control__segment',
          isSelected && 'ios-segment-control__segment--selected',
          isOptionDisabled && 'ios-segment-control__segment--disabled',
          index === 0 && 'ios-segment-control__segment--first',
          index === options.length - 1 && 'ios-segment-control__segment--last'
        ].filter(Boolean).join(' ');

        return (
          <button
            key={option.value}
            className={segmentClasses}
            onClick={() => handleOptionClick(option.value, option.disabled)}
            disabled={isOptionDisabled}
            role="tab"
            aria-selected={isSelected}
            aria-disabled={isOptionDisabled}
            tabIndex={isOptionDisabled ? -1 : 0}
          >
            {option.icon && (
              <span className="ios-segment-control__icon">
                {option.icon}
              </span>
            )}
            <span className="ios-segment-control__label">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default IOSCommonSegmentControl; 