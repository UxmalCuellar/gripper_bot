const { ipcRenderer } = require("electron");
class Gripper_GUI {
  constructor() {
    this.counter = 6;
    this.initStr = "";
    this.fs = require("fs");
  }

  // colorize selected button(block) and enable button above selected 
  // button then append block position to string
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

  // sets all buttons, radio btn and to their default 
  // state i.e disable/enabled
  setUp() {
    var i, x;
    for (i = 5; i < 25; i++) {
      x = i.toString();
      document.getElementById(x).disabled = true;
    }
    document.getElementById("rb1").checked = true;
  }

  // resets blocks, initial config string, radio btn and 
  // text to their default value
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
  /* checks if 6 buttons have been pressed then appends goal state to 
   * inital config string which is then written to 'instances.inp'.
   * out.inp is clear of its contents and solver and parser are started
   * sequentially and buttons are rest.
   */
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
      this.fs.writeFile("./Clingo/instances.inp", init_config, function(err) {
        if (err) throw err;
        console.log("Done writing.");
      });
      // clear out.inp file
      this.fs.truncate("./Clingo/out.inp", 0, function(err) {
        if (err) throw err;
        console.log("Gripper: cleaned out.inp");
      });
      //todo ipc call
      let Data = {
        message: "from render process",
        someData: "go solve"
      };

      // Send information to the main process
      // if a listener has been set, then the main process
      // will react to the request !
      ipcRenderer.send("request-clingo", Data);

      // Listen for main message
      ipcRenderer.on("clingo-finished", (event, arg) => {
        console.log("exit code from clingo to render process: " + arg);
        
        // Invoke method directly on main process
        Data = {
          message: "from render process",
          someData: "go parse"
        };
        ipcRenderer.send("request-parser", Data);
      });
    }
//     this.resetBlocks();
  }
}

export default Gripper_GUI;
