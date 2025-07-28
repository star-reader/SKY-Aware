import { useEffect, useState } from "react";
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
import getPlatform, { PlatformType } from "../utils/getPlatform";
import WindowsNavbar from "../components/common/Navbar/styled/WindowsNavbar"
import IOSCommonNavbar from "../components/common/Navbar/styled/IOSCommonNavbar";
import MaterialNavbar from "../components/common/Navbar/styled/MaterialNavbar";
import useWindowWidth from "../hooks/common/useWindowWidth"
import constants from "../configs/constants"

/**
 * 应用基础布局
 * @author: Jerry Jin 2025-07-28
 * @description: Windows下统一使用左侧导航栏，iOS和Android、Web根据尺寸切换
 */
export default function AppLayOut() {
    const [platform, setPlatform] = useState<PlatformType>();
    const windowWidth = useWindowWidth();

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
            label: '统计',
            icon: platform === 'windows' ? <Dashboard /> : <BarChartOutlined />,
            route: '/statistics',
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
                            onItemClick={(item) => {
                                // TODO: handle navigation
                            }}
                        />
                        <div className="flex-1 overflow-auto">
                            {/* Content area */}
                        </div>
                    </div>
                ) : (platform === 'ios' || platform === 'macos') ? (
                    windowWidth < constants.mobileMaxWidth ? (
                        <div className="flex h-screen">
                            <IOSCommonNavbar
                                items={navItems}
                                position="bottom"
                                onItemClick={(item) => {
                                    // TODO: handle navigation
                                }}
                            />
                            <div className="flex-1 h-[calc(100vh-56px)] overflow-auto">
                                {/* Content area */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-screen">
                            <IOSCommonNavbar
                                items={navItems}
                                position="sidebar"
                                onItemClick={(item) => {
                                    // TODO: handle navigation
                                }}
                            />
                            <div className="flex-1 overflow-auto"></div>
                        </div>
                    )    
                ) : (
                    windowWidth < constants.mobileMaxWidth ? (
                        <div className="flex h-screen">
                            <MaterialNavbar
                                items={navItems}
                                position="bottom"
                            />
                            <div className="flex-1 h-[calc(100vh-56px)] overflow-auto">
                                {/* Content area */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-screen">
                            <MaterialNavbar
                                items={navItems}
                                position="sidebar"
                            />
                            <div className="flex-1 overflow-auto"></div>
                        </div>
                    )
                )
            }
        </>
    )
}