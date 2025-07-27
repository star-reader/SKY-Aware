import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { InputProps } from '../types';
import IOSCommonInput from './styled/IOSCommonInput';
import WindowsInput from './styled/WindowsInput';
import MaterialInput from './styled/MaterialInput';
import type { Platform } from '../types';

const Input: React.FC<InputProps> = (props) => {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const detectPlatform = async () => {
      const detectedPlatform = await getPlatform();
      setPlatform(detectedPlatform);
    };
    
    detectPlatform();
  }, []);

  // Don't render anything while detecting platform
  if (!platform) {
    return null;
  }

  // Render platform-specific Input
  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonInput {...props} />;
    case 'windows':
      return <WindowsInput {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialInput {...props} />;
  }
};

export default Input; 