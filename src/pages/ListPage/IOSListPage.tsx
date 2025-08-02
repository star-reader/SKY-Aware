import { useState } from "react"
import {
  Flight as FlightIcon,
  Headset as HeadsetIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from "@mui/icons-material"
import "./IOSListPage.scss"
import getControllerRating from '../../utils/getControllerRating'

interface IOSListPageProps {
  onlineFlights: OnlineFlight[]
  onlineControllers: OnlineController[]
  listLayoutType?: 'horizontal' | 'vertical'
}

export default function IOSListPage({ onlineFlights, onlineControllers, listLayoutType = 'horizontal' }: IOSListPageProps) {
  const [selectedTab, setSelectedTab] = useState<string>("flights")
  const [selectedItem, setSelectedItem] = useState<OnlineFlight | OnlineController | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab)
  }

  const handleItemClick = (item: OnlineFlight | OnlineController) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
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

  const renderFlightDetails = (flight: OnlineFlight) => (
    <div className="ios-detail-content">
      {/* 头部信息 */}
      <div className="ios-detail-header">
        <div className="ios-detail-header__callsign">{flight.callsign}</div>
        <div className="ios-detail-header__name">{flight.name}</div>
        <div className="ios-detail-header__badge">
          {flight.flight_plan?.aircraft || 'N/A'}
        </div>
      </div>

      {/* 飞行数据 */}
      <div className="ios-detail-section">
        <div className="ios-detail-section__title">
          <FlightIcon className="ios-detail-section__icon" />
          飞行信息
        </div>
        <div className="ios-detail-list">
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">高度</div>
            <div className="ios-detail-item__value">{flight.altitude.toLocaleString()} ft</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">地速</div>
            <div className="ios-detail-item__value">{flight.groundspeed} kts</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">航向</div>
            <div className="ios-detail-item__value">{Math.round(flight.heading)}°</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">应答机</div>
            <div className="ios-detail-item__value">{flight.transponder.toString().padStart(4, '0')}</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">坐标</div>
            <div className="ios-detail-item__value">{flight.latitude.toFixed(4)}, {flight.longitude.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* 飞行计划 */}
      {flight.flight_plan && (
        <div className="ios-detail-section">
          <div className="ios-detail-section__title">
            飞行计划
          </div>
          <div className="ios-detail-list">
            <div className="ios-detail-item">
              <div className="ios-detail-item__label">出发</div>
              <div className="ios-detail-item__value">{flight.flight_plan.departure || 'N/A'}</div>
            </div>
            <div className="ios-detail-item">
              <div className="ios-detail-item__label">到达</div>
              <div className="ios-detail-item__value">{flight.flight_plan.arrival || 'N/A'}</div>
            </div>
            <div className="ios-detail-item">
              <div className="ios-detail-item__label">飞行规则</div>
              <div className="ios-detail-item__value">{flight.flight_plan.flight_rules}</div>
            </div>
            {flight.flight_plan.route && (
              <div className="ios-detail-item ios-detail-item--full">
                <div className="ios-detail-item__label">航路</div>
                <div className="ios-detail-item__value ios-detail-item__value--route">{flight.flight_plan.route}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  const renderControllerDetails = (controller: OnlineController) => (
    <div className="ios-detail-content">
      {/* 头部信息 */}
      <div className="ios-detail-header">
        <div className="ios-detail-header__callsign">{controller.callsign}</div>
        <div className="ios-detail-header__name">{controller.name}</div>
        <div className="ios-detail-header__badge ios-detail-header__badge--success">
          {controller.frequency}
        </div>
      </div>

      {/* 管制信息 */}
      <div className="ios-detail-section">
        <div className="ios-detail-section__title">
          <HeadsetIcon className="ios-detail-section__icon" />
          管制信息
        </div>
        <div className="ios-detail-list">
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">呼号</div>
            <div className="ios-detail-item__value">{controller.callsign}</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">频率</div>
            <div className="ios-detail-item__value">{controller.frequency}</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">等级</div>
            <div className="ios-detail-item__value">{getControllerRating(controller.rating)}</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">管制范围</div>
            <div className="ios-detail-item__value">{controller.visual_range} nm</div>
          </div>
          <div className="ios-detail-item">
            <div className="ios-detail-item__label">坐标</div>
            <div className="ios-detail-item__value">{controller.latitude.toFixed(4)}, {controller.longitude.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* ATIS信息 */}
      {controller.text_atis && controller.text_atis.length > 0 && (
        <div className="ios-detail-section">
          <div className="ios-detail-section__title">
            ATIS信息
          </div>
          <div className="ios-detail-item ios-detail-item--full">
            <div className="ios-detail-item__value ios-detail-item__value--atis">
              {controller.text_atis.join('\n')}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderFlightCard = (flight: OnlineFlight) => (
    <div 
      key={flight.session_id} 
      className={`ios-card ${listLayoutType === 'vertical' ? 'ios-card--vertical' : 'ios-card--horizontal'}`}
      onClick={() => handleItemClick(flight)}
    >
      {listLayoutType === 'vertical' ? (
        <>
          <div className="ios-card__aircraft-tag">
            {flight.flight_plan?.aircraft || 'N/A'}
          </div>
          
          <div className="ios-card__header">
            <div className="ios-card__callsign">{flight.callsign}</div>
            <div className="ios-card__name">{flight.name}</div>
          </div>
          
          <div className="ios-card__info-vertical">
            <div className="ios-card__info-item">
              <div className="ios-card__info-label">高度</div>
              <div className="ios-card__info-value">{flight.altitude.toLocaleString()} ft</div>
            </div>
            <div className="ios-card__info-item">
              <div className="ios-card__info-label">地速</div>
              <div className="ios-card__info-value">{flight.groundspeed} kts</div>
            </div>
            <div className="ios-card__info-item ios-card__info-item--route">
              <div className="ios-card__info-label">航线</div>
              <div className="ios-card__info-value ios-card__info-value--route">
                {flight.flight_plan?.departure || 'N/A'} → {flight.flight_plan?.arrival || 'N/A'}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ios-card__aircraft-tag">
            {flight.flight_plan?.aircraft || 'N/A'}
          </div>
          
          <div className="ios-card__header">
            <div>
              <div className="ios-card__callsign">{flight.callsign}</div>
              <div className="ios-card__name">{flight.name}</div>
            </div>
          </div>
          
          <div className="ios-card__info-horizontal">
            <div className="ios-card__info-row">
              <span className="ios-card__info-text">高度: {flight.altitude.toLocaleString()} ft</span>
              <span className="ios-card__info-text">地速: {flight.groundspeed} kts</span>
            </div>
            <div className="ios-card__info-row">
              <span className="ios-card__info-text">出发: {flight.flight_plan?.departure || 'N/A'}</span>
              <span className="ios-card__info-text">到达: {flight.flight_plan?.arrival || 'N/A'}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )

  const renderControllerCard = (controller: OnlineController) => (
    <div 
      key={controller.session_id} 
      className={`ios-card ${listLayoutType === 'vertical' ? 'ios-card--vertical' : 'ios-card--horizontal'}`}
      onClick={() => handleItemClick(controller)}
    >
      {listLayoutType === 'vertical' ? (
        <>
          <div className="ios-card__header">
            <div className="ios-card__callsign">{controller.callsign}</div>
            <div className="ios-card__name">{controller.name}</div>
          </div>
          
          <div className="ios-card__badge ios-card__badge--success">
            {controller.frequency}
          </div>
          
          <div className="ios-card__info-vertical">
            <div className="ios-card__info-item">
              <div className="ios-card__info-label">频率</div>
              <div className="ios-card__info-value">{controller.frequency}</div>
            </div>
            <div className="ios-card__info-item">
              <div className="ios-card__info-label">等级</div>
              <div className="ios-card__info-value">{getControllerRating(controller.rating)}</div>
            </div>
            <div className="ios-card__info-item ios-card__info-item--route">
              <div className="ios-card__info-label">范围</div>
              <div className="ios-card__info-value">{controller.visual_range} nm</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ios-card__header">
            <div>
              <div className="ios-card__callsign">{controller.callsign}</div>
              <div className="ios-card__name">{controller.name}</div>
            </div>
            <div className="ios-card__badge ios-card__badge--success">
              {controller.frequency}
            </div>
          </div>
          
          <div className="ios-card__info-horizontal">
            <div className="ios-card__info-row">
              <span className="ios-card__info-text">频率: {controller.frequency}</span>
              <span className="ios-card__info-text">等级: {getControllerRating(controller.rating)}</span>
            </div>
            <div className="ios-card__info-row">
              <span className="ios-card__info-text">服务器: {controller.server}</span>
              <span className="ios-card__info-text">范围: {controller.visual_range} nm</span>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="ios-listpage">
      {/* 头部 */}
      <div className="ios-listpage__header">
        <h1 className="ios-listpage__title">在线列表</h1>
        <p className="ios-listpage__subtitle">
          当前在线: {onlineFlights.length} 架航班, {onlineControllers.length} 个管制席位
          {searchQuery && (
            <> | 筛选结果: {filteredFlights.length} 架航班, {filteredControllers.length} 个管制席位</>
          )}
        </p>
      </div>

      {/* 搜索框 */}
      <div className="ios-listpage__search">
        <div className="ios-search">
          <SearchIcon className="ios-search__icon" />
          <input
            type="text"
            className="ios-search__input"
            placeholder="搜索呼号、姓名或CID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 分段控制器 */}
      <div className="ios-listpage__tabs">
        <div className="ios-segment-control">
          <button 
            className={`ios-segment-control__item ${selectedTab === 'flights' ? 'ios-segment-control__item--active' : ''}`}
            onClick={() => handleTabSelect('flights')}
          >
            <FlightIcon className="ios-segment-control__icon" />
            <span>机组</span>
            <span className="ios-segment-control__count">({searchQuery ? filteredFlights.length : onlineFlights.length})</span>
          </button>
          <button 
            className={`ios-segment-control__item ${selectedTab === 'controllers' ? 'ios-segment-control__item--active' : ''}`}
            onClick={() => handleTabSelect('controllers')}
          >
            <HeadsetIcon className="ios-segment-control__icon" />
            <span>管制员</span>
            <span className="ios-segment-control__count">({searchQuery ? filteredControllers.length : onlineControllers.length})</span>
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="ios-listpage__content">
        <div className={listLayoutType === 'vertical' ? 'ios-grid--vertical' : 'ios-grid--horizontal'}>
          {selectedTab === "flights" 
            ? filteredFlights.map(renderFlightCard)
            : filteredControllers.map(renderControllerCard)
          }
        </div>
      </div>

      {/* HIG风格Drawer */}
      {isModalOpen && selectedItem && (
        <div className="ios-drawer-overlay" onClick={handleModalClose}>
          <div className="ios-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ios-drawer__header">
              <div className="ios-drawer__title">
                {'callsign' in selectedItem && 'altitude' in selectedItem
                  ? `${selectedItem.callsign} - 飞行详情`
                  : `${(selectedItem as OnlineController).callsign} - 管制详情`
                }
              </div>
              <button className="ios-drawer__close" onClick={handleModalClose}>
                <CloseIcon />
              </button>
            </div>
            <div className="ios-drawer__body">
              {'callsign' in selectedItem && 'altitude' in selectedItem
                ? renderFlightDetails(selectedItem as OnlineFlight)
                : renderControllerDetails(selectedItem as OnlineController)
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}