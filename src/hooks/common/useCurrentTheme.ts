export default () => {
    let ariaStore = document.documentElement.attributes.getNamedItem('aria-label')
    if (ariaStore) {
        return ariaStore.value as 'light' | 'dark'
    }
    return 'light'
}