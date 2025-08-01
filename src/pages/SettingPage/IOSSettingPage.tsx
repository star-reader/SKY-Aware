import { useState } from "react"
import pubsub from "pubsub-js"
import IOSCommonDropdown from "../../components/common/Dropdown/styled/IOSCommonDropdown"
import MacOSCommonDropdown from "../../components/common/Dropdown/styled/MacOSCommonDropdown"
import { DropdownOption } from "../../components/common/types"
import { getPilotDefaultColor } from "../../hooks/map/useGetColor"
import IOSColorPicker from "../../components/common/ColorPicker/IOSColorPicker"

// 颜色选择按钮组件
const ColorButton = ({
    value,
    onClick,
    label,
    system
}: {
    value: string;
    onClick: () => void;
    label: string;
    system: 'ios' | 'macos';
}) => {
    const buttonStyles = system === 'ios' ? {
        button: "flex items-center gap-3 w-full p-3 rounded-xl",
        colorPreview: "w-6 h-6 rounded-full",
        text: "text-[15px]"
    } : {
        button: "flex items-center gap-2 h-[22px] px-2 rounded-[4px] macos-dropdown__trigger",
        colorPreview: "w-[14px] h-[14px] rounded-[2px]",
        text: "text-[12px]"
    };

    return (
        <div className={`flex ${system === 'ios' ? 'flex-col gap-2' : 'items-center gap-2'}`}>
            <span className={`${system === 'ios' ? 'text-[13px]' : 'text-[12px] min-w-[60px]'} font-medium text-[#1d1d1f] dark:text-[#f5f5f7]`}>
                {label}
            </span>
            <button
                className={`${buttonStyles.button} transition-colors duration-200`}
                onClick={onClick}
            >
                <div
                    className={buttonStyles.colorPreview}
                    style={{
                        backgroundColor: value,
                        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.1)'
                    }}
                />
                <span className={`${buttonStyles.text} text-[#1d1d1f] dark:text-[#f5f5f7]`}>
                    选择颜色
                </span>
            </button>
        </div>
    );
};

export default ({system}: {system: 'ios' | 'macos'}) => {
    const [themeMode, setThemeMode] = useState('system')
    
    // 机组颜色
    const [pilotDayColor, setPilotDayColor] = useState(getPilotDefaultColor(true).day)
    const [pilotNightColor, setPilotNightColor] = useState(getPilotDefaultColor(true).night)
    
    // 颜色选择器状态
    const [showDayColorPicker, setShowDayColorPicker] = useState(false)
    const [showNightColorPicker, setShowNightColorPicker] = useState(false)

    const onOptionSelect = (data: string) => {
        setThemeMode(data)
        pubsub.publish('theme-mode', data)
        pubsub.publish('pilot-color-schema')
    }

    const handlePilotDayColorChange = (color: string) => {
        setPilotDayColor(color)
        localStorage.setItem('pilotColorSchema', JSON.stringify({
            day: color,
            night: pilotNightColor
        }))
        pubsub.publish('pilot-color-schema')
    }

    const handlePilotNightColorChange = (color: string) => {
        setPilotNightColor(color)
        localStorage.setItem('pilotColorSchema', JSON.stringify({
            day: pilotDayColor,
            night: color
        }))
        pubsub.publish('pilot-color-schema')
    }

    const options: DropdownOption[] = [
        { text: '亮色', key: 'light' },
        { text: '暗色', key: 'dark' },
        { text: '系统', key: 'system' }
    ]

    const Dropdown = system === 'ios' ? IOSCommonDropdown : MacOSCommonDropdown

    const containerStyles = system === 'ios' ? {
        main: "flex flex-col gap-4 p-4",
        title: "text-2xl font-bold",
        section: "flex flex-col gap-3",
        sectionTitle: "text-lg text-[#6e6e73]",
        dropdownContainer: "flex items-center gap-4 justify-between",
        colorSection: "flex flex-col gap-4 bg-white dark:bg-[#1C1C1E] rounded-xl p-4",
        dropdownWidth: "w-[210px]"
    } : {
        main: "flex flex-col gap-3 p-3",
        title: "text-[20px] font-medium",
        section: "flex flex-col gap-2",
        sectionTitle: "text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]",
        dropdownContainer: "flex items-center gap-2",
        colorSection: "flex flex-col gap-2 w-[190px]",
        dropdownWidth: "w-[120px]"
    };

    return (
        <div className={containerStyles.main}>
            <div className={`${containerStyles.title} text-[#1d1d1f] dark:text-[#f5f5f7]`}>设置</div>
            
            {/* 主题设置部分 */}
            <div className={containerStyles.section}>
                <div className={containerStyles.sectionTitle}>主题设置</div>
                <div className={containerStyles.dropdownContainer}>
                    <span className={`${system === 'ios' ? '' : 'min-w-[60px]'} text-[#1d1d1f] dark:text-[#f5f5f7] text-[12px]`}>
                        主题模式
                    </span>
                    <div className={containerStyles.dropdownWidth}>
                        <Dropdown
                            label=""
                            value={themeMode}
                            options={options}
                            onSelectionChange={(data) => onOptionSelect((data as DropdownOption)?.key as string ?? '')}
                        />
                    </div>
                </div>
            </div>

            {/* 颜色设置部分 */}
            <div className={containerStyles.section}>
                <div className={containerStyles.sectionTitle}>机组图标自定义颜色</div>
                <div className={containerStyles.colorSection}>
                    <ColorButton
                        label="日间模式"
                        value={pilotDayColor}
                        onClick={() => setShowDayColorPicker(true)}
                        system={system}
                    />
                    <ColorButton
                        label="夜间模式"
                        value={pilotNightColor}
                        onClick={() => setShowNightColorPicker(true)}
                        system={system}
                    />
                </div>
            </div>

            {/* 颜色选择器弹窗 */}
            {showDayColorPicker && (
                <IOSColorPicker
                    value={pilotDayColor}
                    onChange={handlePilotDayColorChange}
                    onClose={() => setShowDayColorPicker(false)}
                    system={system}
                />
            )}
            {showNightColorPicker && (
                <IOSColorPicker
                    value={pilotNightColor}
                    onChange={handlePilotNightColorChange}
                    onClose={() => setShowNightColorPicker(false)}
                    system={system}
                />
            )}
        </div>
    )
}