import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueScrollTo from 'vue-scrollto'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);
app.directive("scroll-to", VueScrollTo);
app.use(vuetify)
app.mount("#app");


// const app = createApp(App);
// app.use(store);
// app.directive("scroll-to", VueScrollTo);
// app.mount("#app");