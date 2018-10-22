<template>
  <div class="hello">
      <form name="gripperBot" action="/api/data" method="post">
        <div class="container">
          <h1>GripperBot</h1>
              <p>Place the blocks.</p>
          <div class="button-keys">
            <div class="col1"><button v-on:click="select($event)" id="21" type="button" value="6,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="22" type="button" value="6,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="23" type="button" value="6,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="24" type="button" value="6,4"></button></div>
            <div class="col1"><button v-on:click="select($event)" id="17" type="button" value="5,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="18" type="button" value="5,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="19" type="button" value="5,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="20" type="button" value="5,4"></button></div>
            <div class="col1"><button v-on:click="select($event)" id="13" type="button" value="4,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="14" type="button" value="4,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="15" type="button" value="4,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="16" type="button" value="4,4"></button></div>
            <div class="col1"><button v-on:click="select($event)" id="9" type="button" value="3,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="10" type="button" value="3,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="11" type="button" value="3,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="12" type="button" value="3,4"></button></div>
            <div class="col1"><button v-on:click="select($event)" id="5" type="button" value="2,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="6" type="button" value="2,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="7" type="button" value="2,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="8" type="button" value="2,4"></button></div>
            <div class="col1"><button v-on:click="select($event)" id="1" type="button" value="1,1"></button></div>
            <div class="col2"><button v-on:click="select($event)" id="2" type="button" value="1,2"></button></div>
            <div class="col3"><button v-on:click="select($event)" id="3" type="button" value="1,3"></button></div>
            <div class="col4"><button v-on:click="select($event)" id="4" type="button" value="1,4"></button></div>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div class="goals">
            <input type="radio" id="rb1" name="goal" v-on:click="updatePlatform($event)" value="1">
            <input type="radio" id="rb2" name="goal" v-on:click="updatePlatform($event)" value="2">
            <input type="radio" id="rb3" name="goal" v-on:click="updatePlatform($event)" value="3">
            <input type="radio" id="rb4" name="goal" v-on:click="updatePlatform($event)" value="4">
          </div>
          <p type="" id="platform">Platform 1 selected</p>
          <div class="actions">
            <button type="button" class="solve" v-on:click="executeSolver()" id="solve">Solve</button>
            <button type="button" class="clear" v-on:click="resetBlocks()"  value="clear">Reset</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import Gripper_GUI from "@/scripts/gripper.js";
export default {
  name: "Gripper",
  props: {},
  mounted() {
    //Gripper_GUI.setUp();
    this.gripper = new Gripper_GUI();
    this.gripper.setUp();
  },
  methods: {
    select: function(event) {
      let targetId = event.target.id;
      let targetValue = event.target.value;
      console.log("blockId: " + targetId + ", value: " + targetValue);
      this.gripper.addBlock(targetId);
    },
    executeSolver: function() {
      this.gripper.executeSolver();
    },
    resetBlocks: function() {
      this.gripper.resetBlocks();
    },
    updatePlatform: function(event) {
      this.gripper.updatePlatform(event.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 35px;
  text-align: center;
}

p {
  text-align: center;
  color: black;
}
body {
  background-color: #ffba06;
}

html {
  font-size: 100%;
  box-sizing: border-box;
  font-family: "Helvetica";
}

*,
*::before,
*::after {
  /*  margin:0;*/
  padding: 0;
  box-sizing: inherit;
}
.container {
  /*  border: px solid #ccc;*/
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  width: 400px;
}

.actions {
  top: 0%;
  left: 120%;
  transform: translate(24%, 20%);
  width: 270px;
  height: 25px;
  align: center;
}

button {
  height: 60px;
  width: 70px;
  background-color: #fff;
  font-size: 2rem;
  border-radius: 5px;
  /*border: 1px solid #c4c4c4;*/
  border: none;
  background-color: transparent;
  /*color: #333;*/
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 50%,
    rgba(0, 0, 0, 0.08)
  );
  /*box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .05), inset 0 1px 0 0 rgba(255, 255, 255, .45), inset 0 -1px 0 0 rgba(255, 255, 255, .15), 0 1px 0 0 rgba(255, 255, 255, .15);*/
}

button:hover {
  background-color: #6ecf42;
}

button:disabled {
  background: transparent;
  border: none;
}

.clear {
  background-color: #f0595f;
  border-color: #f3036e;
  border-radius: 3px;
  color: #fff;
  height: 30px;
  width: 100px;
  font-size: 1rem;
}

.clear:hover {
  background-color: #f17377;
}
.solve {
  background-color: #32b098;
  border-color: #337cac;
  color: #fff;
  height: 30px;
  width: 100px;
  border-radius: 3px;
  font-size: 1rem;
}

.solve:hover {
  background-color: #4e9ed4;
}
solve:disabled {
  background-color: deeppink;
  color: black;
}

.button-keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 33px;
  text-align: center;
  color: #ffba06;
  /* background-color: grey; */
  background-color: #fcfcfc;
  padding: 10px;
}
.goals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 90px;
  margin: 25px;
}
</style>
