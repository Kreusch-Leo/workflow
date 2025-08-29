export {}

declare global {
  interface Window {
    electronAPI: {
      quitApp: () => void,
      openWindow: (file: string) => void,
      listDirs: (path:string) => string[],
      WINDOWS: {
        INDEX: string,
        NEW_PROJECT: string,
        SELECT_PROJECT: string
      },

      PROJECT_PATH: string

    }
  }
}
