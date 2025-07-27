import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { AlertProps } from '../types';
import IOSCommonAlert from './styled/IOSCommonAlert';
import WindowsAlert from './styled/WindowsAlert';
import MaterialAlert from './styled/MaterialAlert';
import type { Platform } from '../types';

const Alert: React.FC<AlertProps> = (props) => {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const detectPlatform = async () => {
      const detectedPlatform = await getPlatform();
      setPlatform(detectedPlatform);
    };
    
    detectPlatform();
  }, []);

  // Show nothing while detecting platform
  if (!platform) {
    return null;
  }

  // Render platform-specific Alert
  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonAlert {...props} />;
    case 'windows':
      return <WindowsAlert {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialAlert {...props} />;
  }
};

export default Alert; 