<template>
  <div id="owaku">
    <h3>vue.js 落ち物パズルゲーム</h3>
    <p>startを押してからキーボードの矢印キーで操作します</p>
    <div v-for="i in 20" class="container" v-if="gameStart">
      <div v-for="j in 10" class="block" :style="{ backgroundColor: ['#aaa', '#00e100'][yx[i-1][j-1]] }">
         <span class="block-text" :data-value="yx[i-1][j-1]"></span>
      </div>
    </div>
    <div class="t">
      <div>score: <span id="score">{{ score }}</span></div>
      <div>point: <span id="point">{{ point }}</span></div>
      <input id="button" type="button" @click="startGame" value="START" v-if="gameStart == false || gameOver">
      <p id="game-over" v-if="gameOver">GAME OVER</p>
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
    justify-content: center;
  }
  #owaku {
    width: 50%;
    margin: auto;
  }
  #button {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 5px;
    font-size: 24px;
    width: 100%;
  }
  .t {
    margin-top: 5px;
    text-align: center;
  }
  .block {
    width: 20px;
    height: 20px;
    border: 1px solid #555;
  }
  .block-text {
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
      score: 0,
      point: 0
    }
  },
  created () {
    // よくわからんけど, vueのmethodoをとeventをbind
    document.body.addEventListener('keydown', this.eventKeyDown);
  },
  destroyed () {
    document.body.removeEventListener('keydown', this.eventKeyDown);
  },
  methods: {
    eventKeyDown: function(e) {
      /**
       * keyが押されたときに処理するコード
       */
      if (e.keyCode == 38) this.keyDown(true, 0, 0);        //up
      else if (e.keyCode == 37) this.keyDown(false, -1, 0); //left
      else if (e.keyCode == 40) this.keyDown(false, 0, 1);  //down
      else if (e.keyCode == 39) this.keyDown(false, 1, 0);  //right

      if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        this.fall();
      }
    },
    startGame: function() {
      for (var i = 0; i < 20; i++) {
        this.yx[i] = [];
        for (var j = 0; j < 10; j++) {
          this.yx[i][j] = 0;
        }
      }
      this.gameStart = true;
      this.gameOver = false;
      this.createBlock();
      // this.timerID = setInterval(this.fall, 1000);
    },
    keyDown: function(rotate, dx, dy) {
      /**
       * keyが押されたとき、条件をパスしたらブロックを落とす.
       */
      if (!this.gameOver && this.check(rotate, dx, dy)) this.draw(rotate, dx, dy);
    },
    check: function(rotate, dx, dy) {
      var yx = this.yx.map(v => v.slice());
      var block = this.block.map(v => v.slice());
      this.blockMemo.forEach(v => {
        yx[v[0]][v[1]] = 0;
      });
      if (rotate) {
        block = block.map(v => [v[1] * -1, v[0]]);
      }
      var flag = block.every(v => {
        var x = v[0] + this.blockX + dx;
        var y = v[1] + this.blockY + dy;
        return (y >= 0 && y < 20 && x >= 0 && x < 10 && yx[y][x] == 0);
      });
      return flag;
    },
    draw: function(rotate, dx, dy) {
      this.blockMemo.forEach(v => {
        this.yx[v[0]][v[1]] = 0;
      });
      this.blockMemo = [];
      if (rotate) {
        this.block = this.block.map(v => [v[1] * -1, v[0]]);
      }
      this.blockX += dx;
      this.blockY += dy;
      this.block.forEach(v => {
        if (this.yx[v[1] + this.blockY][v[0] + this.blockX] != 0) {
          this.gameOver = true;
        }
        this.yx[v[1] + this.blockY][v[0] + this.blockX] = 1;
        this.blockMemo.push([v[1] + this.blockY, v[0] + this.blockX]);
      });
      if (this.gameOver) {
        clearInterval(this.timerID);
      }
      this.yx.push();
    },
    createBlock: function() {
      this.blockMemo = [];
      this.blockX = 4;
      this.blockY = 1;
      this.block = blocks[Math.floor(Math.random() * 7)].map(v => [v[0], v[1]]);
      this.draw(false, 0, 0);
    },
    score_check: function() {
      var yx = this.yx.filter(v => (v.join("") == "1111111111"));
      var point = yx.length * 10;
      if (point > 0) {
        this.point = point;
        this.score += point;
      }
    },
    deleteLines: function() {
      this.yx = this.yx.filter(v => (v.join("") != "1111111111"));
      while (this.yx.length < 20) {
        this.yx.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    },
    fall: function() {
      this.point = 0
      if (this.check(false, 0, 1)) {
        this.draw(false, 0, 1);
      } else {
        this.score_check();
        this.deleteLines();
        this.createBlock();
      }
    }
  }
};
</script>
