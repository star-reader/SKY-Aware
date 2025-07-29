import { MenuItem, FormControl, Select, Typography, InputLabel } from '@mui/material'
import pubsub from 'pubsub-js'
import { useState } from 'react'

export default () => {
    const [themeMode, setThemeMode] = useState('system')

    const onOptionSelect = (data: string) => {
        setThemeMode(data)
        pubsub.publish('theme-mode', data)
    }

    return (
        <div className='flex flex-col gap-4 p-4'>
            <Typography variant="h5" gutterBottom style={{fontWeight: 'bold'}}>
                设置
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                主题设置
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">主题模式</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={themeMode}
                    label="主题模式"
                    onChange={(e) => onOptionSelect(e.target.value)}
                >
                    <MenuItem value={'light'}>亮色</MenuItem>
                    <MenuItem value={'dark'}>暗色</MenuItem>
                    <MenuItem value={'system'}>系统</MenuItem>
                </Select>
            </FormControl>
            
        </div>
    )   
}