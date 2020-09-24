import './styles/entry.scss'

import axios, { AxiosInstance } from 'axios'
window.axios = axios.create()

import NumbersService from './services/numbers.service'
import App from './svelte/App.svelte';
import _ from 'lodash'
import $ from 'jquery'
window._ = _
window.$ = $
import random from 'random'
window.random = random

NumbersService.setup()


const app = new App({
  target: document.body,
  props: {
  }
});

export default app;
