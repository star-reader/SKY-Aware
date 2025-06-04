import { makeStyles } from "@fluentui/react-components"


const useStyles = makeStyles({
    root : {
        
    }
})

export default () => {
    const styles = useStyles()
    return (
        <div className={styles.root}>
            <h1>设置</h1>
        </div>
    )
}