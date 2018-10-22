import { exec } from "child_process";
const execPath = "./clingo blocks_ASP_prog.lp init_config.inp > out.inp";
class Gripper_GUI {
  constructor() {
    this.counter = 6;
    this.initStr = "";
    this.fs = require("fs");
    this.command = execPath;
    this.child = {}; // init as null object
    this.running = false;
  }

  // enable button above selected button and concatnate 'block'
  // placment to string
  addBlock(id) {
    var num, str, initCell;
    if (this.counter > 0) {
      if (document.getElementById(id).innerHTML == "") {
        document.getElementById(id).innerHTML = this.counter;
        document.getElementById(id).style.background = "#7AB317";
        document.getElementById(id).style.color = "#A0C55F";

        initCell = "initCellHasBlock("; // row, col, block No.
        this.initStr =
          this.initStr +
          initCell +
          document.getElementById(id).value +
          "," +
          this.counter +
          ").\n";

        this.counter -= 1;
        num = parseInt(id);
        num = num + 4;
        str = num.toString();
        document.getElementById(str).disabled = false;
      }
    } else {
      alert("Out of blocks!");
    }
  }

  /* sets all buttons, radio btn and text
  * to their defualt values
  */
  setUp() {
    var i, x;
    for (i = 5; i < 25; i++) {
      x = i.toString();
      document.getElementById(x).disabled = true;
    }
    document.getElementById("rb1").checked = true;
  }

  resetBlocks() {
    var i, x;
    for (i = 1; i < 25; i++) {
      x = i.toString();
      document.getElementById(x).innerHTML = "";
      document.getElementById(x).style.background = "transparent";
    }

    this.setUp();
    document.getElementById("platform").innerHTML = "Platform 1 selected.";
    this.initStr = "";
    this.counter = 6;
  }

  // dynamically prints out the goal platform selected
  updatePlatform(value) {
    var selected, platform, option;
    platform = "Platform ";
    selected = " selected.";
    option = platform + value + selected;

    document.getElementById("platform").innerHTML = option;
  }

  executeSolver() {
    var init_config, goal;
    if (this.counter > 0) {
      alert("Please place 6 blocks!");
    } else {
      if (document.getElementById("rb1").checked)
        goal = document.getElementById("rb1").value;
      if (document.getElementById("rb2").checked)
        goal = document.getElementById("rb2").value;
      if (document.getElementById("rb3").checked)
        goal = document.getElementById("rb3").value;
      if (document.getElementById("rb4").checked)
        goal = document.getElementById("rb4").value;

      init_config = this.initStr + "goalPlatform(" + goal + ").";
      this.fs.writeFile("./Clingo/init_config.inp", init_config, function(err) {
        if (err) throw err;
        console.log("Done writing.");
      });
      // execute solver and parser
      this.runExecutables();
      // reset blocks
      this.resetBlocks();
    }
  }

  /* runs ASP_Solver and parser programs */
  runExecutables() {
    console.log("Creating child process");
    var path = process.cwd();

    this.child = exec(
      this.command,
      {
        cwd: path + "/Clingo/",
        detached: false // want child process to be part of app
      },
      (error, stdout) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
        exec(
          "./parser",
          {
            cwd: path + "/Clingo/",
            detached: false
          },
          (error, stdout) => {
            if (error) {
              throw error;
            }
            console.log(stdout);
          }
        );
      }
    );
    console.log("'exec' successfully called!");

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
    this.runExecutables();
    this.running = true;
  }

  stop() {
    this.child.kill("SIGINT");
    console.log("bye from child.js");
    this.running = false;
  }
}
export default Gripper_GUI;
