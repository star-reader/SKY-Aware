import { memo } from "react"
import { 
  Card, 
  CardHeader, 
  Badge, 
  Button,
  makeStyles, 
  tokens
} from "@fluentui/react-components"
import { 
  Dismiss24Regular,
  Location24Regular,
  Clock24Regular,
  Airplane24Regular,
  Globe24Regular,
  Navigation24Regular
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  card: {
    position: "fixed",
    top: "10px",
    right: "50px",
    width: "340px",
    maxWidth: "90vw",
    maxHeight: "calc(100vh - 40px)",
    zIndex: 1000,
    boxShadow: tokens.shadow16,
    borderRadius: "10px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    padding: "16px 20px 12px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  callsign: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginBottom: "3px",
  },
  pilot: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  content: {
    padding: "16px",
    flex: 1,
    overflow: "auto",
  },
  routeSection: {
    padding: "14px",
    marginBottom: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  airport: {
    textAlign: "center",
    minWidth: "80px",
  },
  airportCode: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "3px",
  },
  airportLabel: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  routeLine: {
    flex: 1,
    margin: "0 12px",
    position: "relative",
    height: "2px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "1px",
  },
  planeIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "5px",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "16px",
  },
  dataCard: {
    padding: "14px 12px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "10px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      // transform: "translateY(-1px)",
      // boxShadow: tokens.shadow4,
    },
  },
  dataLabel: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "6px",
    fontWeight: tokens.fontWeightSemibold,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  dataValue: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
  },
  dataUnit: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
    marginLeft: "2px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  infoRowLast: {
    borderBottom: "none",
  },
  infoLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  infoValue: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "right",
    maxWidth: "60%",
    wordBreak: "break-word",
  },
  routeBox: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  routeText: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
    wordBreak: "break-all",
    lineHeight: "1.4",
    fontFamily: tokens.fontFamilyMonospace,
    marginTop: "6px",
  },
  badgeContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  closeButton: {
    marginLeft: "8px",
    borderRadius: "6px",
  },
})

interface WindowsCardProps {
  flightData: OnlineFlight
}

export default memo(({ flightData }: WindowsCardProps) => {
  const styles = useStyles()
  
  const formatAltitude = (alt: number) => alt.toLocaleString()
  const formatSpeed = (speed: number) => speed.toString()
  const formatHeading = (heading: number) => `${Math.round(heading)}`
  const formatSquawk = (squawk: number) => squawk.toString().padStart(4, '0')
  
  const handleClose = () => {
    const event = new CustomEvent('closeFlightCard')
    window.dispatchEvent(event)
  }
  
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        header={
          <div>
            <div className={styles.callsign}>{flightData.callsign}</div>
            <div className={styles.pilot}>{flightData.name}</div>
          </div>
        }
        action={
          <div className={styles.badgeContainer}>
            <Badge appearance="tint" color="brand" size="medium">
              {flightData.flight_plan?.aircraft || 'N/A'}
            </Badge>
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular />}
              size="small"
              className={styles.closeButton}
              onClick={handleClose}
            />
          </div>
        }
      />
      
      <div className={styles.content}>
        {/* 航线显示 */}
        <div className={styles.routeSection}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className={styles.airport}>
              <div className={styles.airportCode}>
                {flightData.flight_plan?.departure || 'N/A'}
              </div>
              <div className={styles.airportLabel}>起飞</div>
            </div>
            
            <div className={styles.routeLine}>
              <div className={styles.planeIcon}>
                <Airplane24Regular style={{ fontSize: "14px" }} />
              </div>
            </div>
            
            <div className={styles.airport}>
              <div className={styles.airportCode}>
                {flightData.flight_plan?.arrival || 'N/A'}
              </div>
              <div className={styles.airportLabel}>降落</div>
            </div>
          </div>
        </div>

        {/* 实时飞行数据 */}
        <div className={styles.sectionTitle}>
          <Navigation24Regular style={{ fontSize: "16px" }} />
          实时飞行数据
        </div>
        
        <div className={styles.dataGrid}>
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>高度</div>
            <div className={styles.dataValue}>
              {formatAltitude(flightData.altitude)}
              <span className={styles.dataUnit}>ft</span>
            </div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>地速</div>
            <div className={styles.dataValue}>
              {formatSpeed(flightData.groundspeed)}
              <span className={styles.dataUnit}> kts</span>
            </div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>航向</div>
            <div className={styles.dataValue}>
              {formatHeading(flightData.heading)}
              <span className={styles.dataUnit}>°</span>
            </div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>应答机</div>
            <div className={styles.dataValue}>
              {formatSquawk(flightData.transponder)}
            </div>
          </div>
        </div>

        {/* 飞行信息 */}
        <div>
          <div className={styles.sectionTitle}>
            <Globe24Regular style={{ fontSize: "16px" }} />
            飞行信息
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>飞行员CID:</span>
            <span className={styles.infoValue}>{flightData.cid}</span>
          </div>

          {/* <div className={styles.infoRow}>
            <span className={styles.infoLabel}>会话ID:</span>
            <span className={styles.infoValue}>{flightData.session_id}</span>
          </div> */}
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>坐标位置:</span>
            <span className={styles.infoValue}>
              {flightData.latitude.toFixed(4)}, {flightData.longitude.toFixed(4)}
            </span>
          </div>
          
          {/* <div className={styles.infoRow}>
            <span className={styles.infoLabel}>倾斜角:</span>
            <span className={styles.infoValue}>{flightData.bank.toFixed(1)}°</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>俯仰角:</span>
            <span className={styles.infoValue}>{flightData.pitch.toFixed(1)}°</span>
          </div> */}

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>服务器:</span>
            <span className={styles.infoValue}>{flightData.server}</span>
          </div>

        </div>

        {/* 飞行计划详情 */}
        {flightData.flight_plan && (
          <div>
            <div className={styles.sectionTitle} style={{ marginTop: "20px" }}>
              <Clock24Regular style={{ fontSize: "16px" }} />
              飞行计划
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>飞行规则:</span>
              <span className={styles.infoValue}>{flightData.flight_plan.flight_rules}</span>
            </div>
            
            {flightData.flight_plan.cruise_tas && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>巡航真空速:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.cruise_tas} kts</span>
              </div>
            )}
            
            {flightData.flight_plan.altitude && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>巡航高度:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.altitude} ft</span>
              </div>
            )}

            {flightData.flight_plan.alternate && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>备降机场:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.alternate}</span>
              </div>
            )}
          </div>
        )}

        {/* 航路 */}
        {flightData.flight_plan?.route && (
          <div className={styles.routeBox}>
            <div className={styles.sectionTitle} style={{ marginBottom: "8px" }}>
              <Location24Regular style={{ fontSize: "16px" }} />
              航路
            </div>
            <div className={styles.routeText}>{flightData.flight_plan.route}</div>
          </div>
        )}

        {/* 备注 */}
        {flightData.flight_plan?.remarks && (
          <div className={styles.routeBox}>
            <div className={styles.sectionTitle} style={{ marginBottom: "8px" }}>
              备注
            </div>
            <div className={styles.routeText}>
              {flightData.flight_plan.remarks}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
})