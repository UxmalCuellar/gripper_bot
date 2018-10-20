class Gripper_GUI {
  constructor() {
    this.counter = 6;
    this.initStr = "";
    this.fs = require("fs");
  }

  // enable button above selected button
  addBlock(id) {
    var num, str, initCell;
    if (this.counter > 0) {
      document.getElementById(id).innerHTML = this.counter;
      document.getElementById(id).style.background = "#7AB317";
      document.getElementById(id).style.color = "#A0C55F";

      this.initCell = "initCellHasBlock("; // row, col, block No.
      this.initStr =
        this.initStr +
        initCell +
        document.getElementById(id).value +
        "," +
        this.counter +
        ")\n";

      this.counter -= 1;
      num = parseInt(id);
      num = num + 4;
      str = num.toString();
      document.getElementById(str).disabled = false;
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
      document.getElementById(x).style.background = "#FFBA06";
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
    if (this.counter > 0) {
      alert("Please place 6 blocks!");
    } else {
      var exec = require("child_process").exec;
      exec("./clingo blocks_ASP_prog.lp instance_examp.inp > out.inp", function(
        err,
        stdout
      ) {
        exec("./parser", function(err, stdout) {
          console.log(stdout);
        });
        console.log(stdout);
        console.log("Solver completed");
      });
    }
  }
}

export default Gripper_GUI;
