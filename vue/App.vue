<template>
  <div>
    <h3>vue.js 落ち物パズルゲーム</h3>
    <p>startを押してからキーボードの矢印キーで操作します</p>
    <input type="button" @click="startFn" value="START" v-if="gameStart == false">
    <p v-if="gameOver">GAME OVER</p>
    <div v-for="i in 20" class="container" v-if="gameStart">
      <div v-for="j in 10" class="waku" :style="{ backgroundColor: ['gray', 'green'][yx[i-1][j-1]] }">
         {{ yx[i-1][j-1] }}
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
  }
  .waku {
    width: 20px;
    height: 20px;
  }
</style>

<script>
var blocks = [
   [[0, 0], [1, 0], [0, 1], [1, 1]],  // square
   [[-1, 0], [0, 0], [1, 0], [2, 0]],  // tetris
   [[-1, 0], [0, 0], [0, 1], [1, 1]],  // key1
   [[-1, 1], [0, 1], [0, 0], [1, 0]],  // key2
   [[-1, 0], [0, 0], [1, 0], [-1, 1]],  // L1
   [[-1, 0], [0, 0], [1, 0], [1, 1]],  // L2
   [[-1, 0], [0, 0], [1, 0], [0, 1]],  // T
];

export default {
  data: function() {
    return {
      yx: [],
      block: [],
      blockX: 0,
      blockY: 0,
      blockMemo: [],
      timerID: null,
      gameStart: false,
      gameOver: false,
    }
  },
  created () {
    document.body.addEventListener('keydown', this.keyDown);
  },
  destroyed () {
    document.body.removeEventListener('keydown', this.keyDown);
  },
  methods: {
    keyDown: function(e) {
      if (e.keyCode == 38) this.keydownFn(true, 0, 0);        //up
      else if (e.keyCode == 37) this.keydownFn(false, -1, 0); //left
      else if (e.keyCode == 40) this.keydownFn(false, 0, 1);  //down
      else if (e.keyCode == 39) this.keydownFn(false, 1, 0);  //right
    },
    startFn: function() {
      for (var i = 0; i < 20; i++) {
        this.yx[i] = [];
        for (var j = 0; j < 10; j++) {
          this.yx[i][j] = 0;
        }
      }
      this.gameStart = true;
      this.gameOver = false;
      this.createFn();
      this.timerID = setInterval(this.fallFn, 500);
    },
    keydownFn: function(rotate, dx, dy) {
      if (!this.gameOver && this.checkFn(rotate, dx, dy)) this.drawFn(rotate, dx, dy);
    },
    checkFn: function(rotate, dx, dy) {
      var yx = this.yx.map(v => v.slice());
      var block = this.block.map(v => v.slice());
      this.blockMemo.forEach(v => {
        yx[v[0]][v[1]] = 0;
      });
      if (rotate) block = block.map(v => [v[1] * -1, v[0]]);
      var flag = block.every(v => {
        var x = v[0] + this.blockX + dx;
        var y = v[1] + this.blockY + dy;
        return (y >= 0 && y < 20 && x >= 0 && x < 10 && yx[y][x] == 0);
      });
      return flag;
    },
    drawFn: function(rotate, dx, dy) {
      this.blockMemo.forEach(v => {
        this.yx[v[0]][v[1]] = 0;
      });
      this.blockMemo = [];
      if (rotate) this.block = this.block.map(v => [v[1] * -1, v[0]]);
      this.blockX += dx;
      this.blockY += dy;
      this.block.forEach(v => {
        if (this.yx[v[1] + this.blockY][v[0] + this.blockX] != 0) this.gameOver = true;
        this.yx[v[1] + this.blockY][v[0] + this.blockX] = 1;
        this.blockMemo.push([v[1] + this.blockY, v[0] + this.blockX]);
      });
      if (this.gameOver) clearInterval(this.timerID);
      this.yx.push();
    },
    createFn: function() {
      this.blockMemo = [];
      this.blockX = 4;
      this.blockY = 1;
      this.block = blocks[Math.floor(Math.random() * 7)].map(v => [v[0], v[1]]);
      this.drawFn(false, 0, 0);
    },
    deleteFn: function() {
      this.yx = this.yx.filter(v => (v.join("") != "1111111111"));
      while (this.yx.length < 20) {
        this.yx.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    },
    fallFn: function() {
      if (this.checkFn(false, 0, 1)) {
        this.drawFn(false, 0, 1);
      } else {
        this.deleteFn();
        this.createFn();
      }
    }
  }
};
</script>
