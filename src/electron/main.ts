import { app, BrowserWindow, ipcMain } from "electron";
import SftpClient from "ssh2-sftp-client";
import path from "path";

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
};

app.whenReady().then(createWindow);

// Inter Process Communication handler
ipcMain.handle("Connect-SFTP", async (_event, config) => {
  const sftp = new SftpClient();
  try {
    await sftp.connect(config);
    const list = await sftp.list(".");
    await sftp.end();
    return { Connected: true, files: list };
  } catch (error) {
    console.error("SFTP ERROR:", error);
    return {
      Connected: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
