import { platform } from '@tauri-apps/plugin-os'

export default async () => {
    return await platform()
}