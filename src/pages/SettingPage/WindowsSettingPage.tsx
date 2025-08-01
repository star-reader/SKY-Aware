/*
* Chunhao Jin
* Windows原生Fluent UI的设置页面，用作Windows版本的设置页面
*/

import { makeStyles, Title2, Subtitle2, 
    Dropdown, Option, useId, Field,
    OptionOnSelectData, Button,
    Popover,
    PopoverSurface,
    PopoverTrigger,
    ColorPicker,
    ColorSlider,
    ColorArea,
    ColorPickerProps} from "@fluentui/react-components"

import pubsub from 'pubsub-js'
import { useState } from "react"
import { tinycolor } from "@ctrl/tinycolor"
import { getPilotDefaultColor } from "../../hooks/map/useGetColor"


const useStyles = makeStyles({
    root : {
        gap: '12px',
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        marginLeft: '5px',
        padding: '14px'
    },
    dropArea: {
        display: "grid",
        gridTemplateRows: "repeat(1fr)",
        justifyItems: "start",
        maxWidth: "400px",
    },
    previewColor: {
        margin: "10px 0",
        width: "50px",
        height: "50px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        "@media (forced-colors: active)": {
          forcedColorAdjust: "none",
        },
    },
    row: {
        display: "flex",
        gap: "10px",
    },
    sliders: {
        display: "flex",
    },
})

const DEFAULT_PILOT_DAY_HSV = getPilotDefaultColor().day
const DEFAULT_PILOT_NIGHT_HSV = getPilotDefaultColor().night

