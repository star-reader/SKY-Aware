import { ReactNode, MouseEvent, FormEvent, ChangeEvent } from 'react';

// Common types
export type Platform = 'ios' | 'macos' | 'windows' | 'android' | 'web' | 'linux';
export type Size = 'small' | 'medium' | 'large';
export type Variant = 'contained' | 'outlined' | 'text' | 'primary' | 'destructive';
export type Position = 'top' | 'bottom' | 'sidebar';
export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type InputType = 'text' | 'password' | 'email' | 'number';
export type PanelVariant = 'modal' | 'card' | 'sidebar';
export type SegmentVariant = 'tabs' | 'segmented';

// Button types
export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  children?: ReactNode;
  'aria-label'?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Navbar types
export interface NavbarItem {
  label: string;
  icon?: ReactNode;
  route?: string;
  badge?: string | number;
}

export interface NavbarProps {
  items: NavbarItem[];
  position?: Position;
  activeItem?: string;
  onItemClick?: (item: NavbarItem) => void;
  showLabels?: boolean;
  safeArea?: boolean;
  className?: string;
}

// Alert types
export interface AlertProps {
  type: AlertType;
  message: string;
  dismissible?: boolean;
  autoDismiss?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  position?: 'top' | 'bottom' | 'center';
  className?: string;
}

// Panel types
export interface PanelProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
  icon?: ReactNode; // 大图标/主要内容区域
  actionText?: string; // 操作按钮文本
  onAction?: () => void; // 操作按钮回调
  variant?: PanelVariant;
  backdropDismiss?: boolean;
  className?: string;
}

// Input types
export interface InputProps {
  type?: InputType;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  icon?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

// List types
export interface ListItem {
  id: string;
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  avatar?: ReactNode;
  disabled?: boolean;
  action?: ReactNode;
  href?: string;
}

export interface ListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
  selectedItem?: string;
  dense?: boolean;
  dividers?: boolean;
  subheader?: string;
  scrollable?: boolean;
  maxHeight?: string;
  className?: string;
  'aria-label'?: string;
}

// Modal types
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  backdropDismiss?: boolean;
  size?: Size;
  className?: string;
}

// Icon types
export interface IconProps {
  name: string;
  size?: Size;
  color?: string;
  'aria-label'?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
}

// Spinner types
export interface SpinnerProps {
  size?: Size;
  color?: string;
  visible?: boolean;
  label?: string;
  variant?: 'indeterminate' | 'determinate';
  value?: number; // for determinate variant (0-100)
  thickness?: number; // for customizing circle thickness
  'aria-label'?: string;
  className?: string;
}

// Card types
export interface CardProps {
  children?: ReactNode;
  image?: string;
  title?: string;
  subtitle?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  elevation?: number;
  className?: string;
}

export interface DropdownOption {
  key: string;
  text: string;
  value?: any;
  disabled?: boolean;
  selected?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  onSelectionChange?: (option: DropdownOption | DropdownOption[] | undefined, value?: string | string[]) => void;
  className?: string;
  'aria-label'?: string;
}

// ActionSheet types
export interface ActionSheetAction {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

export interface ActionSheetProps {
  open: boolean;
  actions: ActionSheetAction[];
  onClose?: () => void;
  title?: string;
  cancelButton?: boolean;
  backdropDismiss?: boolean;
  className?: string;
}

// AlertDialog types
export interface AlertDialogAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export interface AlertDialogProps {
  open: boolean;
  title?: string;
  message: string;
  actions: AlertDialogAction[];
  onClose?: () => void;
  backdropDismiss?: boolean;
  className?: string;
}

// Checkbox types
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  'aria-label'?: string;
  className?: string;
}

// Form types
export interface FormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  disabled?: boolean;
  error?: boolean;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

// FormSection types
export interface FormSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  divider?: boolean;
  padding?: boolean;
  className?: string;
}

// SegmentControl types
export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SegmentControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'tabs' | 'segmented';
  fullWidth?: boolean;
  disabled?: boolean;
  size?: Size;
  className?: string;
  'aria-label'?: string;
}

// Dialog types
export interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
}

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
  actions?: DialogAction[];
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  scrollable?: boolean;
  backdrop?: boolean;
  backdropDismiss?: boolean;
  draggable?: boolean;
  icon?: ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Popover types
export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type PopoverTrigger = 'click' | 'hover' | 'manual';

export interface PopoverProps {
  open: boolean;
  onClose?: () => void;
  anchorEl?: HTMLElement | null;
  position?: PopoverPosition;
  trigger?: PopoverTrigger;
  title?: string;
  content?: ReactNode;
  showCloseButton?: boolean;
  backdrop?: boolean;
  backdropDismiss?: boolean;
  arrow?: boolean;
  offset?: number;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// NavigationTitleBar types
export interface NavigationAction {
  icon: ReactNode;
  onClick: () => void;
  label: string;
}

export interface NavigationTitleBarProps {
  title: string;
  actions?: NavigationAction[];
  backButton?: boolean;
  centerTitle?: boolean;
  safeArea?: boolean;
  onBack?: () => void;
  className?: string;
} 