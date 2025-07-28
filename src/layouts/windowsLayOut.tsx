/*
* Chunhao Jin
* Windows原生Fluent UI的左侧导航栏，用作Windows版本的导航栏布局
*/

import { useEffect, useState } from "react"
import WindowsSettingPage from "../pages/SettingPage/WindowsSettingPage"

import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  OnNavItemSelectData,
} from "@fluentui/react-nav-preview";

import {
  makeStyles,
  tokens,
  Tooltip
} from "@fluentui/react-components";
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
  Code20Regular,
  Code20Filled
} from "@fluentui/react-icons";
import TestPage from "../testComponents/TestPage";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100vh",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  nav: {
    width: "135px",
    transition: "width 0.2s ease-in-out",
  },
  navCollapsed: {
    width: "60px",
    transition: "width 0.2s ease-in-out",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "auto",
    backgroundColor: tokens.colorNeutralBackground1
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
})

// Fluent Ui的icons
const Dashboard = bundleIcon(Board20Filled, Board20Regular)
const MapIcon = bundleIcon(Map20Filled, Map20Regular)
const ListIcon = bundleIcon(AppsList20Filled, AppsList20Regular)
const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular)
const InfoIcon = bundleIcon(Info20Filled, Info20Regular)
const TestIcon = bundleIcon(Code20Filled, Code20Regular)

interface WindowsLayOutProps {
  onNavTabSelect: (to: string) => void
  currentTab: string
}

export default ({ onNavTabSelect, currentTab }: WindowsLayOutProps) => {
  const styles = useStyles();

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isShowText, setIsShowText] = useState(true)

  useEffect(() => {
    if (isCollapsed){
      setIsShowText(false)
    }else {
      setTimeout(() => {
          setIsShowText(!isCollapsed)
      }, 200)
    }
  }, [isCollapsed])

  // 处理导航选择变化
  const onNavItemSelect = ( data: OnNavItemSelectData) => {
    onNavTabSelect(data.value)
  }

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="settings"
        defaultSelectedCategoryValue=""
        open={true}
        type="inline"
        className={isCollapsed ? styles.navCollapsed : styles.nav}
        onNavItemSelect={(_, data) => onNavItemSelect(data)}
      >
        <NavDrawerHeader>
          <Tooltip 
            content={isCollapsed ? "展开导航" : "收起导航"} 
            relationship="label"
            positioning="before-top">
            <Hamburger onClick={() => setIsCollapsed(!isCollapsed)} />
          </Tooltip>
        </NavDrawerHeader>

        <NavDrawerBody>
          <NavItem icon={<MapIcon />} value="map">
            {isShowText && "地图"}
          </NavItem>
          <NavItem icon={<ListIcon />} value="list">
            {isShowText && "列表"}
          </NavItem>
          <NavItem icon={<Dashboard />} value="statistic">
            {isShowText && "统计"}
          </NavItem>
          <NavItem icon={<TestIcon />} value="test">
            {isShowText && "组件"}
          </NavItem>
          <NavItem icon={<SettingsIcon />} value="settings">
            {isShowText && "设置"}
          </NavItem>
          <NavItem icon={<InfoIcon />} value="about">
            {isShowText && "关于"}
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {currentTab === 'settings' && <WindowsSettingPage />}
        {/* 主要显示区域 */}
        {/* <Button>MicroSoft, HugeHard</Button> */}
        {currentTab === 'test' && <TestPage />}

      </div>
    </div>
  )
}
