import { app } from "electron";
// let mainWindow = BrowserWindow.getFocusedWindow();
// want to send from here to browser window

//var app = require("electron").remote.app;
import { execSync } from "child_process";
import path from "path";
console.log("hello from clingo.js\n");
const execPath =
  app.getAppPath() +
  "/../Clingo/clingo blocks_ASP_prog.lp instances.inp > out.inp";

class Clingo {
  constructor() {
    this.execPath = execPath;
    this.child = {}; // init as null object
    this.running = false;
    console.log("path " + path.dirname(process.execPath));
    console.log("clingo path: " + execPath);
  }

  startChild() {
    this.child = execSync(
      execPath,
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
    // this.child.unref();

    this.child.stdout.on("data", data => {
      console.log(`data:\n${data}`);
    });

    this.child.stderr.on("data", data => {
      console.log(`data:\n${data}`);
    });
    this.child.on("exit", code => {
      console.log(`\nchild exited with code: ${code}`);
      self.eventListener.sender.send("clingo-finished", code);
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
