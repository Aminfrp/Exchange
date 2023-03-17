import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import './index.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { COLORS } from './constants'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme:{
    colors: {
      background: COLORS.background,
      surface: COLORS.surface,
      primary: COLORS.primary,
      secondary: COLORS.secondary,
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
