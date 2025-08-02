import { memo } from "react"
import { 
  Card, 
  CardHeader, 
  Text, 
  Badge, 
  Button,
  makeStyles, 
  tokens,
  Divider
} from "@fluentui/react-components"
import { 
  Dismiss24Regular,
  AirplaneTakeOff24Regular,
  Location24Regular
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  card: {
    position: "fixed",
    top: "10px",
    right: "50px",
    width: "360px",
    maxWidth: "90vw",
    maxHeight: "calc(100vh - 40px)",
    zIndex: 1000,
    boxShadow: tokens.shadow16,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    paddingBottom: "8px",
  },
  callsign: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  pilot: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: "2px",
  },
  content: {
    padding: "16px",
    flex: 1,
    overflow: "auto",
  },
  routeSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    marginBottom: "16px",
  },
  airport: {
    textAlign: "center",
    minWidth: "80px",
  },
  airportCode: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  airportLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    marginTop: "4px",
  },
  routeLine: {
    flex: 1,
    margin: "0 16px",
    position: "relative",
    height: "2px",
    backgroundColor: tokens.colorNeutralStroke1,
  },
  airplane: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "4px 8px",
    borderRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeBase100,
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  dataCard: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    textAlign: "center",
  },
  dataLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  dataValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },
  infoLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  infoValue: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  routeBox: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: "12px",
  },
  routeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    wordBreak: "break-all",
    lineHeight: "1.4",
    fontFamily: tokens.fontFamilyMonospace,
  },
  badgeContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  closeButton: {
    marginLeft: "8px",
  },
})

export default memo(({flightData}: {flightData: OnlineFlight}) => {
  const styles = useStyles()
  
  const formatAltitude = (alt: number) => `${alt.toLocaleString()} ft`
  const formatSpeed = (speed: number) => `${speed} kts`
  const formatHeading = (heading: number) => `${Math.round(heading)}°`
  
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        header={
          <div>
            <Text className={styles.callsign}>{flightData.callsign}</Text>
            <Text className={styles.pilot}>{flightData.name}</Text>
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
            />
          </div>
        }
      />
      
      <div className={styles.content}>
        {/* Route Display */}
        <div className={styles.routeSection}>
          <div className={styles.airport}>
            <div className={styles.airportCode}>
              {flightData.flight_plan?.departure || 'N/A'}
            </div>
            <div className={styles.airportLabel}>Origin</div>
          </div>
          
          <div className={styles.routeLine}>
            <div className={styles.airplane}>
              <AirplaneTakeOff24Regular />
            </div>
          </div>
          
          <div className={styles.airport}>
            <div className={styles.airportCode}>
              {flightData.flight_plan?.arrival || 'N/A'}
            </div>
            <div className={styles.airportLabel}>Destination</div>
          </div>
        </div>

        <Divider />

        {/* Live Flight Data */}
        <div className={styles.dataGrid}>
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Altitude</div>
            <div className={styles.dataValue}>{formatAltitude(flightData.altitude)}</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Ground Speed</div>
            <div className={styles.dataValue}>{formatSpeed(flightData.groundspeed)}</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Heading</div>
            <div className={styles.dataValue}>{formatHeading(flightData.heading)}</div>
          </div>
          
          <div className={styles.dataCard}>
            <div className={styles.dataLabel}>Squawk</div>
            <div className={styles.dataValue}>{flightData.transponder || '7000'}</div>
          </div>
        </div>

        <Divider />

        {/* Flight Details */}
        <div>
          <Text 
            style={{ 
              fontSize: tokens.fontSizeBase300, 
              fontWeight: tokens.fontWeightSemibold,
              color: tokens.colorNeutralForeground1,
              marginBottom: "8px",
              display: "block"
            }}
          >
            Flight Details
          </Text>
          
          <div className={styles.infoRow}>
            <Text className={styles.infoLabel}>Pilot ID:</Text>
            <Text className={styles.infoValue}>{flightData.cid}</Text>
          </div>
          
          {flightData.flight_plan?.cruise_tas && (
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>True Airspeed:</Text>
              <Text className={styles.infoValue}>{flightData.flight_plan.cruise_tas} kts</Text>
            </div>
          )}
          
          {flightData.flight_plan?.altitude && (
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Cruise Altitude:</Text>
              <Text className={styles.infoValue}>{flightData.flight_plan.altitude} ft</Text>
            </div>
          )}

          {flightData.flight_plan?.alternate && (
            <div className={styles.infoRow}>
              <Text className={styles.infoLabel}>Alternate:</Text>
              <Text className={styles.infoValue}>{flightData.flight_plan.alternate}</Text>
            </div>
          )}
        </div>

        {/* Route Information */}
        {flightData.flight_plan?.route && (
          <div className={styles.routeBox}>
            <Text 
              style={{ 
                fontSize: tokens.fontSizeBase200, 
                fontWeight: tokens.fontWeightSemibold,
                color: tokens.colorNeutralForeground2,
                marginBottom: "8px",
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              Route
            </Text>
            <Text className={styles.routeText}>{flightData.flight_plan.route}</Text>
          </div>
        )}

        {/* Remarks */}
        {flightData.flight_plan?.remarks && (
          <div className={styles.routeBox} style={{ marginTop: "8px" }}>
            <Text 
              style={{ 
                fontSize: tokens.fontSizeBase200, 
                fontWeight: tokens.fontWeightSemibold,
                color: tokens.colorNeutralForeground2,
                marginBottom: "8px",
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              Remarks
            </Text>
            <Text style={{ 
              fontSize: tokens.fontSizeBase200,
              color: tokens.colorNeutralForeground1,
              lineHeight: "1.4"
            }}>
              {flightData.flight_plan.remarks}
            </Text>
          </div>
        )}
      </div>
    </Card>
  )
})