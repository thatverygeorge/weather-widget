import { createApp, defineCustomElement } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());

const weatherWidget = defineCustomElement(App);

customElements.define('weather-widget', weatherWidget);
