import { app, BrowserWindow } from "electron";
let mainWindow = BrowserWindow.getFocusedWindow();
// want to send from here to browser window

//var app = require("electron").remote.app;
import { spawn } from "child_process";
import path from "path";
console.log("hello\n");
const execPath = app.getAppPath() + "/../Clingo/clingo";
const params = ["blocks_ASP_prog.lp", "instances.inp"];

class Clingo {
  constructor() {
    this.execPath = execPath;
    this.params = params;
    this.child = {}; // init as null object
    this.running = false;
    console.log("path " + path.dirname(process.execPath));
    console.log("clingo path: " + execPath);
  }

  startChild() {
    this.child = spawn(
      execPath,
      params,
      {
        cwd: app.getAppPath() + "/../Clingo/",
        detached: true,
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
    this.child.unref();

    this.child.stdout.on("data", data => {
      console.log(`data:\n${data}`);
    });

    this.child.stderr.on("data", data => {
      console.log(`data:\n${data}`);
    });

    this.child.on("exit", code => {
      console.log(`\nchild exited with code: ${code}`);
      mainWindow.webContents.send("clingo-exit", code);
    });
  }

  start() {
    this.startChild();
    this.running = true;
  }

  stop() {
    this.child.kill("SIGINT");
    console.log("bye from child.js");
    this.running = false;
  }
}

export default Clingo;
