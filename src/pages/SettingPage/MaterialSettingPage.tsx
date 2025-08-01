import { MenuItem, FormControl, Select, Typography, InputLabel } from '@mui/material'
import pubsub from 'pubsub-js'
import { useState } from 'react'
import { getPilotDefaultColor } from '../../hooks/map/useGetColor'
import { MuiColorInput } from 'mui-color-input'

export default () => {
    const [themeMode, setThemeMode] = useState('system')

    // 机组颜色
    const [pilotDayColor, setPilotDayColor] = useState(getPilotDefaultColor(true).day)
    const [pilotNightColor, setPilotNightColor] = useState(getPilotDefaultColor(true).night)

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

    return (
        <div className='flex flex-col gap-4 p-4'>
            <Typography variant="h5" gutterBottom style={{fontWeight: 'bold'}}>
                设置
            </Typography>

            <Typography variant="h6" gutterBottom>
                主题设置
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="theme-mode-select-label">主题模式</InputLabel>
                <Select
                    labelId="theme-mode-select-label"
                    id="theme-mode-select"
                    value={themeMode}
                    label="主题模式"
                    onChange={(e) => onOptionSelect(e.target.value)}
                >
                    <MenuItem value={'light'}>亮色</MenuItem>
                    <MenuItem value={'dark'}>暗色</MenuItem>
                    <MenuItem value={'system'}>系统</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth className='flex flex-col gap-2'>
                <Typography variant="subtitle1" gutterBottom>
                    机组图标自定义颜色
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    日间模式
                </Typography>
                <MuiColorInput format="rgb" 
                    value={pilotDayColor} 
                    onChange={handlePilotDayColorChange} 
                />
                <Typography variant="subtitle2" gutterBottom>
                    夜间模式
                </Typography>
                <MuiColorInput format="rgb" 
                    value={pilotNightColor} 
                    onChange={handlePilotNightColorChange} 
                />
            </FormControl>
            
        </div>
    )   
}