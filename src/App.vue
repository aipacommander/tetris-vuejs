<template>
  <div>
    <h3>vue.js 落ち物パズルゲーム</h3>
    <p>startを押してからキーボードの矢印キーで操作します</p>
    <input type="button" @click="start" value="START" v-if="gameStart == false">
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
  export default {
    data() {
      return({});
    },
    methods() {
      start: function() {
        for (var i = 0; i < 20; i++) {
            this.yx[i] = [];
            for (var j = 0; j < 10; j++) {
               this.yx[i][j] = 0;
            }
        }
        console.log(this.states);
        // this.gameStart = true;
        // this.createFn();
        // this.timerID = setInterval(this.fallFn, 500);
      }
    }
  }
</script>
