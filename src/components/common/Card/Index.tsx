import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { CardProps } from '../types';
import IOSCommonCard from './styled/IOSCommonCard';
import WindowsCard from './styled/WindowsCard';
import MaterialCard from './styled/MaterialCard';
import type { Platform } from '../types';

const Card: React.FC<CardProps> = (props) => {
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
      return <IOSCommonCard {...props} />;
    case 'windows':
      return <WindowsCard {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialCard {...props} />;
  }
};

export default Card; 