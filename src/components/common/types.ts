import { ReactNode, CSSProperties } from 'react'
import { PlatformType } from '../../utils/getPlatform'

// 通用平台样式类型
export type PlatformStyle = 'ios-common' | 'ios-liquid-glass' | 'windows' | 'web-android'

// 通用组件大小
export type ComponentSize = 'small' | 'medium' | 'large'

// 通用颜色变体
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

// 按钮组件属性
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  icon?: ReactNode
  children?: ReactNode
  'aria-label'?: string
  style?: CSSProperties
  className?: string
}

// 导航栏项目
export interface NavItem {
  label: string
  icon?: ReactNode
  route: string
  badge?: string | number
}

// 导航栏组件属性
export interface NavbarProps {
  items: NavItem[]
  position?: 'top' | 'bottom' | 'sidebar'
  activeItem?: string
  onItemClick?: (item: NavItem) => void
  showLabels?: boolean
  safeArea?: boolean
  style?: CSSProperties
  className?: string
}

// 警告组件属性
export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  dismissible?: boolean
  autoDismiss?: boolean | number
  onDismiss?: () => void
  icon?: ReactNode
  position?: 'top' | 'bottom' | 'center'
  style?: CSSProperties
  className?: string
}

// 面板组件属性
export interface PanelProps {
  children: ReactNode
  variant?: 'modal' | 'card' | 'sidebar'
  scrollable?: boolean
  onClose?: () => void
  padding?: boolean
  backdrop?: boolean
  style?: CSSProperties
  className?: string
}

// 输入框组件属性
export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string | boolean
  label?: string
  icon?: ReactNode
  style?: CSSProperties
  className?: string
  'aria-label'?: string
}

// 列表项目
export interface ListItem {
  id: string
  label: string
  sublabel?: string
  icon?: ReactNode
  disabled?: boolean
}

// 列表组件属性
export interface ListProps {
  items: ListItem[]
  onSelect?: (item: ListItem) => void
  selected?: string | string[]
  divider?: boolean
  header?: string
  scrollable?: boolean
  style?: CSSProperties
  className?: string
}

// 模态框组件属性
export interface ModalProps {
  open: boolean
  onClose?: () => void
  children: ReactNode
  title?: string
  backdropDismiss?: boolean
  size?: ComponentSize
  style?: CSSProperties
  className?: string
}

// 图标组件属性
export interface IconProps {
  name: string
  size?: ComponentSize
  color?: string
  'aria-label'?: string
  onClick?: () => void
  style?: CSSProperties
  className?: string
}

// 加载指示器组件属性
export interface SpinnerProps {
  size?: ComponentSize
  color?: string
  visible?: boolean
  'aria-label'?: string
  style?: CSSProperties
  className?: string
}

// 卡片组件属性
export interface CardProps {
  children?: ReactNode
  image?: string
  title?: string
  subtitle?: string
  onClick?: () => void
  elevation?: number
  style?: CSSProperties
  className?: string
}

// 下拉选项
export interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
}

// 下拉组件属性
export interface DropdownProps {
  options: DropdownOption[]
  value?: string | number | (string | number)[]
  onChange?: (value: string | number | (string | number)[]) => void
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  label?: string
  style?: CSSProperties
  className?: string
}

// 动作表单动作
export interface ActionSheetAction {
  label: string
  onClick: () => void
  destructive?: boolean
  disabled?: boolean
}

// 动作表单组件属性
export interface ActionSheetProps {
  open: boolean
  actions: ActionSheetAction[]
  onClose?: () => void
  title?: string
  cancelButton?: boolean
  backdropDismiss?: boolean
  style?: CSSProperties
  className?: string
}

// 警告对话框动作
export interface AlertDialogAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'destructive'
}

// 警告对话框组件属性
export interface AlertDialogProps {
  open: boolean
  title?: string
  message: string
  actions: AlertDialogAction[]
  onClose?: () => void
  backdropDismiss?: boolean
  style?: CSSProperties
  className?: string
}

// 复选框组件属性
export interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  'aria-label'?: string
  style?: CSSProperties
  className?: string
}

// 表单组件属性
export interface FormProps {
  onSubmit?: (event: React.FormEvent) => void
  children: ReactNode
  disabled?: boolean
  error?: string
  layout?: 'vertical' | 'horizontal'
  style?: CSSProperties
  className?: string
}

// 表单段落组件属性
export interface FormSectionProps {
  children: ReactNode
  title?: string
  description?: string
  divider?: boolean
  padding?: boolean
  style?: CSSProperties
  className?: string
}

// 分段控制选项
export interface SegmentOption {
  value: string
  label: string
  disabled?: boolean
}

// 分段控制组件属性
export interface SegmentControlProps {
  options: SegmentOption[]
  value?: string
  onChange?: (value: string) => void
  variant?: 'tabs' | 'segmented'
  fullWidth?: boolean
  style?: CSSProperties
  className?: string
}

// 导航标题栏动作
export interface NavigationAction {
  icon: ReactNode
  onClick: () => void
  label?: string
  disabled?: boolean
}

// 导航标题栏组件属性
export interface NavigationTitleBarProps {
  title?: string
  actions?: NavigationAction[]
  backButton?: boolean
  onBackClick?: () => void
  centerTitle?: boolean
  safeArea?: boolean
  style?: CSSProperties
  className?: string
}

// 平台样式钩子
export interface UsePlatformStyleResult {
  platform: PlatformType
  style: PlatformStyle
  isIOS: boolean
  isWindows: boolean
  isWebAndroid: boolean
  isLiquidGlass: boolean
}

// 平台样式配置
export interface PlatformStyleConfig {
  forcePlatform?: PlatformType
  forceStyle?: PlatformStyle
  enableLiquidGlass?: boolean
} 