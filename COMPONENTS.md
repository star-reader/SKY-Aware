# SKY-Aware 多平台组件库文档

一个专为跨平台应用设计的React组件库，支持iOS、Windows、Material Design等多种设计语言。

## 🎯 特性

- 🌍 **多平台支持**: iOS、Windows、Android、Web
- 🎨 **原生设计**: 每个平台都遵循其原生设计规范
- ♿ **无障碍友好**: 完整的ARIA支持和键盘导航
- 🌙 **深色模式**: 全面的深色模式支持
- 📱 **响应式设计**: 完美适配各种屏幕尺寸
- ⚡ **TypeScript**: 完整的TypeScript类型支持

---

## 📋 组件列表

- [Button](#button) - 按钮组件
- [Navbar](#navbar) - 导航栏组件
- [Alert](#alert) - 提示框组件
- [Panel](#panel) - 面板组件
- [Input](#input) - 输入框组件
- [List](#list) - 列表组件
- [Spinner](#spinner) - 加载动画组件
- [Card](#card) - 卡片组件
- [Dropdown](#dropdown) - 下拉选择组件
- [SegmentControl](#segmentcontrol) - 分段控制器组件

---

## Button

多平台按钮组件，支持多种样式变体和状态。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| variant | `'contained' \| 'outlined' \| 'text' \| 'primary' \| 'destructive'` | `'contained'` | 按钮样式变体 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| onClick | `(event: MouseEvent<HTMLButtonElement>) => void` | - | 点击事件回调 |
| icon | `ReactNode` | - | 图标元素 |
| children | `ReactNode` | - | 按钮内容 |
| aria-label | `string` | - | 无障碍标签 |
| className | `string` | - | 自定义CSS类名 |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮类型 |

### 示例

```tsx
import { Button } from '@/components/common';

function App() {
  return (
    <div>
      {/* 基础按钮 */}
      <Button onClick={() => console.log('clicked')}>
        点击我
      </Button>

      {/* 主要按钮 */}
      <Button variant="primary" size="large">
        确认
      </Button>

      {/* 危险按钮 */}
      <Button variant="destructive">
        删除
      </Button>

      {/* 带图标的按钮 */}
      <Button 
        icon={<PlusIcon />} 
        variant="outlined"
      >
        添加
      </Button>

      {/* 加载状态 */}
      <Button loading>
        提交中...
      </Button>
    </div>
  );
}
```

---

## Navbar

多平台导航栏组件，支持底部、顶部和侧边栏布局。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| items | `NavbarItem[]` | - | 导航项数组 |
| position | `'top' \| 'bottom' \| 'sidebar'` | `'bottom'` | 导航栏位置 |
| activeItem | `string` | - | 当前激活项 |
| onItemClick | `(item: NavbarItem) => void` | - | 项目点击回调 |
| showLabels | `boolean` | `true` | 是否显示标签 |
| safeArea | `boolean` | `true` | 是否启用安全区域 |
| className | `string` | - | 自定义CSS类名 |

### NavbarItem

| 属性 | 类型 | 描述 |
|------|------|------|
| label | `string` | 显示标签 |
| icon | `ReactNode` | 图标元素 |
| route | `string` | 路由路径 |
| badge | `string \| number` | 徽章内容 |

### 示例

```tsx
import { Navbar } from '@/components/common';
import { HomeIcon, SearchIcon, ProfileIcon } from '@/icons';

const navItems = [
  {
    label: '首页',
    icon: <HomeIcon />,
    route: '/home'
  },
  {
    label: '搜索',
    icon: <SearchIcon />,
    route: '/search',
    badge: 3
  },
  {
    label: '我的',
    icon: <ProfileIcon />,
    route: '/profile'
  }
];

function App() {
  const [activeItem, setActiveItem] = useState('/home');

  return (
    <Navbar
      items={navItems}
      position="bottom"
      activeItem={activeItem}
      onItemClick={(item) => setActiveItem(item.route)}
      safeArea
    />
  );
}
```

---

## Alert

多平台提示框组件，支持多种类型和自动消失。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'success' \| 'error' \| 'warning' \| 'info'` | - | 提示类型 |
| message | `string` | - | 提示消息 |
| dismissible | `boolean` | `false` | 是否可手动关闭 |
| autoDismiss | `boolean` | `false` | 是否自动消失 |
| onDismiss | `() => void` | - | 关闭回调 |
| icon | `ReactNode` | - | 自定义图标 |
| position | `'top' \| 'bottom' \| 'center'` | `'top'` | 显示位置 |
| className | `string` | - | 自定义CSS类名 |

### 示例

```tsx
import { Alert } from '@/components/common';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowAlert(true)}>
        显示提示
      </Button>

      {showAlert && (
        <Alert
          type="success"
          message="操作成功完成！"
          dismissible
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* 自动消失的警告 */}
      <Alert
        type="warning"
        message="这是一个警告消息"
        autoDismiss
      />

      {/* 错误提示 */}
      <Alert
        type="error"
        message="网络连接失败，请检查网络设置"
        dismissible
      />
    </div>
  );
}
```

---

## Panel

多平台面板组件，支持模态框、卡片和侧边栏模式。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| open | `boolean` | - | 是否打开 |
| onClose | `() => void` | - | 关闭回调 |
| title | `string` | - | 标题 |
| content | `ReactNode` | - | 内容 |
| icon | `ReactNode` | - | 图标 |
| actionText | `string` | - | 操作按钮文本 |
| onAction | `() => void` | - | 操作按钮回调 |
| variant | `'modal' \| 'card' \| 'sidebar'` | `'modal'` | 面板变体 |
| backdropDismiss | `boolean` | `true` | 点击背景关闭 |
| className | `string` | - | 自定义CSS类名 |

### 示例

```tsx
import { Panel } from '@/components/common';

function App() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setPanelOpen(true)}>
        打开面板
      </Button>

      {/* 模态框面板 */}
      <Panel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title="确认操作"
        content={
          <p>您确定要执行此操作吗？此操作不可撤销。</p>
        }
        actionText="确认"
        onAction={() => {
          console.log('执行操作');
          setPanelOpen(false);
        }}
        variant="modal"
      />

      {/* 卡片面板 */}
      <Panel
        open={true}
        title="信息卡片"
        content={<p>这是一个信息展示卡片</p>}
        variant="card"
      />
    </div>
  );
}
```

---

## Input

多平台输入框组件，支持多种输入类型和验证状态。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'text' \| 'password' \| 'email' \| 'number'` | `'text'` | 输入类型 |
| value | `string` | - | 输入值 |
| onChange | `(event: ChangeEvent<HTMLInputElement>) => void` | - | 值变化回调 |
| placeholder | `string` | - | 占位符文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| error | `boolean` | `false` | 是否显示错误状态 |
| label | `string` | - | 标签文本 |
| icon | `ReactNode` | - | 图标元素 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |

### 示例

```tsx
import { Input } from '@/components/common';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <form>
      {/* 基础输入框 */}
      <Input
        label="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="请输入用户名"
      />

      {/* 密码输入框 */}
      <Input
        type="password"
        label="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="请输入密码"
      />

      {/* 邮箱输入框（错误状态） */}
      <Input
        type="email"
        label="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="请输入邮箱地址"
        error={hasError}
        icon={<EmailIcon />}
      />

      {/* 禁用状态 */}
      <Input
        label="只读字段"
        value="不可编辑的内容"
        disabled
      />
    </form>
  );
}
```

---

## List

多平台列表组件，支持多种列表项样式和交互。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| items | `ListItem[]` | - | 列表项数组 |
| onItemClick | `(item: ListItem) => void` | - | 项目点击回调 |
| selectedItem | `string` | - | 选中项ID |
| dense | `boolean` | `false` | 紧凑模式 |
| dividers | `boolean` | `false` | 显示分割线 |
| subheader | `string` | - | 子标题 |
| scrollable | `boolean` | `false` | 可滚动 |
| maxHeight | `string` | - | 最大高度 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |

### ListItem

| 属性 | 类型 | 描述 |
|------|------|------|
| id | `string` | 唯一标识 |
| label | `string` | 主要文本 |
| sublabel | `string` | 副标题文本 |
| icon | `ReactNode` | 图标元素 |
| avatar | `ReactNode` | 头像元素 |
| disabled | `boolean` | 是否禁用 |
| action | `ReactNode` | 操作元素 |
| href | `string` | 链接地址 |

### 示例

```tsx
import { List } from '@/components/common';

const listItems = [
  {
    id: '1',
    label: '张三',
    sublabel: '产品经理',
    avatar: <Avatar src="/avatar1.jpg" />,
    action: <MoreIcon />
  },
  {
    id: '2',
    label: '李四',
    sublabel: '前端开发',
    avatar: <Avatar src="/avatar2.jpg" />,
    action: <MoreIcon />
  },
  {
    id: '3',
    label: '设置',
    icon: <SettingsIcon />,
    href: '/settings'
  }
];

function App() {
  const [selectedId, setSelectedId] = useState('1');

  return (
    <List
      items={listItems}
      selectedItem={selectedId}
      onItemClick={(item) => setSelectedId(item.id)}
      subheader="团队成员"
      dividers
    />
  );
}
```

---

## Spinner

多平台加载动画组件，支持多种样式和尺寸。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 动画尺寸 |
| color | `string` | - | 颜色 |
| visible | `boolean` | `true` | 是否可见 |
| label | `string` | - | 标签文本 |
| variant | `'indeterminate' \| 'determinate'` | `'indeterminate'` | 动画类型 |
| value | `number` | - | 进度值（0-100） |
| thickness | `number` | - | 线条粗细 |
| aria-label | `string` | - | 无障碍标签 |
| className | `string` | - | 自定义CSS类名 |

### 示例

```tsx
import { Spinner } from '@/components/common';

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div>
      {/* 基础加载动画 */}
      <Spinner />

      {/* 带标签的加载动画 */}
      <Spinner 
        size="large" 
        label="加载中..." 
      />

      {/* 进度条样式 */}
      <Spinner
        variant="determinate"
        value={progress}
        label={`加载进度 ${progress}%`}
      />

      {/* 条件显示 */}
      {loading && (
        <Spinner
          color="#007AFF"
          label="请稍候..."
        />
      )}

      <Button onClick={() => setLoading(!loading)}>
        切换加载状态
      </Button>
    </div>
  );
}
```

---

## Card

多平台卡片组件，支持图片、标题和交互。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| children | `ReactNode` | - | 卡片内容 |
| image | `string` | - | 图片URL |
| title | `string` | - | 标题 |
| subtitle | `string` | - | 副标题 |
| onClick | `(event: MouseEvent<HTMLElement>) => void` | - | 点击回调 |
| elevation | `number` | `1` | 阴影级别 |
| className | `string` | - | 自定义CSS类名 |

### 示例

```tsx
import { Card, Button } from '@/components/common';

function App() {
  return (
    <div>
      {/* 基础卡片 */}
      <Card
        title="基础卡片"
        subtitle="这是一个简单的卡片组件"
      >
        <p>卡片内容区域，可以放置任何内容。</p>
        <Button size="small">了解更多</Button>
      </Card>

      {/* 带图片的卡片 */}
      <Card
        image="/product-image.jpg"
        title="产品名称"
        subtitle="￥299.00"
        onClick={() => console.log('卡片被点击')}
        elevation={2}
      >
        <p>产品描述信息...</p>
      </Card>

      {/* 自定义内容卡片 */}
      <Card elevation={3}>
        <div style={{ padding: '16px' }}>
          <h3>自定义卡片</h3>
          <p>完全自定义的卡片内容</p>
          <div>
            <Button variant="primary" size="small">
              确认
            </Button>
            <Button variant="outlined" size="small">
              取消
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

---

## Dropdown

多平台下拉选择组件，支持单选、多选和搜索。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| options | `DropdownOption[]` | - | 选项数组 |
| value | `string \| string[]` | - | 选中值 |
| defaultValue | `string \| string[]` | - | 默认值 |
| placeholder | `string` | - | 占位符文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| multiSelect | `boolean` | `false` | 多选模式 |
| searchable | `boolean` | `false` | 可搜索 |
| clearable | `boolean` | `false` | 可清除 |
| label | `string` | - | 标签文本 |
| error | `boolean` | `false` | 错误状态 |
| errorMessage | `string` | - | 错误消息 |
| required | `boolean` | `false` | 必填 |
| onSelectionChange | `(option, value) => void` | - | 选择变化回调 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |

### DropdownOption

| 属性 | 类型 | 描述 |
|------|------|------|
| key | `string` | 唯一标识 |
| text | `string` | 显示文本 |
| value | `any` | 选项值 |
| disabled | `boolean` | 是否禁用 |
| selected | `boolean` | 是否选中 |

### 示例

```tsx
import { Dropdown } from '@/components/common';

const cityOptions = [
  { key: 'bj', text: '北京', value: 'beijing' },
  { key: 'sh', text: '上海', value: 'shanghai' },
  { key: 'gz', text: '广州', value: 'guangzhou' },
  { key: 'sz', text: '深圳', value: 'shenzhen' }
];

const skillOptions = [
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'ts', text: 'TypeScript', value: 'typescript' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'vue', text: 'Vue', value: 'vue' }
];

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <div>
      {/* 单选下拉框 */}
      <Dropdown
        label="选择城市"
        options={cityOptions}
        value={selectedCity}
        placeholder="请选择城市"
        onSelectionChange={(option, value) => setSelectedCity(value)}
        searchable
        clearable
      />

      {/* 多选下拉框 */}
      <Dropdown
        label="技能标签"
        options={skillOptions}
        value={selectedSkills}
        placeholder="选择技能"
        multiSelect
        onSelectionChange={(option, value) => setSelectedSkills(value)}
        required
      />

      {/* 禁用状态 */}
      <Dropdown
        label="不可选择"
        options={cityOptions}
        placeholder="已禁用"
        disabled
      />
    </div>
  );
}
```

---

## SegmentControl

多平台分段控制器组件，支持标签页和分段选择两种模式。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| options | `SegmentOption[]` | - | 选项数组 |
| value | `string` | - | 当前选中值 |
| onChange | `(value: string) => void` | - | 值变化回调 |
| variant | `'tabs' \| 'segmented'` | `'segmented'` | 显示变体 |
| fullWidth | `boolean` | `false` | 全宽模式 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |

### SegmentOption

| 属性 | 类型 | 描述 |
|------|------|------|
| value | `string` | 选项值 |
| label | `string` | 显示文本 |
| disabled | `boolean` | 是否禁用 |
| icon | `ReactNode` | 图标元素 |

### 示例

```tsx
import { SegmentControl } from '@/components/common';

const viewOptions = [
  { value: 'list', label: '列表', icon: <ListIcon /> },
  { value: 'grid', label: '网格', icon: <GridIcon /> },
  { value: 'card', label: '卡片', icon: <CardIcon /> }
];

const tabOptions = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待处理' },
  { value: 'completed', label: '已完成' }
];

function App() {
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div>
      {/* 分段控制器模式 */}
      <SegmentControl
        options={viewOptions}
        value={viewMode}
        onChange={setViewMode}
        variant="segmented"
        size="large"
        aria-label="选择视图模式"
      />

      {/* 标签页模式 */}
      <SegmentControl
        options={tabOptions}
        value={activeTab}
        onChange={setActiveTab}
        variant="tabs"
        fullWidth
        aria-label="选择任务状态"
      />

      {/* 小尺寸分段控制器 */}
      <SegmentControl
        options={[
          { value: 'edit', label: '编辑' },
          { value: 'preview', label: '预览' }
        ]}
        value="edit"
        onChange={() => {}}
        size="small"
      />

      {/* 禁用状态 */}
      <SegmentControl
        options={viewOptions}
        value={viewMode}
        onChange={setViewMode}
        disabled
      />
    </div>
  );
}
```

---

## 🎨 平台适配

### iOS 风格
- 遵循 Apple Human Interface Guidelines
- 使用 SF Pro 字体系列
- 圆角设计和流畅动画
- 支持 iOS Common 和 Liquid Glass 变体

### Windows 风格
- 基于 Fluent Design System
- 使用 Segoe UI 字体
- 清晰的层次结构和微妙的阴影
- 完整的 Fluent UI React v9 集成

### Material 风格
- 遵循 Material Design 3 规范
- 使用 Roboto 字体
- 丰富的色彩系统和动画效果
- 完整的 Material-UI 集成

### 响应式设计
- 自动适配不同屏幕尺寸
- 移动端优化的触摸交互
- 平板和桌面端的优化布局

---

## 🛠️ 开发指南

### 安装

```bash
npm install @sky-aware/components
# 或
yarn add @sky-aware/components
```

### 基础使用

```tsx
import { Button, Navbar, Alert } from '@sky-aware/components';

function App() {
  return (
    <div>
      <Navbar items={navItems} />
      <Alert type="success" message="欢迎使用!" />
      <Button variant="primary">开始使用</Button>
    </div>
  );
}
```

### 主题定制

```scss
// 自定义主题变量
:root {
  --primary-color: #007AFF;
  --secondary-color: #34C759;
  --background-color: #F2F2F7;
  --text-color: #1C1C1E;
}

// 深色模式
html[aria-label="dark"] {
  --primary-color: #0A84FF;
  --background-color: #1C1C1E;
  --text-color: #FFFFFF;
}
```

### TypeScript 支持

所有组件都提供完整的 TypeScript 类型定义：

```tsx
import type { 
  ButtonProps, 
  NavbarProps, 
  AlertProps 
} from '@sky-aware/components';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 📱 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | ≥ 88 |
| Firefox | ≥ 85 |
| Safari | ≥ 14 |
| Edge | ≥ 88 |

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/your-org/sky-aware)
- [设计规范](./DESIGN.md)
- [更新日志](./CHANGELOG.md) 