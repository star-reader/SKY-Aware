import React from 'react';
import { ButtonProps } from '../types';
import { getPlatform } from '../../../utils/getPlatform';
import IOSCommonButton from './styled/IOSCommonButton';
import WindowsButton from './styled/WindowsButton';
import MaterialButton from './styled/MaterialButton';

const Button: React.FC<ButtonProps> = (props) => {
  const platform = getPlatform();

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