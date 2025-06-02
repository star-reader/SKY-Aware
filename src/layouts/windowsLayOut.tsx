import { useEffect, useState } from "react"

import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
} from "@fluentui/react-nav-preview";

import {
  makeStyles,
  tokens,
  Button
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
  Info20Filled
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100vh",
    backgroundColor: "transparent"
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
    backgroundColor: "transparent"
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

// icons
const Dashboard = bundleIcon(Board20Filled, Board20Regular)
// const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular)
const MapIcon = bundleIcon(Map20Filled, Map20Regular)
const ListIcon = bundleIcon(AppsList20Filled, AppsList20Regular)
const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular)
const InfoIcon = bundleIcon(Info20Filled, Info20Regular)


export default () => {
  const styles = useStyles();

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isShowText, setIsShowText] = useState(true)


  const linkDestination = ""

  useEffect(() => {
    if (isCollapsed){
        setIsShowText(false)
    }else {
        setTimeout(() => {
            setIsShowText(!isCollapsed)
        }, 200)
    }
  }, [isCollapsed])

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="map"
        defaultSelectedCategoryValue=""
        open={true}
        type="inline"
        className={isCollapsed ? styles.navCollapsed : styles.nav}
      >
        <NavDrawerHeader>
            <Hamburger onClick={() => setIsCollapsed(!isCollapsed)} />
        </NavDrawerHeader>

        <NavDrawerBody>
          <NavItem href={linkDestination} icon={<MapIcon />} value="map">
            {isShowText && "地图"}
          </NavItem>
          <NavItem href={linkDestination} icon={<ListIcon />} value="list">
            {isShowText && "列表"}
          </NavItem>
          <NavItem href={linkDestination} icon={<Dashboard />} value="statistic">
            {isShowText && "统计"}
          </NavItem>

          <NavItem href={linkDestination} icon={<SettingsIcon />} value="settings">
            {isShowText && "设置"}
          </NavItem>
          <NavItem href={linkDestination} icon={<InfoIcon />} value="about">
            {isShowText && "关于"}
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        
        {/* 主要显示区域 */}
        <Button>MicroSoft, HugeHard</Button>

      </div>
    </div>
  );
}
