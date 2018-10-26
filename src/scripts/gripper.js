import { app } from "electron";
import { eventEmitter } from "./eventEmitter";
import { spawn } from "child_process";
import path from "path";

const execPath = app.getAppPath() + "/../Clingo/clingo";
const params = ["blocks_ASP_prog.lp", "instances.inp", "out.inp"];

class Gripper {
  constructor() {
    this.execPath = execPath;
    this.params = params;
    this.child = {};
    this.running = false;
    console.log("path " + path.dirname(process.execPath));
    console.log("clingo path: " + execPath);
  }

  startChild(argv) {
    let command = "rosrun";
    let args = ["px_test", "test_node", argv];
    this.child = spawn(
      command,
      args,
      {
        cwd: "/opt/ros/kinetic/bin/",
        detached: true
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
      eventEmitter.emit("gripper-finished", code);
    });
  }

  start(argv) {
    this.startChild(argv);
    this.running = true;
  }

  stop() {
    this.child.kill("SIGINT");
    console.log("bye from child.js");
    this.running = false;
  }
}

export default Gripper;
