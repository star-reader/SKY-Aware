import BaseMapPage from "./BaseMapPage"

export default ({ platform }: { platform: string | undefined }) => {
    return (
        <div className="relative w-full h-full">
            <BaseMapPage platform={platform} />
        </div>
    )
}