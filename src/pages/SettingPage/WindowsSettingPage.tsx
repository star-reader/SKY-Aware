import { makeStyles, Title2, Subtitle2, 
    Dropdown, Option, useId, Field} from "@fluentui/react-components"


const useStyles = makeStyles({
    root : {
        gap: '12px',
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        marginLeft: '25px'
    },
    dropArea: {
        display: "grid",
        gridTemplateRows: "repeat(1fr)",
        justifyItems: "start",
        maxWidth: "400px",
      }
})

export default () => {
    const styles = useStyles()

    const dropdownId = useId("dropdown-default");
    const options = [
        '自动',
        '亮色',
        '暗色'
    ];

    return (
        <div className={styles.root}>
            <Title2>设置</Title2>
            <Subtitle2>主题设置</Subtitle2>
            <Field hint={'选择系统主题模式，默认为自动'} className={styles.dropArea}>
                <label htmlFor={dropdownId}>系统主题模式</label>
                <Dropdown id={dropdownId} placeholder="选择主题模式" defaultValue={'自动'} >
                    {options.map((option) => (
                <Option key={option}>
                    {option}
                </Option>
                    ))}
                </Dropdown>
            </Field>
        </div>
    )
}