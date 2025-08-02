import { useState } from "react"
import { 
  Card,
  Text,
  Badge,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  Input,
  makeStyles,
  tokens
} from "@fluentui/react-components"
import { 
  Dismiss24Regular,
  Airplane24Regular,
  Headset24Regular,
  Globe24Regular,
  Search24Regular
} from "@fluentui/react-icons"
import getControllerRating from '../../utils/getControllerRating'

const useStyles = makeStyles({
  container: {
    padding: "16px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: 0,
    overflow: "hidden",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    wordBreak: "break-word",
  },
  subtitle: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    wordBreak: "break-word",
  },
  searchContainer: {
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "400px",
  },
  tabContainer: {
    marginBottom: "20px",
  },
  listContainer: {
    flex: 1,
    overflow: "auto",
    minHeight: 0,
  },
  horizontalLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "12px",
    alignContent: "start",
  },
  verticalLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "12px",
    alignContent: "start",
  },
  listCard: {
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: 0,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
      transform: "translateY(-1px)",
      boxShadow: tokens.shadow8,
    },
  },
  verticalCard: {
    padding: "14px",
    borderRadius: "8px", 
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: 0,
    minHeight: "240px",
    aspectRatio: "3/4.5",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
      transform: "translateY(-1px)",
      boxShadow: tokens.shadow8,
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    minWidth: 0,
    gap: "8px",
  },
  callsign: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  verticalCallsign: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "1.1",
  },
  name: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginTop: "2px",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  verticalName: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground2,
    marginTop: "2px",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "1.1",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px",
    fontSize: "11px",
  },
  verticalInfoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "10px",
    flex: 1,
    marginTop: "10px",
  },
  infoItem: {
    color: tokens.colorNeutralForeground2,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  infoValue: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  verticalInfoLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: "10px",
    marginBottom: "2px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  verticalInfoValue: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "13px",
    lineHeight: "1.1",
  },
  drawerContent: {
    padding: "16px",
    minWidth: 0,
  },
  detailSection: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
  },
  detailItem: {
    padding: "10px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "6px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    minWidth: 0,
  },
  detailLabel: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  detailValue: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  routeBox: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "6px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  routeText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyMonospace,
    lineHeight: "1.4",
    wordBreak: "break-all",
  },
})

interface WindowsListPageProps {
  onlineFlights: OnlineFlight[]
  onlineControllers: OnlineController[]
  listLayoutType?: 'horizontal' | 'vertical'
}

