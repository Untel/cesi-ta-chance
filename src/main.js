// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import store from './store';
import axios from 'axios';
import { initServices } from './services';
// import * as localforage from 'localforage';
import Nedb from 'nedb/browser-version/out/nedb';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VStepper,
  VCard,
  VSnackbar,
  VTextField,
  VCheckbox,
  VSelect,
  VDatePicker,
  VMenu,
  VRadioGroup,
  VSubheader,
  VChip, 
  VAvatar,
  VProgressCircular,
  VDataTable,
  VAlert,
  VSwitch,
  VExpansionPanel,
  VDialog,
} from 'vuetify'
import VueOnlinePlugin from 'vue-navigator-online'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VStepper,
    VCard,
    VSnackbar,
    VTextField,
    VCheckbox,
    VSelect,
    VDatePicker,
    VMenu,
    VRadioGroup,
    VSubheader,
    VChip,
    VProgressCircular,
    VAvatar,
    VDataTable,
    VAlert,
    VExpansionPanel,
    VSwitch,
    transitions,
    VDialog,
  },
  theme: {
    primary: '#009c9e',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#ec6771',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFCA28'
  }

});

Vue.use(VueOnlinePlugin)

// Vue.db = Vue.prototype.$db = localforage.createInstance({ name: "pending" });
Vue.db = Vue.prototype.$db = new Nedb({ 
  filename: 'cesi-ta-chance-db', 
  autoload: true 
});

Vue.api = Vue.prototype.$api = axios.create({ 
  baseURL: 'http://localhost:1664/',
  // transformResponse: [(res) => JSON.parse(res.data)] 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-type': 'application/json',
  }
});

Vue.services = Vue.prototype.$services = initServices(Vue);

// router.beforeEach((to, from, next) => {
//   console.log('to', to, 'from', from);
//   next();
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
