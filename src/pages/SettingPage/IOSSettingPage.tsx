import { useState } from "react"
import pubsub from "pubsub-js"
import IOSCommonDropdown from "../../components/common/Dropdown/styled/IOSCommonDropdown"
import MacOSCommonDropdown from "../../components/common/Dropdown/styled/MacOSCommonDropdown"
import { DropdownOption } from "../../components/common/types"

export default ({system}: {system: 'ios' | 'macos'}) => {
    const [themeMode, setThemeMode] = useState('system')

    const onOptionSelect = (data: string) => {
        setThemeMode(data)
        pubsub.publish('theme-mode', data)
    }

    const options: DropdownOption[] = [
        { text: '亮色', key: 'light' },
        { text: '暗色', key: 'dark' },
        { text: '系统', key: 'system' }
    ]

    return (
        <div className="flex flex-col gap-4 px-2">
            <div className="text-2xl font-bold">设置</div>
            <div className="text-lg text-gray-500">主题设置</div>
            <div className="flex items-center gap-4" style={
                system === 'ios' ? {
                    justifyContent: 'space-between'
                } : {
                    justifyContent: 'flex-start'
                }
            }>
                <span>主题模式</span>
                <div className="w-[210px]">
                    {system === 'ios' ? <IOSCommonDropdown
                        label=""
                        value={themeMode}
                        options={options}
                        onSelectionChange={(data) => onOptionSelect((data as DropdownOption)?.key as string ?? '')}
                    /> : <MacOSCommonDropdown
                        label=""
                        value={themeMode}
                        options={options}
                        onSelectionChange={(data) => onOptionSelect((data as DropdownOption)?.key as string ?? '')}
                    />}
                </div>
            </div>
            
        </div>
    )
}