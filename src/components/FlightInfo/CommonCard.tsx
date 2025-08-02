import { memo } from "react"
import { Card, CardContent, Chip } from "@mui/material"
import CustomFloatingPanel from "./CustomFloatingPanel"
import { PlatformType } from "../../utils/getPlatform"
import "./PlatformStyles.scss"

interface CardProps {
  flightData: OnlineFlight
  isMobileWidth: boolean
  platform: PlatformType
  onClose?: () => void
}

const CommonCard = memo(({ flightData, isMobileWidth, platform, onClose }: CardProps) => {
  const formatAltitude = (alt: number) => alt.toLocaleString()
  const formatSpeed = (speed: number) => speed.toString()
  const formatHeading = (heading: number) => `${Math.round(heading)}`
  const formatSquawk = (squawk: number) => squawk.toString().padStart(4, '0')

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
    <div className={`${getPlatformStyles()} w-full`}>
      {/* Header */}
      <div className="flex justify-between items-start px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {flightData.callsign}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {flightData.name}
          </p>
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

      {/* 航线显示 */}
      <div className="mx-4 mt-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-center min-w-0 flex-1">
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {flightData.flight_plan?.departure || 'N/A'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">起飞</div>
          </div>
          
          <div className="flex-1 mx-3 flex items-center">
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="mx-2 px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
              →
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          <div className="text-center min-w-0 flex-1">
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {flightData.flight_plan?.arrival || 'N/A'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">降落</div>
          </div>
        </div>
      </div>

      {/* 实时飞行数据 */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">实时飞行数据</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wider">高度</div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {formatAltitude(flightData.altitude)}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">ft</span>
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wider">地速</div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {formatSpeed(flightData.groundspeed)}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">kts</span>
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wider">航向</div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {formatHeading(flightData.heading)}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">°</span>
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wider">应答机</div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {formatSquawk(flightData.transponder)}
            </div>
          </div>
        </div>
      </div>

      {/* 飞行信息 */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">飞行信息</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">飞行员CID:</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.cid}</span>
          </div>
          
          <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">坐标位置:</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              {flightData.latitude.toFixed(4)}, {flightData.longitude.toFixed(4)}
            </span>
          </div>
          
          <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">服务器:</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.server}</span>
          </div>
        </div>
      </div>

      {/* 飞行计划 */}
      {flightData.flight_plan && (
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
            </svg>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">飞行计划</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">飞行规则:</span>
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.flight_plan.flight_rules}</span>
            </div>
            
            {flightData.flight_plan.cruise_tas && (
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">巡航真空速:</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.flight_plan.cruise_tas} kts</span>
              </div>
            )}
            
            {flightData.flight_plan.altitude && (
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">巡航高度:</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.flight_plan.altitude} ft</span>
              </div>
            )}

            {flightData.flight_plan.alternate && (
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">备降机场:</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{flightData.flight_plan.alternate}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 航路 */}
      {flightData.flight_plan?.route && (
        <div className="px-4 mb-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
              </svg>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">航路</h4>
            </div>
            <div className="text-xs text-gray-900 dark:text-gray-100 break-all font-mono leading-relaxed">
              {flightData.flight_plan.route}
            </div>
          </div>
        </div>
      )}

      {/* 备注 */}
      {flightData.flight_plan?.remarks && (
        <div className="px-4 mb-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">备注</h4>
            <div className="text-xs text-gray-900 dark:text-gray-100 leading-relaxed">
              {flightData.flight_plan.remarks}
            </div>
          </div>
        </div>
      )}

      {/* isMobileWidth的底部遮挡 */}
      {isMobileWidth && <div className="relative h-[50px]"></div>}

    </div>
  )

  // 移动端使用自定义浮动面板
  if (isMobileWidth) {
    return (
      <CustomFloatingPanel 
        onClose={onClose}
        initialHeight={0.8}
      >
        <div style={{ padding: '16px 0' }}>
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
      </CustomFloatingPanel>
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