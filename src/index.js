import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue';
import blocks from './data/blocks.js';

new Vue({
  el: '#app',
  data: {
    'states': {
      yx: [],
      block: [],
      blockX: 0,
      blockY:  0,
      blockMemo: [],
      timerID: null,
      gameStar: false,
      gameOver: false
    },
    'blocks': blocks,
  },
  components: {
    App
  },
  template: '<app></app>'
});
