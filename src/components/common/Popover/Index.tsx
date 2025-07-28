import React, { useState, useEffect } from 'react';
import { PopoverProps } from '../types';
import getPlatform, { PlatformType } from '../../../utils/getPlatform';
import IOSCommonPopover from './styled/IOSCommonPopover';
import WindowsPopover from './styled/WindowsPopover';
import MaterialPopover from './styled/MaterialPopover';

const Popover: React.FC<PopoverProps> = (props) => {
  const [platform, setPlatform] = useState<PlatformType>('web');

  useEffect(() => {
    getPlatform().then(setPlatform);
  }, []);

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonPopover {...props} />;
    case 'windows':
      return <WindowsPopover {...props} />;
    case 'web':
    case 'android':
    default:
      return <MaterialPopover {...props} />;
  }
};

export default Popover; 