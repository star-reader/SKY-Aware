import React from 'react';
import { NavbarProps } from '../types';
import getPlatform from '../../../utils/getPlatform';
import IOSCommonNavbar from './styled/IOSCommonNavbar';
import WindowsNavbar from './styled/WindowsNavbar';
import MaterialNavbar from './styled/MaterialNavbar';

const Navbar: React.FC<NavbarProps> = (props) => {
  const [platform, setPlatform] = React.useState<string>('');

  React.useEffect(() => {
    getPlatform().then(platformType => {
      setPlatform(platformType);
    });
  }, []);

  switch (platform) {
    case 'ios':
    case 'macos':
      return <IOSCommonNavbar {...props} />;
    case 'windows':
      return <WindowsNavbar {...props} />;
    case 'android':
    case 'web':
    default:
      return <MaterialNavbar {...props} />;
  }
};

export default Navbar; 