import { createApp } from 'vue'
import App from './App.vue'
import libUses from './components'

const app = createApp(App)

app.use(libUses).mount('#app')
