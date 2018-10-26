import { app } from "electron";
import { exec } from "child_process";
import path from "path";

const execPath = app.getAppPath() + "/../Clingo/clingo";
const params = ["blocks_ASP_prog.lp", "instances.inp", "out.inp"];
var kill = require("tree-kill");

class Arbotix {
  constructor() {
    this.execPath = execPath;
    this.params = params;
    this.child = {};
    this.running = false;
    console.log("path " + path.dirname(process.execPath));
    console.log("clingo path: " + execPath);
  }

  startChild() {
    let command = [
      "/opt/ros/kinetic/bin/roslaunch",
      "arbotix_python",
      "phantomX_arm.launch"
    ];
    this.child = exec(
      command,
      {
        detached: true
      },
      (error, stdout) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      }
    );

    this.child.stdout.on("data", data => {
      console.log(`data:\n${data}`);
    });

    this.child.stderr.on("data", data => {
      console.log(`data:\n${data}`);
    });

    this.child.on("exit", code => {
      console.log(`\nchild exited with code: ${code}`);
    });
  }

  start() {
    this.startChild();
    this.running = true;
  }

  stop() {
    kill(this.child.pid);
    console.log("bye from arbotix.js");
    this.running = false;
  }
}

export default Arbotix;
