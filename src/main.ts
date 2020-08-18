import './styles/entry.scss'
import App from './svelte/App.svelte';
import _ from 'lodash'
window._ = _

import axios, { AxiosInstance } from 'axios'
window.axios = axios.create()


const app = new App({
  target: document.body,
  props: {
    // name: 'Pancho'
  }
});

export default app;

// ------------------------------------------

import NumbersService from './services/numbers.service'

;(async () => {
  await NumbersService.setup()
})()