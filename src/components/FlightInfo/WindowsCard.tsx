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
  Navigation24Regular
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  card: {
    position: "fixed",
    top: "10px",
    right: "50px",
    width: "380px",
    maxWidth: "90vw",
    maxHeight: "calc(100vh - 40px)",
    zIndex: 1000,
    boxShadow: tokens.shadow28,
    borderRadius: "12px",
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
    marginBottom: "4px",
  },
  pilot: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  content: {
    padding: "20px",
    flex: 1,
    overflow: "auto",
  },
  routeSection: {
    marginBottom: "20px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    padding: "16px",
  },
  airport: {
    textAlign: "center",
    minWidth: "80px",
  },
  airportCode: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
  },
  airportLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  routeLine: {
    flex: 1,
    margin: "0 16px",
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
    padding: "6px",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
  },
  dataCard: {
    padding: "14px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: "center",
  },
  dataLabel: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    fontWeight: tokens.fontWeightMedium,
  },
  dataValue: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  infoSection: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  infoRowLast: {
    borderBottom: "none",
  },
  infoLabel: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  infoValue: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "right",
    maxWidth: "60%",
    wordBreak: "break-word",
  },
  routeBox: {
    padding: "14px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  routeText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
    wordBreak: "break-all",
    lineHeight: "1.5",
    fontFamily: tokens.fontFamilyMonospace,
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
  
  const formatAltitude = (alt: number) => `${alt.toLocaleString()}`
  const formatSpeed = (speed: number) => `${speed}`
  const formatHeading = (heading: number) => `${Math.round(heading)}°`
  const formatSquawk = (squawk: number) => squawk.toString().padStart(4, '0')
  
  const handleClose = () => {
    // 触发关闭事件
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
        {/* Route Display */}
        <div className={styles.routeSection}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className={styles.airport}>
              <div className={styles.airportCode}>
                {flightData.flight_plan?.departure || 'N/A'}
              </div>
              <div className={styles.airportLabel}>Departure</div>
            </div>
            
            <div className={styles.routeLine}>
              <div className={styles.planeIcon}>
                <Navigation24Regular style={{ fontSize: "14px" }} />
              </div>
            </div>
            
            <div className={styles.airport}>
              <div className={styles.airportCode}>
                {flightData.flight_plan?.arrival || 'N/A'}
              </div>
              <div className={styles.airportLabel}>Arrival</div>
            </div>
          </div>
        </div>

        {/* Live Flight Data */}
        <div className={styles.dataGrid}>
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Altitude</div>
            <div className={styles.dataValue}>{formatAltitude(flightData.altitude)} ft</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Ground Speed</div>
            <div className={styles.dataValue}>{formatSpeed(flightData.groundspeed)} kts</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Heading</div>
            <div className={styles.dataValue}>{formatHeading(flightData.heading)}</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Squawk</div>
            <div className={styles.dataValue}>{formatSquawk(flightData.transponder)}</div>
          </div>
        </div>

        {/* Flight Information */}
        <div className={styles.infoSection}>
          <div className={styles.sectionTitle}>
            <Location24Regular style={{ fontSize: "16px" }} />
            Flight Information
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Pilot ID:</span>
            <span className={styles.infoValue}>{flightData.cid}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Server:</span>
            <span className={styles.infoValue}>{flightData.server}</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Session ID:</span>
            <span className={styles.infoValue}>{flightData.session_id}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Position:</span>
            <span className={styles.infoValue}>
              {flightData.latitude.toFixed(4)}, {flightData.longitude.toFixed(4)}
            </span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Bank Angle:</span>
            <span className={styles.infoValue}>{flightData.bank.toFixed(1)}°</span>
          </div>
          
          <div className={styles.infoRow + " " + styles.infoRowLast}>
            <span className={styles.infoLabel}>Pitch Angle:</span>
            <span className={styles.infoValue}>{flightData.pitch.toFixed(1)}°</span>
          </div>
        </div>

        {/* Flight Plan Details */}
        {flightData.flight_plan && (
          <div className={styles.infoSection}>
            <div className={styles.sectionTitle}>
              <Clock24Regular style={{ fontSize: "16px" }} />
              Flight Plan
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Flight Rules:</span>
              <span className={styles.infoValue}>{flightData.flight_plan.flight_rules}</span>
            </div>
            
            {flightData.flight_plan.cruise_tas && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Cruise TAS:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.cruise_tas} kts</span>
              </div>
            )}
            
            {flightData.flight_plan.altitude && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Cruise Alt:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.altitude} ft</span>
              </div>
            )}

            {flightData.flight_plan.alternate && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Alternate:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.alternate}</span>
              </div>
            )}

            {flightData.flight_plan.deptime && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Dep Time:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.deptime}</span>
              </div>
            )}

            {flightData.flight_plan.enroute_time && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Enroute Time:</span>
                <span className={styles.infoValue}>{flightData.flight_plan.enroute_time}</span>
              </div>
            )}

            <div className={styles.infoRow + " " + styles.infoRowLast}>
              <span className={styles.infoLabel}>Fuel Time:</span>
              <span className={styles.infoValue}>{flightData.flight_plan.fuel_time || 'N/A'}</span>
            </div>
          </div>
        )}

        {/* Route */}
        {flightData.flight_plan?.route && (
          <div className={styles.routeBox}>
            <div className={styles.sectionTitle} style={{ marginBottom: "8px" }}>
              Route
            </div>
            <div className={styles.routeText}>{flightData.flight_plan.route}</div>
          </div>
        )}

        {/* Remarks */}
        {flightData.flight_plan?.remarks && (
          <div className={styles.routeBox} style={{ marginTop: "12px" }}>
            <div className={styles.sectionTitle} style={{ marginBottom: "8px" }}>
              Remarks
            </div>
            <div style={{ 
              fontSize: "12px",
              color: tokens.colorNeutralForeground1,
              lineHeight: "1.5"
            }}>
              {flightData.flight_plan.remarks}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
})