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
- [Dialog](#dialog) - 对话框组件
- [Popover](#popover) - 弹出层组件
- [FormDialog](#formdialog) - 表单对话框组件

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

## Dialog

多平台对话框组件，支持响应式设计和多种交互模式。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| open | `boolean` | - | 是否打开对话框 |
| onClose | `() => void` | - | 关闭回调函数 |
| title | `string` | - | 对话框标题 |
| content | `ReactNode` | - | 对话框内容 |
| actions | `DialogAction[]` | - | 操作按钮数组 |
| size | `'small' \| 'medium' \| 'large' \| 'fullscreen'` | `'medium'` | 对话框尺寸 |
| scrollable | `boolean` | `false` | 内容是否可滚动 |
| backdrop | `boolean` | `true` | 是否显示背景遮罩 |
| backdropDismiss | `boolean` | `true` | 点击背景是否关闭 |
| draggable | `boolean` | `false` | 是否可拖拽（部分平台支持） |
| icon | `ReactNode` | - | 标题图标 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |
| aria-describedby | `string` | - | 无障碍描述 |

### DialogAction

| 属性 | 类型 | 描述 |
|------|------|------|
| label | `string` | 按钮文本 |
| onClick | `() => void` | 点击回调 |
| variant | `'primary' \| 'secondary' \| 'destructive'` | 按钮样式变体 |
| disabled | `boolean` | 是否禁用 |

### 响应式特性

- **iOS**: 移动端使用底部弹出样式，桌面端使用居中模态框
- **macOS**: 自动检测屏幕尺寸，768px以上使用macOS样式
- **Windows**: 遵循Fluent Design规范
- **Material**: 移动端自动全屏显示

### 示例

```tsx
import { Dialog } from '@/components/common';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogActions = [
    {
      label: '取消',
      onClick: () => setDialogOpen(false),
      variant: 'secondary'
    },
    {
      label: '确认',
      onClick: () => {
        console.log('确认操作');
        setDialogOpen(false);
      },
      variant: 'primary'
    }
  ];

  return (
    <div>
      <Button onClick={() => setDialogOpen(true)}>
        打开对话框
      </Button>

      {/* 基础对话框 */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="确认操作"
        content="您确定要执行此操作吗？此操作不可撤销。"
        actions={dialogActions}
      />

      {/* 警告对话框 */}
      <Dialog
        open={false}
        title="删除文件"
        content="您确定要删除这个文件吗？删除后无法恢复。"
        icon={<DeleteIcon />}
        actions={[
          {
            label: '删除',
            onClick: () => console.log('删除'),
            variant: 'destructive'
          },
          {
            label: '取消',
            onClick: () => {},
            variant: 'secondary'
          }
        ]}
        size="small"
      />

      {/* 表单对话框 */}
      <Dialog
        open={false}
        title="用户信息"
        content={
          <form>
            <input type="text" placeholder="姓名" />
            <input type="email" placeholder="邮箱" />
            <textarea placeholder="备注" />
          </form>
        }
        actions={[
          { label: '取消', onClick: () => {}, variant: 'secondary' },
          { label: '保存', onClick: () => {}, variant: 'primary' }
        ]}
        size="medium"
      />

      {/* 可滚动对话框 */}
      <Dialog
        open={false}
        title="长内容"
        content={
          <div>
            {/* 大量内容 */}
            <p>这里是很多内容...</p>
          </div>
        }
        scrollable
        size="large"
        actions={[
          { label: '关闭', onClick: () => {}, variant: 'primary' }
        ]}
      />

      {/* 全屏对话框 */}
      <Dialog
        open={false}
        title="全屏内容"
        content={<div>复杂的全屏内容</div>}
        size="fullscreen"
        actions={[
          { label: '关闭', onClick: () => {}, variant: 'primary' }
        ]}
      />
    </div>
  );
}
```

---

## FormDialog

表单对话框组件，专为表单场景设计的Dialog变体，只有一个主要操作按钮，类似macOS登录界面效果。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| open | `boolean` | - | 是否打开对话框 |
| onClose | `() => void` | - | 关闭回调函数 |
| title | `string` | - | 对话框标题 |
| content | `ReactNode` | - | 对话框内容 |
| action | `FormDialogAction` | - | 单个主要操作按钮 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 对话框尺寸 |
| backdrop | `boolean` | `true` | 是否显示背景遮罩 |
| backdropDismiss | `boolean` | `true` | 点击背景是否关闭 |
| icon | `ReactNode` | - | 标题图标 |
| className | `string` | - | 自定义CSS类名 |
| aria-label | `string` | - | 无障碍标签 |
| aria-describedby | `string` | - | 无障碍描述 |

### FormDialogAction

| 属性 | 类型 | 描述 |
|------|------|------|
| label | `string` | 按钮文本 |
| onClick | `() => void` | 点击回调 |
| disabled | `boolean` | 是否禁用 |
| loading | `boolean` | 是否显示加载状态 |

### 设计特点

- **macOS风格**: 桌面端使用类似macOS系统登录界面的设计
- **单一操作**: 专为表单场景设计，只有一个主要操作按钮
- **全宽按钮**: 操作按钮占满容器宽度，突出主要操作
- **响应式**: 移动端和桌面端自动适配不同的视觉效果

### 示例

```tsx
import { FormDialog } from '@/components/common';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 执行登录逻辑
      await login();
      setLoginOpen(false);
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setLoginOpen(true)}>
        登录
      </Button>

      {/* 登录弹窗 */}
      <FormDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="登录到您的账户"
        icon={<UserIcon />}
        content={
          <form>
            <Input
              label="用户名"
              placeholder="请输入用户名或邮箱"
              type="text"
            />
            <Input
              label="密码"
              placeholder="请输入密码"
              type="password"
            />
          </form>
        }
        action={{
          label: loading ? '登录中...' : '登录',
          loading: loading,
          onClick: handleLogin
        }}
        size="medium"
      />

      {/* 注册弹窗 */}
      <FormDialog
        open={false}
        title="创建新账户"
        icon={<AddUserIcon />}
        content={
          <div>
            <Input type="email" placeholder="邮箱地址" />
            <Input type="password" placeholder="密码" />
            <Input type="password" placeholder="确认密码" />
          </div>
        }
        action={{
          label: '创建账户',
          onClick: () => console.log('注册')
        }}
        size="large"
      />

      {/* 确认删除弹窗 */}
      <FormDialog
        open={false}
        title="确认删除"
        icon={<DeleteIcon style={{ color: '#FF3B30' }} />}
        content={
          <div>
            <p>您确定要删除这个项目吗？此操作无法撤销。</p>
            <Input 
              placeholder="输入 DELETE 确认"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        }
        action={{
          label: '确认删除',
          onClick: () => console.log('删除'),
          disabled: false // 根据输入动态控制
        }}
        size="small"
      />

      {/* 上传进度弹窗 */}
      <FormDialog
        open={false}
        title="上传文件"
        icon={<UploadIcon />}
        content={
          <div style={{ textAlign: 'center' }}>
            <p>正在上传您的文件，请稍候...</p>
            <ProgressBar value={65} />
            <p>65% 完成</p>
          </div>
        }
        action={{
          label: '上传中...',
          loading: true,
          onClick: () => {}
        }}
      />
    </div>
  );
}
```

### 使用场景

- ✅ 登录/注册表单
- ✅ 确认操作对话框
- ✅ 单步骤表单提交
- ✅ 信息收集弹窗
- ✅ 文件上传进度
- ✅ 权限请求界面

### 与Dialog的区别

| 特性 | Dialog | FormDialog |
|------|--------|------------|
| 操作按钮 | 多个（取消/确认） | 单个主要操作 |
| 使用场景 | 通用对话框 | 表单专用 |
| 按钮布局 | 水平排列 | 全宽单按钮 |
| 视觉重点 | 平衡展示 | 突出主操作 |
| 设计风格 | 系统标准 | 类似登录界面 |

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