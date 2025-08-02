import { useState } from "react"
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Chip,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment
} from "@mui/material"
import {
  Close as CloseIcon,
  Flight as FlightIcon,
  Headset as HeadsetIcon,
  Info as InfoIcon,
  Route as RouteIcon,
  Search as SearchIcon
} from "@mui/icons-material"

import getControllerRating from '../../utils/getControllerRating'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2 } }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

interface MaterialListPageProps {
  onlineFlights: OnlineFlight[]
  onlineControllers: OnlineController[]
  listLayoutType?: 'horizontal' | 'vertical'
}

export default function MaterialListPage({ onlineFlights, onlineControllers, listLayoutType = 'horizontal' }: MaterialListPageProps) {
  const [tabValue, setTabValue] = useState(0)
  const [selectedItem, setSelectedItem] = useState<OnlineFlight | OnlineController | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleItemClick = (item: OnlineFlight | OnlineController) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedItem(null)
  }

  // 搜索过滤函数
  const filterItems = <T extends OnlineFlight | OnlineController>(items: T[]): T[] => {
    if (!searchQuery.trim()) return items
    
    const query = searchQuery.toLowerCase().trim()
    return items.filter(item => 
      item.callsign.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.cid.toString().includes(query)
    )
  }

  const filteredFlights = filterItems(onlineFlights)
  const filteredControllers = filterItems(onlineControllers)

  const renderFlightCard = (flight: OnlineFlight) => (
    <Box 
      key={flight.session_id}
      sx={{ 
        width: listLayoutType === 'vertical' 
          ? { xs: '50%', sm: '33.33%', md: '25%', lg: '20%' }
          : { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
        p: { xs: 0.5, sm: 1 },
        aspectRatio: listLayoutType === 'vertical' ? '3/4.5' : 'auto'
      }}
    >
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, elevation 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            elevation: 4
          }
        }}
        onClick={() => handleItemClick(flight)}
      >
        <CardContent sx={{ 
          pb: 1, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          ...(listLayoutType === 'vertical' && { textAlign: 'center' })
        }}>
          {listLayoutType === 'vertical' ? (
            <>
              {/* 垂直布局 */}
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  color="primary"
                  sx={{ 
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: 0.25,
                    lineHeight: 1.2
                  }}
                >
                  {flight.callsign}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem',
                    lineHeight: 1.2
                  }}
                >
                  {flight.name}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Chip 
                  label={flight.flight_plan?.aircraft || 'N/A'} 
                  size="small" 
                  color="primary"
                  sx={{ fontSize: '0.7rem', height: '20px' }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, flex: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    高度
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.825rem', lineHeight: 1.1 }}>
                    {flight.altitude.toLocaleString()} ft
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    地速
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.825rem', lineHeight: 1.1 }}>
                    {flight.groundspeed} kts
                  </Typography>
                </Box>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    航线
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.75rem', lineHeight: 1.1 }}>
                    {flight.flight_plan?.departure || 'N/A'} → {flight.flight_plan?.arrival || 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <>
              {/* 水平布局 */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    color="primary"
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {flight.callsign}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {flight.name}
                  </Typography>
                </Box>
                <Chip 
                  label={flight.flight_plan?.aircraft || 'N/A'} 
                  size="small" 
                  color="primary"
                  sx={{ ml: 1, flexShrink: 0 }}
                />
              </Box>
              
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    高度: <strong>{flight.altitude.toLocaleString()} ft</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    地速: <strong>{flight.groundspeed} kts</strong>
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    出发: <strong>{flight.flight_plan?.departure || 'N/A'}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    到达: <strong>{flight.flight_plan?.arrival || 'N/A'}</strong>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )

  const renderControllerCard = (controller: OnlineController) => (
    <Box 
      key={controller.session_id}
      sx={{ 
        width: listLayoutType === 'vertical' 
          ? { xs: '50%', sm: '33.33%', md: '25%', lg: '20%' }
          : { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
        p: { xs: 0.5, sm: 1 },
        aspectRatio: listLayoutType === 'vertical' ? '3/4.5' : 'auto'
      }}
    >
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, elevation 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            elevation: 4
          }
        }}
        onClick={() => handleItemClick(controller)}
      >
        <CardContent sx={{ 
          pb: 1, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          ...(listLayoutType === 'vertical' && { textAlign: 'center' })
        }}>
          {listLayoutType === 'vertical' ? (
            <>
              {/* 垂直布局 */}
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  color="primary"
                  sx={{ 
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: 0.25,
                    lineHeight: 1.2
                  }}
                >
                  {controller.callsign}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem',
                    lineHeight: 1.2
                  }}
                >
                  {controller.name}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Chip 
                  label={controller.frequency} 
                  size="small" 
                  color="success"
                  sx={{ fontSize: '0.65rem', height: '18px' }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, flex: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    频率
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.825rem', lineHeight: 1.1 }}>
                    {controller.frequency}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    等级
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.825rem', lineHeight: 1.1 }}>
                    {getControllerRating(controller.rating)}
                  </Typography>
                </Box>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    mb: 0.25
                  }}>
                    范围
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.825rem', lineHeight: 1.1 }}>
                    {controller.visual_range} nm
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <>
              {/* 水平布局 */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    color="primary"
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {controller.callsign}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {controller.name}
                  </Typography>
                </Box>
                <Chip 
                  label={controller.frequency} 
                  size="small" 
                  color="success"
                  sx={{ ml: 1, flexShrink: 0 }}
                />
              </Box>
              
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    频率: <strong>{controller.frequency}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    等级: <strong>{getControllerRating(controller.rating)}</strong>
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    服务器: <strong>{controller.server}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    范围: <strong>{controller.visual_range} nm</strong>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )

  const renderFlightDetails = (flight: OnlineFlight) => (
    <Box sx={{ p: 2 }}>
      {/* 头部信息 */}
      <Box sx={{ mb: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {flight.callsign}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {flight.name}
        </Typography>
        <Chip 
          label={flight.flight_plan?.aircraft || 'N/A'} 
          size="small" 
          variant="outlined"
          sx={{ mt: 0.5 }}
        />
      </Box>

      {/* 飞行数据 */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" gutterBottom color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <FlightIcon sx={{ fontSize: 20 }} />
          飞行信息
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="高度" 
              secondary={`${flight.altitude.toLocaleString()} ft`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="地速" 
              secondary={`${flight.groundspeed} kts`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="航向" 
              secondary={`${Math.round(flight.heading)}°`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="应答机" 
              secondary={flight.transponder.toString().padStart(4, '0')}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="坐标" 
              secondary={`${flight.latitude.toFixed(4)}, ${flight.longitude.toFixed(4)}`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="CID" 
              secondary={flight.cid}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="服务器" 
              secondary={flight.server}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
        </List>
      </Box>

      {/* 飞行计划 */}
      {flight.flight_plan && (
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h6" gutterBottom color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <RouteIcon sx={{ fontSize: 20 }} />
            飞行计划
          </Typography>
          <List dense>
            <ListItem sx={{ py: 0.25, px: 0 }}>
              <ListItemText 
                primary="出发" 
                secondary={flight.flight_plan.departure || 'N/A'}
                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={{ py: 0.25, px: 0 }}>
              <ListItemText 
                primary="到达" 
                secondary={flight.flight_plan.arrival || 'N/A'}
                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={{ py: 0.25, px: 0 }}>
              <ListItemText 
                primary="飞行规则" 
                secondary={flight.flight_plan.flight_rules}
                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
              />
            </ListItem>
            {flight.flight_plan.cruise_tas && (
              <>
                <Divider variant="middle" />
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText 
                    primary="巡航真空速" 
                    secondary={`${flight.flight_plan.cruise_tas} kts`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
                  />
                </ListItem>
              </>
            )}
            {flight.flight_plan.altitude && (
              <>
                <Divider variant="middle" />
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText 
                    primary="巡航高度" 
                    secondary={`${flight.flight_plan.altitude} ft`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
                  />
                </ListItem>
              </>
            )}
            {flight.flight_plan.alternate && (
              <>
                <Divider variant="middle" />
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText 
                    primary="备降机场" 
                    secondary={flight.flight_plan.alternate}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium', color: 'text.primary' }}
                  />
                </ListItem>
              </>
            )}
            {flight.flight_plan.route && (
              <>
                <Divider variant="middle" />
                <ListItem sx={{ py: 0.25, px: 0, alignItems: 'flex-start' }}>
                  <ListItemText 
                    primary="航路" 
                    secondary={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'monospace',
                          wordBreak: 'break-all',
                          lineHeight: 1.4,
                          mt: 0.5
                        }}
                      >
                        {flight.flight_plan.route}
                      </Typography>
                    }
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  />
                </ListItem>
              </>
            )}
            {flight.flight_plan.remarks && (
              <>
                <Divider variant="middle" />
                <ListItem sx={{ py: 0.25, px: 0, alignItems: 'flex-start' }}>
                  <ListItemText 
                    primary="备注" 
                    secondary={
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {flight.flight_plan.remarks}
                      </Typography>
                    }
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      )}
    </Box>
  )

  const renderControllerDetails = (controller: OnlineController) => (
    <Box sx={{ p: 2 }}>
      {/* 头部信息 */}
      <Box sx={{ mb: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {controller.callsign}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {controller.name}
        </Typography>
        <Chip 
          label={controller.frequency} 
          size="small" 
          variant="outlined"
          sx={{ mt: 0.5 }}
        />
      </Box>

      {/* 管制信息 */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" gutterBottom color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <HeadsetIcon sx={{ fontSize: 20 }} />
          管制信息
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="呼号" 
              secondary={controller.callsign}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="管制员" 
              secondary={controller.name}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="CID" 
              secondary={controller.cid}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="频率" 
              secondary={controller.frequency}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          {/* <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="频率" 
              secondary={controller.frequency}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem> */}
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="等级" 
              secondary={getControllerRating(controller.rating)}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="服务器" 
              secondary={controller.server}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="管制范围" 
              secondary={`${controller.visual_range} nm`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem sx={{ py: 0.25, px: 0 }}>
            <ListItemText 
              primary="坐标" 
              secondary={`${controller.latitude.toFixed(4)}, ${controller.longitude.toFixed(4)}`}
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              secondaryTypographyProps={{ variant: 'body2', fontWeight: 'medium', color: 'text.primary' }}
            />
          </ListItem>
        </List>
      </Box>

      {/* ATIS信息 */}
      {controller.text_atis && controller.text_atis.length > 0 && (
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h6" gutterBottom color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <InfoIcon sx={{ fontSize: 20 }} />
            ATIS信息
          </Typography>
          <List dense>
            <ListItem sx={{ py: 0.25, px: 0, alignItems: 'flex-start' }}>
              <ListItemText 
                primary="ATIS" 
                secondary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'monospace',
                      lineHeight: 1.3,
                      whiteSpace: 'pre-line',
                      mt: 0.5
                    }}
                  >
                    {controller.text_atis.join('\n')}
                  </Typography>
                }
                primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  )

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      {/* 头部 */}
      <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 1, sm: 2 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          在线列表
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          当前在线: {onlineFlights.length} 架航班, {onlineControllers.length} 个管制席位
          {searchQuery && (
            <> | 筛选结果: {filteredFlights.length} 架航班, {filteredControllers.length} 个管制席位</>
          )}
        </Typography>
        
        {/* 搜索框 */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="搜索呼号、姓名或CID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ 
              maxWidth: 400,
              '& .MuiOutlinedInput-root': {
                height: '36px',
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      {/* 标签页 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2, sm: 3 } }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="在线列表标签页"
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab 
            icon={<Badge color="primary"><FlightIcon /></Badge>}
            label="机组"
            iconPosition={isSmall ? "top" : "start"}
            {...a11yProps(0)} 
          />
          <Tab 
            icon={<Badge color="success"><HeadsetIcon /></Badge>}
            label="管制员"
            iconPosition={isSmall ? "top" : "start"}
            {...a11yProps(1)} 
          />
        </Tabs>
      </Box>

      {/* 内容区域 */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <TabPanel value={tabValue} index={0}>
          <Box display="flex" flexWrap="wrap">
            {filteredFlights.map(renderFlightCard)}
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box display="flex" flexWrap="wrap">
            {filteredControllers.map(renderControllerCard)}
          </Box>
        </TabPanel>
      </Box>

      {/* 详情抽屉 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400, md: 480 },
            maxWidth: '100vw',
            bgcolor: 'background.default'
          }
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText'
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {selectedItem && 'callsign' in selectedItem 
                ? `${selectedItem.callsign} - 飞行详情`
                : selectedItem 
                  ? `${(selectedItem as OnlineController).callsign} - 管制详情`
                  : '详细信息'
              }
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDrawerClose}
              aria-label="关闭"
              sx={{ color: 'primary.contrastText' }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          bgcolor: 'background.default'
        }}>
          {selectedItem && (
            'callsign' in selectedItem && 'altitude' in selectedItem
              ? renderFlightDetails(selectedItem as OnlineFlight)
              : renderControllerDetails(selectedItem as OnlineController)
          )}
        </Box>
      </Drawer>
    </Box>
  )
}