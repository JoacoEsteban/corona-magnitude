import './styles/entry.scss'
import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    // name: 'Pancho'
  }
});

export default app;