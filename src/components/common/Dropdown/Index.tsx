import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { DropdownProps } from '../types';
import IOSCommonDropdown from './styled/IOSCommonDropdown';
import WindowsDropdown from './styled/WindowsDropdown';
import MaterialDropdown from './styled/MaterialDropdown';
import type { Platform } from '../types';

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const detectPlatform = async () => {
      const detectedPlatform = await getPlatform();
      setPlatform(detectedPlatform);
    };
    
    detectPlatform();
  }, []);

  if (!platform) {
    return null;
  }

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonDropdown {...props} />;
    case 'windows':
      return <WindowsDropdown {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialDropdown {...props} />;
  }
};

export default Dropdown; 