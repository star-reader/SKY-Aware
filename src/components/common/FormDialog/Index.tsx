import React, { useState, useEffect } from 'react';
import { FormDialogProps } from '../types';
import getPlatform, { PlatformType } from '../../../utils/getPlatform';
import IOSCommonFormDialog from './styled/IOSCommonFormDialog';
import WindowsFormDialog from './styled/WindowsFormDialog';
import MaterialFormDialog from './styled/MaterialFormDialog';

const FormDialog: React.FC<FormDialogProps> = (props) => {
  const [platform, setPlatform] = useState<PlatformType>('web');

  useEffect(() => {
    getPlatform().then(setPlatform);
  }, []);

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonFormDialog {...props} />;
    case 'windows':
      return <WindowsFormDialog {...props} />;
    case 'web':
    case 'android':
    default:
      return <MaterialFormDialog {...props} />;
  }
};

export default FormDialog; 