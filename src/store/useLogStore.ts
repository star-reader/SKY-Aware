import { create } from 'zustand'

const initState: {
    logs: Log[],
} = {
    logs: [],
}

const useLogStore = create<{
    logs: Log[]
    addLog: (type: 'info' | 'error' | 'warning', message: string) => void
    clearLogs: () => void
    getFormattedLogs: () => string[]
}>((set, get) => ({
    ...initState,

    // 因为time是每次添加时生成的，所以不需要每次调用addLog都传一次，在这里内部生成即可
    addLog: (type: 'info' | 'error' | 'warning', message: string) => set((state) => ({ logs: [...state.logs, { type, message, time: new Date() }] })),
    clearLogs: () => set({ logs: [] }),
    getFormattedLogs: () => get().logs.map(log => `${log.time.toLocaleString()} [${log.type}]: ${log.message}`),
}))
  
export default useLogStore