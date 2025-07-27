import React from 'react';
import { TabList, Tab, SelectTabEventHandler } from '@fluentui/react-components';
import { SegmentControlProps } from '../../types';

const WindowsSegmentControl: React.FC<SegmentControlProps> = ({
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
  const handleTabSelect = (_event: unknown, data: { value: string }) => {
    if (!disabled) {
      onChange(data.value);
    }
  };

  // 映射尺寸
  const getFluentSize = () => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      case 'medium':
      default: return 'medium';
    }
  };

  // 设置外观样式
  const appearance = variant === 'tabs' ? 'underline' : 'filled';

  const containerStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };

  return (
    <div style={containerStyle} className={className}>
      <TabList
        selectedValue={value}
        onTabSelect={handleTabSelect as SelectTabEventHandler}
        size={getFluentSize()}
        appearance={appearance as any}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <Tab
            key={option.value}
            value={option.value}
            disabled={disabled || option.disabled}
            icon={option.icon as any}
          >
            {option.label}
          </Tab>
        ))}
      </TabList>
    </div>
  );
};

export default WindowsSegmentControl; 