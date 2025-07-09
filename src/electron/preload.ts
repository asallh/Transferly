import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  connectSFTP: (config: {
    host: string;
    port: number;
    username: string;
    password: string;
  }) => ipcRenderer.invoke("connect-sftp", config),
});