export default () => {
    const styles = useStyles()

    // 主题模式的dropdown
    const dropdownId = useId("dropdown-default");
    const options = [
        '自动',
        '亮色',
        '暗色'
    ]
    // 机组图标自定义颜色
    const [previewDayColor, setPreviewDayColor] = useState(DEFAULT_PILOT_DAY_HSV);
    const [previewNightColor, setPreviewNightColor] = useState(DEFAULT_PILOT_NIGHT_HSV);
    const [dayColor, setDayColor] = useState(DEFAULT_PILOT_DAY_HSV)
    const [nightColor, setNightColor] = useState(DEFAULT_PILOT_NIGHT_HSV)
    const [popoverDayOpen, setPopoverDayOpen] = useState(false) 
    const [popoverNightOpen, setPopoverNightOpen] = useState(false) 

    const onOptionSelect = (data: OptionOnSelectData) => {
        pubsub.publish('theme-mode', data.optionValue)
    }

    // 机组图标自定义颜色
    const handlePilotDayColorChange: ColorPickerProps["onColorChange"] = (_, data) => {
        setPreviewDayColor({ ...data.color, a: 1 })
        let pilotColorSchema = localStorage.getItem('pilotColorSchema')
        if (pilotColorSchema) {
            let oriJson = JSON.parse(pilotColorSchema)
            oriJson.day = tinycolor(data.color).toRgbString()
            localStorage.setItem('pilotColorSchema', JSON.stringify(oriJson))
        } else {
            localStorage.setItem('pilotColorSchema', JSON.stringify({
                day: tinycolor(data.color).toRgbString(),
                night: tinycolor(nightColor).toRgbString()
            }))
        }
        pubsub.publish('pilot-color-schema')
    }

    const handlePilotNightColorChange: ColorPickerProps["onColorChange"] = (_, data) => {
        setPreviewNightColor({ ...data.color, a: 1 })
        let pilotColorSchema = localStorage.getItem('pilotColorSchema')
        if (pilotColorSchema) {
            let oriJson = JSON.parse(pilotColorSchema)
            oriJson.night = tinycolor(data.color).toRgbString()
            localStorage.setItem('pilotColorSchema', JSON.stringify(oriJson))
        } else {
            localStorage.setItem('pilotColorSchema', JSON.stringify({
                day: tinycolor(dayColor).toRgbString(),
                night: tinycolor(data.color).toRgbString()
            }))
        }
        pubsub.publish('pilot-color-schema')
    }


    return (
        <div className={styles.root}>
            <Title2>设置</Title2>
            <Subtitle2>主题设置</Subtitle2>
            <Field hint={'选择系统主题模式，默认为自动'} className={styles.dropArea}>
                <label htmlFor={dropdownId}>系统主题模式</label>
                <Dropdown id={dropdownId} placeholder="选择主题模式" 
                    defaultValue={'自动'} onOptionSelect={(_, data) => onOptionSelect(data)} >
                    {options.map((option) => (
                        <Option key={option}>
                            {option}
                        </Option>
                    ))}
                </Dropdown>
            </Field>



            <Field hint={'选择你喜欢的颜色'} className={styles.dropArea}>
                <label htmlFor={dropdownId}>机组图标自定义颜色</label>
                <div className="relative flex text-center gap-6 mt-3">
                    {/* 日间模式预览 */}
                    <div className="flex flex-col gap-2 items-center">
                    <Popover
                        open={popoverDayOpen}
                        trapFocus
                        onOpenChange={(_, data) => setPopoverDayOpen(data.open)}
                    >
                        <PopoverTrigger disableButtonEnhancement>
                        <Button>日间模式</Button>
                        </PopoverTrigger>
                        <PopoverSurface>
                        <ColorPicker color={previewDayColor} onColorChange={handlePilotDayColorChange} >
                            <ColorArea
                                inputX={{ "aria-label": "Saturation" }}
                                inputY={{ "aria-label": "Brightness" }}
                                />
                                <div className={styles.row}>
                                <div className={styles.sliders}>
                                    <ColorSlider aria-label="Hue" />
                                </div>
                                <div
                                    className={styles.previewColor}
                                    style={{
                                    backgroundColor: tinycolor(previewDayColor).toRgbString(),
                                    }}
                                />
                                </div>
                            </ColorPicker>
                            <div className={styles.row}>
                                <Button
                                appearance="primary"
                                onClick={() => {
                                    setDayColor(previewDayColor);
                                    setPopoverDayOpen(false);
                                }}
                                >
                                确认
                                </Button>
                                <Button
                                onClick={() => {
                                    setPopoverDayOpen(false);
                                }}
                                >
                                取消
                                </Button>
                            </div>
                            </PopoverSurface>
                        </Popover>
                        <div
                            className={styles.previewColor}
                            style={{ backgroundColor: tinycolor(dayColor).toRgbString() }}
                        />
                    </div>
                    {/* 夜间模式预览 */}
                    <div className="flex flex-col gap-2 items-center">
                    <Popover
                        open={popoverNightOpen}
                        trapFocus
                        onOpenChange={(_, data) => setPopoverNightOpen(data.open)}
                    >
                        <PopoverTrigger disableButtonEnhancement>
                        <Button>夜间模式</Button>
                        </PopoverTrigger>
                        <PopoverSurface>
                        <ColorPicker color={previewNightColor} onColorChange={handlePilotNightColorChange} >
                            <ColorArea
                                inputX={{ "aria-label": "Saturation" }}
                                inputY={{ "aria-label": "Brightness" }}
                                />
                                <div className={styles.row}>
                                <div className={styles.sliders}>
                                    <ColorSlider aria-label="Hue" />
                                </div>
                                <div
                                    className={styles.previewColor}
                                    style={{
                                    backgroundColor: tinycolor(previewNightColor).toRgbString(),
                                    }}
                                />
                                </div>
                            </ColorPicker>
                            <div className={styles.row}>
                                <Button
                                appearance="primary"
                                onClick={() => {
                                    setNightColor(previewNightColor);
                                    setPopoverNightOpen(false);
                                }}
                                >
                                确认
                                </Button>
                                <Button
                                onClick={() => {
                                    setPopoverNightOpen(false);
                                }}
                                >
                                取消
                                </Button>
                            </div>
                            </PopoverSurface>
                        </Popover>
                        <div
                            className={styles.previewColor}
                            style={{ backgroundColor: tinycolor(nightColor).toRgbString() }}
                        />
                    </div>
                </div>
            </Field>
        </div>
    )
}