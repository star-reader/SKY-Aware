import { useState, useEffect } from 'react';
import getPlatform, { PlatformType } from '../../utils/getPlatform';
import WindowsSettingPage from './WindowsSettingPage';
import MaterialSettingPage from './MaterialSettingPage';
import IOSSettingPage from './IOSSettingPage';

export default () => {
    const [platform, setPlatform] = useState<PlatformType>('web');

    useEffect(() => {
        getPlatform().then(setPlatform);
    }, []);

    if (!platform) {
        return null;
    }

    switch (platform) {
        case 'windows':
            return <WindowsSettingPage />
        case 'ios':
            return <IOSSettingPage system='ios' />
        case 'macos':
            return <IOSSettingPage system='macos' />
        default:
            return <MaterialSettingPage />
    }
}