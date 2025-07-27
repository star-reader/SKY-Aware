import React from 'react';
import { ButtonProps } from '../types';
import { getPlatform } from '../../../utils/getPlatform';
import IOSCommonButton from './styled/IOSCommonButton';
import IOSLiquidGlassButton from './styled/IOSLiquidGlassButton';
import WindowsButton from './styled/WindowsButton';
import MaterialButton from './styled/MaterialButton';

interface ExtendedButtonProps extends ButtonProps {
  liquidGlass?: boolean; // 新增属性来强制使用 Liquid Glass
}

const Button: React.FC<ExtendedButtonProps> = (props) => {
  const platform = getPlatform();

  // 如果明确指定使用 liquidGlass，优先使用 Liquid Glass Button
  if (props.liquidGlass && (platform === 'ios' || platform === 'macos')) {
    return <IOSLiquidGlassButton {...props} />;
  }

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonButton {...props} />;
    case 'windows':
      return <WindowsButton {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialButton {...props} />;
  }
};

export default Button; 