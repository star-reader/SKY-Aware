import React, { useState, useEffect } from 'react';
import { DialogProps } from '../types';
import getPlatform, { PlatformType } from '../../../utils/getPlatform';
import IOSCommonDialog from './styled/IOSCommonDialog';
import WindowsDialog from './styled/WindowsDialog';
import MaterialDialog from './styled/MaterialDialog';

const Dialog: React.FC<DialogProps> = (props) => {
  const [platform, setPlatform] = useState<PlatformType>('web');

  useEffect(() => {
    getPlatform().then(setPlatform);
  }, []);

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonDialog {...props} />;
    case 'windows':
      return <WindowsDialog {...props} />;
    case 'web':
    case 'android':
    default:
      return <MaterialDialog {...props} />;
  }
};

export default Dialog; 