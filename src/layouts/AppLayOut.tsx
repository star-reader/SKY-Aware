/**
 * 应用基础布局
 * @author: Jerry Jin 2025-07-28
 * @description: Windows下统一使用左侧导航栏，iOS和Android、Web根据尺寸切换
 */

import { CSSProperties, useEffect, useState } from "react";
import { MapOutlined, ListAltOutlined, SettingsOutlined, BarChartOutlined, InfoOutlined } from '@mui/icons-material';
import {
    Board20Filled,
    Board20Regular,
    Map20Regular,
    Map20Filled,
    bundleIcon,
    AppsList20Regular,
    AppsList20Filled,
    Settings20Filled,
    Settings20Regular,
    Info20Regular,
    Info20Filled,
  } from "@fluentui/react-icons";
import pubsub from "pubsub-js"
import getPlatform, { PlatformType } from "../utils/getPlatform";
import WindowsNavbar from "../components/common/Navbar/styled/WindowsNavbar"
import IOSCommonNavbar from "../components/common/Navbar/styled/IOSCommonNavbar";
import MaterialNavbar from "../components/common/Navbar/styled/MaterialNavbar";
import useWindowWidth from "../hooks/common/useWindowWidth"
import constants from "../configs/constants"
// 页面组件
import MapPage from "../pages/MapPage/IndexMapPage";
import SettingPage from "../pages/SettingPage/IndexSettingPage";
import ListPage from "../pages/ListPage/IndexListPage";

/**
 * 根据currentTab显示不同的内容，使用style属性控制显示与隐藏，而不是控制组件是否渲染
 */
const ContentArea = ({ currentTab, platform }: { currentTab: string, platform: string | undefined }) => {

    const positionStyle: CSSProperties = {
        'position': 'relative',
        'width': '100%',
        'height': '100%',
    }

    return (
        <>
            <div style={{ display: currentTab === '地图' ? 'block' : 'none', ...positionStyle }}>
                <MapPage platform={platform} />
            </div>
            <div style={{ display: currentTab === '列表' ? 'block' : 'none', ...positionStyle }}>
                <ListPage />
            </div>
            <div style={{ display: currentTab === '活动' ? 'block' : 'none', ...positionStyle }}>活动</div>
            <div style={{ display: currentTab === '设置' ? 'block' : 'none', ...positionStyle }}>
                <SettingPage />
            </div>
            <div style={{ display: currentTab === '关于' ? 'block' : 'none', ...positionStyle }}>关于</div>
            
        </>
    )
}

/**
 * 基础总布局
 * @description 根据平台和尺寸确定的布局方案
 */
export default function AppLayOut() {
    const [platform, setPlatform] = useState<PlatformType>()
    const [currentTab, setCurrentTab] = useState<string>('地图')
    const windowWidth = useWindowWidth();

    const handleNavItemClick = (item: any) => {
        setCurrentTab(item.label)
    }

    useEffect(() => {
        pubsub.publish('current-tab', currentTab)
    }, [currentTab])


    // fluent 图标
    const Dashboard = bundleIcon(Board20Filled, Board20Regular)
    const MapIcon = bundleIcon(Map20Filled, Map20Regular)
    const ListIcon = bundleIcon(AppsList20Filled, AppsList20Regular)
    const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular)
    const InfoIcon = bundleIcon(Info20Filled, Info20Regular)

    useEffect(() => {
        getPlatform().then((platform) => {
            setPlatform(platform);
        });
    }, []);

    // 每一项
    const navItems = [
        {
          label: '地图',
          // Windows用fluent的icon，其他用mui的icon
          icon: platform === 'windows' ? <MapIcon /> : <MapOutlined />,
          route: '/map'
        },
        {
          label: '列表',
          icon: platform === 'windows' ? <ListIcon /> : <ListAltOutlined />,
          route: '/list',
        },
        {
            label: '活动',
            icon: platform === 'windows' ? <Dashboard /> : <BarChartOutlined />,
            route: '/activity',
        },
        {
            label: '设置',
            icon: platform === 'windows' ? <SettingsIcon /> : <SettingsOutlined />,
            route: '/settings', 
        },
        {
            label: '关于',
            icon: platform === 'windows' ? <InfoIcon /> : <InfoOutlined />,
            route: '/about',
        } 
      ]

    return (
        <>
            {
                platform === 'windows' ? (
                    <div className="flex h-screen">
                        <WindowsNavbar
                            items={navItems}
                            position="sidebar"
                            onItemClick={handleNavItemClick}
                        />
                        <div className="flex-1 overflow-auto page-container">
                            <ContentArea currentTab={currentTab} platform={platform} />
                        </div>
                    </div>
                ) : (platform === 'ios' || platform === 'macos') ? (
                    windowWidth < constants.mobileMaxWidth ? (
                        <div className="flex h-screen">
                            <IOSCommonNavbar
                                items={navItems}
                                position="bottom"
                                activeItem={currentTab}
                                onItemClick={handleNavItemClick}
                            />
                            <div className="flex-1 h-[calc(100vh-50px)] overflow-auto page-container">
                                <ContentArea currentTab={currentTab} platform={platform} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-screen">
                            <IOSCommonNavbar
                                items={navItems}
                                position="sidebar"
                                onItemClick={handleNavItemClick}
                                activeItem={currentTab}
                            />
                            <div className="flex-1 overflow-auto page-container">
                                <ContentArea currentTab={currentTab} platform={platform} />
                            </div>
                        </div>
                    )    
                ) : (
                    windowWidth < constants.mobileMaxWidth ? (
                        <div className="flex h-screen material-navbar-container">
                            <MaterialNavbar
                                items={navItems}
                                position="bottom"
                                onItemClick={handleNavItemClick}
                            />
                            <div className="flex-1 h-[calc(100vh-50px)] overflow-auto page-container">
                                <ContentArea currentTab={currentTab} platform={platform} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-screen">
                            <MaterialNavbar
                                items={navItems}
                                position="sidebar"
                                onItemClick={handleNavItemClick}
                            />
                            <div className="flex-1 overflow-auto page-container">
                                <ContentArea currentTab={currentTab} platform={platform} />
                            </div>
                        </div>
                    )
                )
            }
        </>
    )
}