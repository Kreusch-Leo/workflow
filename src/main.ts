import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { PAGE_PATH, WINDOWS, DEFAULT_SIZE } from "./constants";

let win: BrowserWindow | null = null;

function createWindow(file: string) {
  win = new BrowserWindow({
    width: DEFAULT_SIZE.WIDTH,
    height: DEFAULT_SIZE.HEIGHT,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });

  win.loadFile(path.join(__dirname, PAGE_PATH, file));
  return win;
}

app.whenReady().then(() => {
  win = createWindow(WINDOWS.INDEX);
});

ipcMain.on("open-window", (event, file: string) => {
  if (win) win.close();
  win = createWindow(file);
});

ipcMain.on("quit-app", () => {
  app.quit();
});
