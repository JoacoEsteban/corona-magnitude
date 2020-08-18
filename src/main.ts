import './styles/entry.scss'
import App from './svelte/App.svelte';
import axios, { AxiosInstance } from 'axios'
import Numbers from './services/numbers.service'
window.axios = axios.create()

const app = new App({
  target: document.body,
  props: {
    // name: 'Pancho'
  }
});

export default app;