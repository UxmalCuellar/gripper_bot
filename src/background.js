"use strict";
global.__basedir = __dirname;

import Clingo from "./scripts/clingo";
import { spawn } from "child_process";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 600, height: 800 });

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadFile("index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

let command = "/opt/ros/kinetic/bin/roslaunch";
let args = ["arbotix_python", "phantomX_arm.launch"];
spawn(
  command,
  args,
  {
    env: { DISPLAY: process.env.DISPLAY },
    stdio: ["pipe", "pipe", "pipe"]
  },
  (error, stdout) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  }
);

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
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  process.on("message", data => {
    if (data === "graceful-exit") {
      app.quit();
    }
  });
}

// listening for events from renderr process
// Attach listener in the main process with the given ID
ipcMain.on("request-clingo", (event, arg) => {
  let clingo = new Clingo();
  clingo.start();
  console.log(arg);
});

ipcMain.on("request-parser", (event, arg) => {
  console.log("ready to parse\n");
  console.log(arg);
});
