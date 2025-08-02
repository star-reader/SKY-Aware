import React, { useState, useRef, useEffect, useCallback } from 'react'
import './CustomFloatingPanel.scss'

interface CustomFloatingPanelProps {
  children: React.ReactNode
  onClose?: () => void
  initialHeight?: number
}

const CustomFloatingPanel: React.FC<CustomFloatingPanelProps> = ({
  children,
  onClose,
  initialHeight = 0.8
}) => {
  const [height, setHeight] = useState(initialHeight)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const startHeight = useRef(0)
  const velocity = useRef(0)
  const lastTime = useRef(0)
  const lastY = useRef(0)

  const anchors = [0.2, 0.4, 0.8, 1.0]

  // 找到最近的锚点
  const findNearestAnchor = useCallback((currentHeight: number, vel: number) => {
    // 如果速度很大，考虑惯性
    if (Math.abs(vel) > 0.5) {
      if (vel > 0) {
        // 向下滑动，找下一个更小的锚点
        const lowerAnchors = anchors.filter(anchor => anchor < currentHeight)
        return lowerAnchors.length > 0 ? Math.max(...lowerAnchors) : anchors[0]
      } else {
        // 向上滑动，找下一个更大的锚点
        const higherAnchors = anchors.filter(anchor => anchor > currentHeight)
        return higherAnchors.length > 0 ? Math.min(...higherAnchors) : anchors[anchors.length - 1]
      }
    }

    // 找最近的锚点
    return anchors.reduce((prev, curr) => 
      Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev
    )
  }, [])

  // 动画到目标高度
  const animateToHeight = useCallback((targetHeight: number) => {
    if (targetHeight <= 0.2) {
      // 如果目标是最低点，关闭面板
      setIsAnimating(true)
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300)
      return
    }

    setIsAnimating(true)
    setHeight(targetHeight)
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }, [onClose])

  // 触摸开始
  const handleTouchStart = useCallback((e: Event) => {
    const touchEvent = e as TouchEvent
    if (!panelRef.current) return
    
    const target = touchEvent.target as HTMLElement
    const contentArea = panelRef.current.querySelector('.custom-floating-panel-content') as HTMLElement
    const handleArea = panelRef.current.querySelector('.custom-floating-panel-handle')
    
    // 只有在手柄区域或非滚动内容区域才拖拽面板
    const isInHandle = handleArea?.contains(target)
    const isInContent = contentArea?.contains(target)
    
    if (!isInHandle && isInContent && contentArea) {
      // 在内容区域，检查是否可以滚动
      const canScrollUp = contentArea.scrollTop > 0
      const canScrollDown = contentArea.scrollTop < contentArea.scrollHeight - contentArea.clientHeight
      
      // 如果内容可以滚动，不拦截触摸事件
      if (canScrollUp || canScrollDown) {
        return
      }
    }
    
    const touch = touchEvent.touches[0]
    startY.current = touch.clientY
    startHeight.current = height
    lastY.current = touch.clientY
    lastTime.current = Date.now()
    velocity.current = 0
    setIsDragging(true)
    setIsAnimating(false)
    
    // 只在拖拽面板时阻止默认行为
    touchEvent.preventDefault()
  }, [height])

  // 触摸移动
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !panelRef.current) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - startY.current
    const viewportHeight = window.innerHeight
    const deltaHeight = -deltaY / viewportHeight
    
    let newHeight = Math.max(0, Math.min(1, startHeight.current + deltaHeight))
    
    // 添加阻力效果
    if (newHeight > 1) {
      const excess = newHeight - 1
      newHeight = 1 + excess * 0.3 // 30% 阻力
    } else if (newHeight < 0) {
      const excess = Math.abs(newHeight)
      newHeight = -excess * 0.3 // 30% 阻力
    }

    // 计算速度
    const currentTime = Date.now()
    const timeDelta = currentTime - lastTime.current
    if (timeDelta > 0) {
      velocity.current = (touch.clientY - lastY.current) / timeDelta
    }
    lastY.current = touch.clientY
    lastTime.current = currentTime

    setHeight(newHeight)
    e.preventDefault()
  }, [isDragging, startHeight])

  // 触摸结束
  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    
    // 应用惯性和找到最近的锚点
    const targetHeight = findNearestAnchor(height, velocity.current)
    animateToHeight(targetHeight)
  }, [isDragging, height, velocity, findNearestAnchor, animateToHeight])

  // 鼠标事件（桌面端支持）
  const handleMouseDown = useCallback((e: MouseEvent) => {
    startY.current = e.clientY
    startHeight.current = height
    lastY.current = e.clientY
    lastTime.current = Date.now()
    velocity.current = 0
    setIsDragging(true)
    setIsAnimating(false)
  }, [height])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return

    const deltaY = e.clientY - startY.current
    const viewportHeight = window.innerHeight
    const deltaHeight = -deltaY / viewportHeight
    
    let newHeight = Math.max(0, Math.min(1, startHeight.current + deltaHeight))
    
    // 添加阻力效果
    if (newHeight > 1) {
      const excess = newHeight - 1
      newHeight = 1 + excess * 0.3
    } else if (newHeight < 0) {
      const excess = Math.abs(newHeight)
      newHeight = -excess * 0.3
    }

    // 计算速度
    const currentTime = Date.now()
    const timeDelta = currentTime - lastTime.current
    if (timeDelta > 0) {
      velocity.current = (e.clientY - lastY.current) / timeDelta
    }
    lastY.current = e.clientY
    lastTime.current = currentTime

    setHeight(newHeight)
  }, [isDragging, startHeight])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    const targetHeight = findNearestAnchor(height, velocity.current)
    animateToHeight(targetHeight)
  }, [isDragging, height, findNearestAnchor, animateToHeight])

  // 内容区域特殊触摸处理
  const handleContentTouchStart = useCallback((e: Event) => {
    const touchEvent = e as TouchEvent
    const target = touchEvent.target as HTMLElement
    const contentArea = panelRef.current?.querySelector('.custom-floating-panel-content') as HTMLElement
    
    if (!contentArea?.contains(target)) return
    
    // 检查内容是否在顶部且向上滑动，或在底部且向下滑动
    const touch = touchEvent.touches[0]
    startY.current = touch.clientY
    startHeight.current = height
    lastY.current = touch.clientY
    lastTime.current = Date.now()
    velocity.current = 0
  }, [height])

  const handleContentTouchMove = useCallback((e: Event) => {
    const touchEvent = e as TouchEvent
    if (!panelRef.current) return
    
    const contentArea = panelRef.current.querySelector('.custom-floating-panel-content') as HTMLElement
    if (!contentArea) return
    
    const touch = touchEvent.touches[0]
    const deltaY = touch.clientY - startY.current
    
    // 内容在顶部且向下拖拽，或内容滚动到底部且向上拖拽时，可以拖拽面板
    const isAtTop = contentArea.scrollTop <= 0
    const isAtBottom = contentArea.scrollTop >= contentArea.scrollHeight - contentArea.clientHeight
    const isDraggingDown = deltaY > 0
    const isDraggingUp = deltaY < 0
    
    if ((isAtTop && isDraggingDown) || (isAtBottom && isDraggingUp)) {
      // 开始拖拽面板
      if (!isDragging) {
        setIsDragging(true)
        setIsAnimating(false)
      }
      
      // 计算面板高度变化
      const viewportHeight = window.innerHeight
      const deltaHeight = -deltaY / viewportHeight
      let newHeight = Math.max(0, Math.min(1, startHeight.current + deltaHeight))
      
      // 添加阻力效果
      if (newHeight > 1) {
        const excess = newHeight - 1
        newHeight = 1 + excess * 0.3
      } else if (newHeight < 0) {
        const excess = Math.abs(newHeight)
        newHeight = -excess * 0.3
      }

      // 计算速度
      const currentTime = Date.now()
      const timeDelta = currentTime - lastTime.current
      if (timeDelta > 0) {
        velocity.current = (touch.clientY - lastY.current) / timeDelta
      }
      lastY.current = touch.clientY
      lastTime.current = currentTime

      setHeight(newHeight)
      touchEvent.preventDefault()
    }
  }, [isDragging, startHeight])

  // 事件监听器
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const handleArea = panel.querySelector('.custom-floating-panel-handle')
    const contentArea = panel.querySelector('.custom-floating-panel-content')

    // 手柄区域监听触摸事件
    if (handleArea) {
      handleArea.addEventListener('touchstart', handleTouchStart, { passive: false })
    }
    
    // 内容区域的特殊触摸处理
    if (contentArea) {
      contentArea.addEventListener('touchstart', handleContentTouchStart, { passive: true })
      contentArea.addEventListener('touchmove', handleContentTouchMove, { passive: false })
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    // 鼠标事件（整个面板）
    panel.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (handleArea) {
        handleArea.removeEventListener('touchstart', handleTouchStart)
      }
      if (contentArea) {
        contentArea.removeEventListener('touchstart', handleContentTouchStart)
        contentArea.removeEventListener('touchmove', handleContentTouchMove)
      }
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      panel.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleTouchStart, handleContentTouchStart, handleContentTouchMove, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp])

  // 初始加载动画
  useEffect(() => {
    // 延迟一帧确保初始状态渲染完成
    const timer = requestAnimationFrame(() => {
      setIsAnimating(true)
      setIsVisible(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    })
    
    return () => cancelAnimationFrame(timer)
  }, [])

  // 背景点击关闭
  const handleBackdropClick = useCallback(() => {
    animateToHeight(0)
  }, [animateToHeight])

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className={`custom-floating-panel-backdrop ${isDragging ? 'dragging' : ''}`}
        style={{
          opacity: Math.min(1, height * 1.5),
          pointerEvents: height > 0.1 ? 'auto' : 'none'
        }}
        onClick={handleBackdropClick}
      />
      
      {/* 面板 */}
      <div
        ref={panelRef}
        className={`custom-floating-panel ${isDragging ? 'dragging' : ''} ${isAnimating ? 'animating' : ''} ${isVisible ? 'visible' : ''}`}
        style={{
          height: `${Math.max(0, Math.min(100, height * 100))}vh`,
          transform: isVisible 
            ? (height < 0 ? `translateY(${Math.abs(height) * 100}vh)` : 'translateY(0)')
            : 'translateY(100%)'
        }}
      >
        {/* 拖拽手柄 */}
        <div className="custom-floating-panel-handle">
          <div className="custom-floating-panel-handle-bar" />
        </div>
        
        {/* 内容 */}
        <div className="custom-floating-panel-content">
          {children}
        </div>
      </div>
    </>
  )
}

export default CustomFloatingPanel