export default function WindowsListPage({ onlineFlights, onlineControllers, listLayoutType = 'horizontal' }: WindowsListPageProps) {
  const styles = useStyles()
  const [selectedTab, setSelectedTab] = useState<string>("flights")
  const [selectedItem, setSelectedItem] = useState<OnlineFlight | OnlineController | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string)
  }

  const handleItemClick = (item: OnlineFlight | OnlineController) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
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
    <Card 
      key={flight.session_id} 
      className={listLayoutType === 'vertical' ? styles.verticalCard : styles.listCard}
      onClick={() => handleItemClick(flight)}
    >
      {listLayoutType === 'vertical' ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div className={styles.verticalCallsign}>{flight.callsign}</div>
            <div className={styles.verticalName}>{flight.name}</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Badge appearance="tint" color="brand" style={{ fontSize: '11px', padding: '3px 10px' }}>
              {flight.flight_plan?.aircraft || 'N/A'}
            </Badge>
          </div>
          <div className={styles.verticalInfoGrid}>
            <div style={{ textAlign: 'center' }}>
              <div className={styles.verticalInfoLabel}>高度</div>
              <div className={styles.verticalInfoValue}>{flight.altitude.toLocaleString()} ft</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className={styles.verticalInfoLabel}>地速</div>
              <div className={styles.verticalInfoValue}>{flight.groundspeed} kts</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 'auto' }}>
              <div className={styles.verticalInfoLabel}>航线</div>
              <div className={styles.verticalInfoValue} style={{ fontSize: '11px' }}>
                {flight.flight_plan?.departure || 'N/A'} → {flight.flight_plan?.arrival || 'N/A'}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className={styles.callsign}>{flight.callsign}</div>
              <div className={styles.name}>{flight.name}</div>
            </div>
            <Badge appearance="tint" color="brand" style={{ flexShrink: 0 }}>
              {flight.flight_plan?.aircraft || 'N/A'}
            </Badge>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              高度: <span className={styles.infoValue}>{flight.altitude.toLocaleString()} ft</span>
            </div>
            <div className={styles.infoItem}>
              地速: <span className={styles.infoValue}>{flight.groundspeed} kts</span>
            </div>
            <div className={styles.infoItem}>
              出发: <span className={styles.infoValue}>{flight.flight_plan?.departure || 'N/A'}</span>
            </div>
            <div className={styles.infoItem}>
              到达: <span className={styles.infoValue}>{flight.flight_plan?.arrival || 'N/A'}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  )

  const renderControllerCard = (controller: OnlineController) => (
    <Card 
      key={controller.session_id} 
      className={listLayoutType === 'vertical' ? styles.verticalCard : styles.listCard}
      onClick={() => handleItemClick(controller)}
    >
      {listLayoutType === 'vertical' ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div className={styles.verticalCallsign}>{controller.callsign}</div>
            <div className={styles.verticalName}>{controller.name}</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Badge appearance="tint" color="success" style={{ fontSize: '10px', padding: '3px 8px' }}>
              {controller.frequency}
            </Badge>
          </div>
          <div className={styles.verticalInfoGrid}>
            <div style={{ textAlign: 'center' }}>
              <div className={styles.verticalInfoLabel}>频率</div>
              <div className={styles.verticalInfoValue}>{controller.frequency}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className={styles.verticalInfoLabel}>等级</div>
              <div className={styles.verticalInfoValue}>{getControllerRating(controller.rating)}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 'auto' }}>
              <div className={styles.verticalInfoLabel}>范围</div>
              <div className={styles.verticalInfoValue}>{controller.visual_range} nm</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className={styles.callsign}>{controller.callsign}</div>
              <div className={styles.name}>{controller.name}</div>
            </div>
            <Badge appearance="tint" color="success" style={{ flexShrink: 0 }}>
              {controller.frequency}
            </Badge>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              频率: <span className={styles.infoValue}>{controller.frequency}</span>
            </div>
            <div className={styles.infoItem}>
              等级: <span className={styles.infoValue}>{getControllerRating(controller.rating)}</span>
            </div>
            <div className={styles.infoItem}>
              服务器: <span className={styles.infoValue}>{controller.server}</span>
            </div>
            <div className={styles.infoItem}>
              范围: <span className={styles.infoValue}>{controller.visual_range} nm</span>
            </div>
          </div>
        </>
      )}
    </Card>
  )

  const renderFlightDetails = (flight: OnlineFlight) => (
    <div className={styles.drawerContent}>
      <div className={styles.detailSection}>
        <div className={styles.sectionTitle}>
          <Airplane24Regular />
          基本信息
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>呼号</div>
            <div className={styles.detailValue}>{flight.callsign}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>飞行员</div>
            <div className={styles.detailValue}>{flight.name}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>CID</div>
            <div className={styles.detailValue}>{flight.cid}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>服务器</div>
            <div className={styles.detailValue}>{flight.server}</div>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.sectionTitle}>
          <Globe24Regular />
          飞行数据
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>高度</div>
            <div className={styles.detailValue}>{flight.altitude.toLocaleString()} ft</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>地速</div>
            <div className={styles.detailValue}>{flight.groundspeed} kts</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>航向</div>
            <div className={styles.detailValue}>{Math.round(flight.heading)}°</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>应答机</div>
            <div className={styles.detailValue}>{flight.transponder.toString().padStart(4, '0')}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>坐标</div>
            <div className={styles.detailValue}>{flight.latitude.toFixed(4)}, {flight.longitude.toFixed(4)}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>机型</div>
            <div className={styles.detailValue}>{flight.flight_plan?.aircraft || 'N/A'}</div>
          </div>
        </div>
      </div>

      {flight.flight_plan && (
        <div className={styles.detailSection}>
          <div className={styles.sectionTitle}>飞行计划</div>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>出发</div>
              <div className={styles.detailValue}>{flight.flight_plan.departure}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>到达</div>
              <div className={styles.detailValue}>{flight.flight_plan.arrival}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>飞行规则</div>
              <div className={styles.detailValue}>{flight.flight_plan.flight_rules}</div>
            </div>
            {flight.flight_plan.alternate && (
              <div className={styles.detailItem}>
                <div className={styles.detailLabel}>备降</div>
                <div className={styles.detailValue}>{flight.flight_plan.alternate}</div>
              </div>
            )}
          </div>

          {flight.flight_plan.route && (
            <div className={styles.routeBox}>
              <div className={styles.detailLabel} style={{ marginBottom: "8px" }}>航路</div>
              <div className={styles.routeText}>{flight.flight_plan.route}</div>
            </div>
          )}

          {flight.flight_plan.remarks && (
            <div className={styles.routeBox}>
              <div className={styles.detailLabel} style={{ marginBottom: "8px" }}>备注</div>
              <div className={styles.routeText}>{flight.flight_plan.remarks}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderControllerDetails = (controller: OnlineController) => (
    <div className={styles.drawerContent}>
      <div className={styles.detailSection}>
        <div className={styles.sectionTitle}>
          <Headset24Regular />
          管制信息
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>呼号</div>
            <div className={styles.detailValue}>{controller.callsign}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>管制员</div>
            <div className={styles.detailValue}>{controller.name}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>CID</div>
            <div className={styles.detailValue}>{controller.cid}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>频率</div>
            <div className={styles.detailValue}>{controller.frequency}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>等级</div>
            <div className={styles.detailValue}>{getControllerRating(controller.rating)}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>服务器</div>
            <div className={styles.detailValue}>{controller.server}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>管制范围</div>
            <div className={styles.detailValue}>{controller.visual_range} nm</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>坐标</div>
            <div className={styles.detailValue}>{controller.latitude.toFixed(4)}, {controller.longitude.toFixed(4)}</div>
          </div>
        </div>

        {controller.text_atis && controller.text_atis.length > 0 && (
          <div className={styles.routeBox}>
            <div className={styles.detailLabel} style={{ marginBottom: "8px" }}>ATIS信息</div>
            <div className={styles.routeText}>
              {controller.text_atis.join('\n')}
            </div>
          </div>
        )}
      </div>
    </div>
  )

    return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="relative mb-2">
            <Text className={styles.title} style={{ marginBottom: "10px" }}>在线列表</Text>
        </div>
        <Text className={styles.subtitle}>
          当前在线: {onlineFlights.length} 架航班, {onlineControllers.length} 个管制席位
          {searchQuery && (
            <> | 筛选结果: {filteredFlights.length} 架航班, {filteredControllers.length} 个管制席位</>
          )}
        </Text>
      </div>

      <div className={styles.searchContainer}>
        <Input
          className={styles.searchInput}
          placeholder="搜索呼号、姓名或CID..."
          value={searchQuery}
          onChange={(_, data) => setSearchQuery(data.value)}
          contentBefore={<Search24Regular />}
        />
      </div>

      <div className={styles.tabContainer}>
        <TabList selectedValue={selectedTab} onTabSelect={handleTabSelect}>
          <Tab value="flights">
            <Airplane24Regular style={{ marginRight: "8px" }} />
            机组 ({searchQuery ? filteredFlights.length : onlineFlights.length})
          </Tab>
          <Tab value="controllers">
            <Headset24Regular style={{ marginRight: "8px" }} />
            管制员 ({searchQuery ? filteredControllers.length : onlineControllers.length})
          </Tab>
        </TabList>
      </div>

      <div className={styles.listContainer}>
        <div className={listLayoutType === 'vertical' ? styles.verticalLayout : styles.horizontalLayout}>
          {selectedTab === "flights" 
            ? filteredFlights.map(renderFlightCard)
            : filteredControllers.map(renderControllerCard)
          }
        </div>
      </div>

      <Drawer
        type="overlay"
        separator
        open={isDrawerOpen}
        onOpenChange={(_, { open }) => !open && handleDrawerClose()}
        size="medium"
        position="end"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="关闭"
                icon={<Dismiss24Regular />}
                onClick={handleDrawerClose}
              />
            }
          >
            {selectedItem && 'callsign' in selectedItem 
              ? `${selectedItem.callsign} - 飞行详情`
              : selectedItem 
                ? `${(selectedItem as OnlineController).callsign} - 管制详情`
                : '详细信息'
            }
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          {selectedItem && (
            'callsign' in selectedItem && 'altitude' in selectedItem
              ? renderFlightDetails(selectedItem as OnlineFlight)
              : renderControllerDetails(selectedItem as OnlineController)
          )}
        </DrawerBody>
      </Drawer>
        </div>
    )
}