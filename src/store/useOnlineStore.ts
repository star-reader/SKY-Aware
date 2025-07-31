import { create } from 'zustand'

const initState: {
    onlinePilots: OnlineFlight[],
    onlineControllers: OnlineController[],
} = {
    onlinePilots: [],
    onlineControllers: [],
}

const useOnlineStore = create(set => ({
    ...initState,

    // setters
    setOnlinePilots: (pilots: OnlineFlight[]) => set({ onlinePilots: pilots }),
    setOnlineControllers: (controllers: OnlineController[]) => set({ onlineControllers: controllers }),

}))
  
export default useOnlineStore