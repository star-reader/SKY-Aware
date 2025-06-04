import { platform } from '@tauri-apps/plugin-os'

export default async () => {
    console.log(platform)
    return platform()
    //return 'android'
}