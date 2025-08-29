import { contextBridge, ipcRenderer } from "electron"
import { WINDOWS, PROJECT_PATH } from "./constants"

console.log("preload executado")

contextBridge.exposeInMainWorld("electronAPI", {
  quitApp: () => ipcRenderer.send("quit-app"),
  openWindow: (file: string) => ipcRenderer.send("open-window", file),
  listDirs: (path:string) => ipcRenderer.send("list-dirs"),
  WINDOWS,
  PROJECT_PATH
});
