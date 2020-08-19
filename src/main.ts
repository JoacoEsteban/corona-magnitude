import './styles/entry.scss'
import axios, { AxiosInstance } from 'axios'
window.axios = axios.create()
console.log(window.axios)
import NumbersService from './services/numbers.service'
import App from './svelte/App.svelte';
import _ from 'lodash'
window._ = _

NumbersService.setup()


const app = new App({
  target: document.body,
  props: {
  }
});

export default app;
