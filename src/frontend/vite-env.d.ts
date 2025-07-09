/// <reference types="vite/client" />

export {}; 

declare global {
  interface SFTPFile {
    name: string;
    type: string;
    size: number;
    modifyTime: number;
    accessTime: number;
    rights: { user: string; group: string; other: string };
    owner: number;
    group: number;
  }

  interface SFTPApi {
    connectSFTP: (config: {
      host: string;
      port: number;
      username: string;
      password: string;
    }) => Promise<{ success: boolean; files?: SFTPFile[]; error?: string }>;
  }

  interface Window {
    api: SFTPApi;
  }
}