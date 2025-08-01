import { memo } from "react"

export default memo(({flightData, isMobileWidth}: {flightData: OnlineFlight, isMobileWidth: boolean}) => {
    return (
        <div style={{
            width: isMobileWidth ? '100%' : '300px',
            height: isMobileWidth ? '100%' : '300px',
            backgroundColor: 'red',
        }}>
            <div>
                <div></div>
            </div>
        </div>
    )
})