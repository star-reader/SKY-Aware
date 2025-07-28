import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { PanelProps } from '../types';
import IOSCommonPanel from './styled/IOSCommonPanel';
import WindowsPanel from './styled/WindowsPanel';
import MaterialPanel from './styled/MaterialPanel';
import type { Platform } from '../types';

const Panel: React.FC<PanelProps> = (props) => {
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
      return <IOSCommonPanel {...props} />;
    case 'windows':
      return <WindowsPanel {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialPanel {...props} />;
  }
};

export default Panel; 