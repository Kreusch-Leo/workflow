import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { PAGE_PATH, WINDOWS, DEFAULT_SIZE } from "./constants";
import { promises as fs } from "fs"

let win: BrowserWindow | null = null;

async function listDirs(path: string) {
  try {
    const entries = await fs.readdir(path, { withFileTypes: true })
    const dirs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)

    console.log("Diretórios encontrados:", dirs)
    return dirs
  } catch (err) {
    console.error("Erro ao listar diretórios:", err)
    return []
  }
}

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

ipcMain.handle("list-dirs", async (_event, path: string) => {
  try {
    return await listDirs(path)
  } catch (err) {
    console.error("Erro:", err)
    return []
  }
})