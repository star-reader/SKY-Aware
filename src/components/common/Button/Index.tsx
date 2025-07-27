import React, { useEffect, useState } from 'react';
import { ButtonProps, Platform } from '../types';
import getPlatform from '../../../utils/getPlatform';
import IOSCommonButton from './styled/IOSCommonButton'; 
import WindowsButton from './styled/WindowsButton';
import MaterialButton from './styled/MaterialButton';

interface ExtendedButtonProps extends ButtonProps {
  liquidGlass?: boolean;
}

const Button: React.FC<ExtendedButtonProps> = (props) => {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    getPlatform().then(platformType => {
      setPlatform(platformType);
    });
  }, []);

  switch (platform) {
    case 'ios':
      return <IOSCommonButton {...props} />;
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

export default Button