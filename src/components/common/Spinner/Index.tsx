import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { SpinnerProps } from '../types';
import IOSCommonSpinner from './styled/IOSCommonSpinner';
import WindowsSpinner from './styled/WindowsSpinner';
import MaterialSpinner from './styled/MaterialSpinner';
import type { Platform } from '../types';

const Spinner: React.FC<SpinnerProps> = (props) => {
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
      return <IOSCommonSpinner {...props} />;
    case 'windows':
      return <WindowsSpinner {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialSpinner {...props} />;
  }
};

export default Spinner; 