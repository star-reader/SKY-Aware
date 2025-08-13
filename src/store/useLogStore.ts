import { create } from 'zustand'

const initState: {
    logs: Log[],
} = {
    logs: [],
}

const useLogStore = create<{
    logs: Log[]
    addLog: (log: Log) => void
    clearLogs: () => void
    getFormattedLogs: () => string[]
}>((set, get) => ({
    ...initState,

    addLog: (log: Log) => set((state) => ({ logs: [...state.logs, log] })),
    clearLogs: () => set({ logs: [] }),
    getFormattedLogs: () => get().logs.map(log => `${log.time.toLocaleString()} [${log.type}]: ${log.message}`),
}))
  
export default useLogStore