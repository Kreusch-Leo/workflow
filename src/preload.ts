import { contextBridge, ipcRenderer } from "electron"
import { WINDOWS } from "./constants"

console.log("preload executado")

contextBridge.exposeInMainWorld("electronAPI", {
  quitApp: () => ipcRenderer.send("quit-app"),
  openWindow: (file: string) => ipcRenderer.send("open-window", file),
  WINDOWS
});
