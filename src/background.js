"use strict";

import { app, BrowserWindow, ipcMain, protocol } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import store from "./background-process/store";

// const Store = require('electron-store');

const isDev = process.env.NODE_ENV !== "production";
let win;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 440,
    minWidth: 400,
    minHeight: 140,
    maxWidth: isDev ? null : 600,
    maxHeight: isDev ? null : 300,
    frame: false,
    // vibrancy: "under-window",
    titleBarStyle: "hiddenInset",
    // titleBarStyle: "customButtonsOnHover",

    // frame: false,
    isAlwaysOnTop: true,
    resizable: isDev ? true : false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: true
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDev && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDev) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// eslint-disable-next-line no-unused-vars
ipcMain.on("show-app", event => win.show());

ipcMain.handle("getStore", () => store.store);
ipcMain.handle("getStoreKey", (event, key) => store.get(key));

ipcMain.handle("updateSettings", async (event, value) => {
  return await store.set(`settings`, value);
});

ipcMain.handle("updateSetting", async (event, { key, value }) => {
  return await store.set(`settings.${key}`, value);
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

ipcMain.handle("test", async () => {
  return "Test worked awaiting setTimeout";
});

ipcMain.handle("setStoreKey", (event, { key, value }) => store.set(key, value));

ipcMain.handle("update-window", (event, payload) => {
  console.log(
    "🚀 ~ file: background.js ~ line 115 ~ event, payload",
    event,
    payload
  );

  win.minimize();
  console.log(
    "🚀 ~ file: background.js ~ line 122 ~ ipcMain.handle ~ win",
    win
  );
});

store.onDidChange("settings", newValue =>
  win.webContents.send("settingsUpdate", newValue)
);
