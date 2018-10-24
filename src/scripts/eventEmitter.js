import { EventEmitter } from "events";
/*
    This module provides a way to sequence the asynchronous execution of
    external programs
*/

var emitter = new EventEmitter();

emitter.on("clingo-finished", arg => {
  console.log("from emitter - exit with code: " + arg);
});

export const eventEmitter = emitter;
