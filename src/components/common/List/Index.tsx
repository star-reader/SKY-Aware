import React, { useState, useEffect } from 'react';
import getPlatform from '../../../utils/getPlatform';
import { ListProps } from '../types';
import IOSCommonList from './styled/IOSCommonList';
import WindowsList from './styled/WindowsList';
import MaterialList from './styled/MaterialList';
import type { Platform } from '../types';

const List: React.FC<ListProps> = (props) => {
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

  // Render platform-specific List
  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonList {...props} />;
    case 'windows':
      return <WindowsList {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialList {...props} />;
  }
};

export default List; 