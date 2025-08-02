import { memo } from "react"
import { Card, CardContent, Chip } from "@mui/material"
import { FloatingPanel } from "antd-mobile"
import { PlatformType } from "../../utils/getPlatform"
import "./PlatformStyles.scss"

interface CardProps {
  flightData: OnlineFlight
  isMobileWidth: boolean
  platform: PlatformType
  onClose?: () => void
}

const CommonCard = memo(({ flightData, isMobileWidth, platform, onClose }: CardProps) => {
  const formatAltitude = (alt: number) => `${alt.toLocaleString()} ft`
  const formatSpeed = (speed: number) => `${speed} kts`
  const formatHeading = (heading: number) => `${Math.round(heading)}°`

  // 获取平台特定的样式类
  const getPlatformStyles = () => {
    switch (platform) {
      case 'ios':
        return "ios-card"
      case 'android':
        return "android-card"
      default:
        return "web-card"
    }
  }

  const cardContent = (
    <div className={`${getPlatformStyles()} w-full bg-white dark:bg-gray-900`}>
      {/* Header */}
      <div className="flex justify-between items-start p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {flightData.callsign}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {flightData.name}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>ID: {flightData.cid}</span>
            <span>•</span>
            <span>{flightData.server}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {platform === 'android' ? (
            <Chip 
              label={flightData.flight_plan?.aircraft || 'N/A'} 
              size="small" 
              color="primary"
            />
          ) : (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {flightData.flight_plan?.aircraft || 'N/A'}
            </span>
          )}
          
          {!isMobileWidth && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Route Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
              {flightData.flight_plan?.departure || 'N/A'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Departure
            </div>
          </div>
          
          <div className="flex-1 mx-6 flex items-center">
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="mx-2 px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
              →
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
              {flightData.flight_plan?.arrival || 'N/A'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Arrival
            </div>
          </div>
        </div>
      </div>

      {/* Flight Data */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1 font-medium">Altitude</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatAltitude(flightData.altitude)}
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1 font-medium">Speed</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatSpeed(flightData.groundspeed)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1 font-medium">Heading</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatHeading(flightData.heading)}
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1 font-medium">Squawk</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {flightData.transponder.toString().padStart(4, '0')}
            </div>
          </div>
        </div>

        {/* Flight Details Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
            Flight Details
          </h3>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400">Position:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {flightData.latitude.toFixed(4)}, {flightData.longitude.toFixed(4)}
              </span>
            </div>
            
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400">Bank:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {flightData.bank.toFixed(1)}°
              </span>
            </div>
            
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400">Pitch:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {flightData.pitch.toFixed(1)}°
              </span>
            </div>

            {flightData.flight_plan?.cruise_tas && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">Cruise TAS:</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {flightData.flight_plan.cruise_tas} kts
                </span>
              </div>
            )}
            
            {flightData.flight_plan?.altitude && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">Cruise Alt:</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {flightData.flight_plan.altitude} ft
                </span>
              </div>
            )}

            {flightData.flight_plan?.flight_rules && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">Flight Rules:</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {flightData.flight_plan.flight_rules}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Route */}
        {flightData.flight_plan?.route && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 font-medium tracking-wide">
              Route
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-100 break-all font-mono leading-relaxed">
              {flightData.flight_plan.route}
            </div>
          </div>
        )}

        {/* Remarks */}
        {flightData.flight_plan?.remarks && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 font-medium tracking-wide">
              Remarks
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
              {flightData.flight_plan.remarks}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // 移动端使用 FloatingPanel
  if (isMobileWidth) {
    const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8]

    return (
      <FloatingPanel 
        anchors={anchors}
        onHeightChange={(height, animating) => {
          // 当拖拽到最低点时关闭
          if (height <= anchors[0] + 50 && !animating) {
            onClose?.()
          }
        }}
      >
        <div style={{ padding: '20px 16px' }}>
          {platform === 'android' ? (
            <Card elevation={0} sx={{ borderRadius: 0 }}>
              <CardContent sx={{ padding: '0 !important' }}>
                {cardContent}
              </CardContent>
            </Card>
          ) : (
            cardContent
          )}
        </div>
      </FloatingPanel>
    )
  }

  // 桌面端固定位置
  return (
    <div className="fixed top-2.5 right-12 z-50 w-80 max-w-[90vw]">
      {platform === 'android' ? (
        <Card elevation={8} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ padding: '0 !important' }}>
            {cardContent}
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {cardContent}
        </div>
      )}
    </div>
  )
})

export default CommonCard