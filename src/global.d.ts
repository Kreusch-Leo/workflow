export {}

declare global {
  interface Window {
    electronAPI: {
      quitApp: () => void,
      openWindow: (file: string) => void,
      WINDOWS: {
        INDEX: string,
        NEW_PROJECT: string,
        SELECT_PROJECT: string
      }
    }
  }
}
