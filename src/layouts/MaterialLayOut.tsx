/*
* Chunhao Jin
* Material UI布局，用作除Windows外的导航栏布局
*/
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  useTheme
} from "@mui/material"
import { styled } from '@mui/material/styles'
import { useState } from "react"
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import useWindowWidth from "../hooks/common/useWindowWidth"
import constants from "../configs/constants"

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-end' : 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default () => {
    const theme = useTheme();
    // 导航栏选中的值
    const [navValue, setNavValue] = useState(0);
    const [open, setOpen] = useState(true);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < constants.mobileMaxWidth;

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    // 导航项数据
    const menuItems = [
        ['收件箱', '已加星标', '发送邮件', '草稿箱'],
        ['所有邮件', '垃圾箱', '垃圾邮件']
    ];

    return (
        <Paper elevation={0} className="fixed left-0 top-0 w-full h-full">
            {/* 移动端底部导航栏 */}
            {isMobile && (
                <div className="absolute left-0 w-full bottom-0 h-12 z-50">
                    <BottomNavigation
                        showLabels
                        value={navValue}
                        onChange={(_, newValue) => {
                            setNavValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="最近" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="收藏" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="位置" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </div>
            )}
            
            {/* 非移动端的左侧导航栏 */}
            {!isMobile && (
                <Box sx={{ display: 'flex' }}>
                    <Drawer
                        variant="permanent"
                        open={open}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            boxSizing: 'border-box',
                            ...(open && {
                                ...openedMixin(theme),
                                '& .MuiDrawer-paper': openedMixin(theme),
                            }),
                            ...(!open && {
                                ...closedMixin(theme),
                                '& .MuiDrawer-paper': closedMixin(theme),
                            }),
                        }}
                    >
                        <DrawerHeader open={open}>
                            <IconButton onClick={handleDrawerToggle}>
                                {open ? <ChevronLeftIcon /> : <MenuIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        {menuItems.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <List>
                                    {section.map((text, index) => (
                                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                            <ListItemButton
                                                selected={navValue === index}
                                                onClick={() => setNavValue(index)}
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
                                                    '& .MuiListItemIcon-root': {
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                        width: 24,
                                                        ml: open ? 0 : 'auto',
                                                    }
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={text} 
                                                    sx={{ opacity: open ? 1 : 0 }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                {sectionIndex < menuItems.length - 1 && <Divider />}
                            </div>
                        ))}
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            backgroundColor: theme.palette.background.default,
                            minHeight: '100vh'
                        }}
                    >
                        <DrawerHeader open={open} />
                        {/* 主要内容区域 */}
                        <Typography component="div">
                            这里是主要内容区域
                        </Typography>
                    </Box>
                </Box>
            )}
        </Paper>     
    )
}