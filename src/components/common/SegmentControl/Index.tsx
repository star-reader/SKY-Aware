import React, { useState, useEffect } from 'react';
import { SegmentControlProps } from '../types';
import getPlatform, { PlatformType } from '../../../utils/getPlatform';
import IOSCommonSegmentControl from './styled/IOSCommonSegmentControl';
import WindowsSegmentControl from './styled/WindowsSegmentControl';
import MaterialSegmentControl from './styled/MaterialSegmentControl';

const SegmentControl: React.FC<SegmentControlProps> = (props) => {
  const [platform, setPlatform] = useState<PlatformType>('web');

  useEffect(() => {
    getPlatform().then(setPlatform);
  }, []);

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonSegmentControl {...props} />;
    case 'windows':
      return <WindowsSegmentControl {...props} />;
    case 'web':
    case 'android':
    default:
      return <MaterialSegmentControl {...props} />;
  }
};

export default SegmentControl; 