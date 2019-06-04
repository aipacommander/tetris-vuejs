import Vue from 'vue/dist/vue.js';
import App from './vue/App.vue';

var vm = new Vue({
   el: '#app',
   components: { App },
   template: '<app></app>'
});
