import BaseMapPage from "./BaseMapPage"
import FlightInfoIndex from "../../components/FlightInfo/FlightInfoIndex"

export default ({ platform }: { platform: string | undefined }) => {
    return (
        <div className="relative w-full h-full">
            <BaseMapPage platform={platform} />
            <FlightInfoIndex />
        </div>
    )
}