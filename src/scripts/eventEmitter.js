import { EventEmitter } from "events";
import { app } from "electron";
import Parser from "./parser";
import Gripper from "./gripper";
var fs = require("fs");
/*
    This module provides a way to sequence the asynchronous execution of
    external programs
*/

var emitter = new EventEmitter();

emitter.on("clingo-finished", arg => {
  console.log("from emitter - clingo exit with code: " + arg);
  let parser = new Parser();
  parser.start();
});

emitter.on("parser-finished", arg => {
  console.log("from emitter - parser exit with code: " + arg);
  let argv = fs.readFileSync(
    `${app.getAppPath()}/../Clingo/parsed.txt`,
    "utf-8"
  );

  console.log("args: " + argv);
  let gripper = new Gripper();
  gripper.start(argv);
  //  let command = "./gripper_zero";
  //  let proc = exec(
  //    command,
  //    {
  //      cwd: "/home/luken/px/scripts/"
  //    },
  //    (error, stdout) => {
  //      if (error) {
  //        throw error;
  //      }
  //      console.log(stdout);
  //    }
  //  );

  //  proc.on("exit", code => {
  //    console.log(`\nros script exited with code: ${code}`);
  //  });
});

emitter.on("gripper-finished", arg => {
  console.log("from emitter - gripper exit with code: " + arg);

  // clear out.inp
  fs.truncate(`${app.getAppPath()}/../Clingo/out.inp`, 0, function() {
    console.log("out.inp cleaned");
  });
});

export const eventEmitter = emitter;
