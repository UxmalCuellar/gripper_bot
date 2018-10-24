import { EventEmitter } from "events";
import Parser from "./parser";
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
});

export const eventEmitter = emitter;
